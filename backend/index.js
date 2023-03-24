import https from "https";
import fs from "fs";
import express from "express";
import cors from "cors";
import Fuse from "fuse.js";
import { db } from "./lib/firebase.js";
import { collection, getDocs, onSnapshot } from "firebase/firestore";

import dotenv from "dotenv";
dotenv.config({ path: "./node.env.local" });

// State
const state = { data: [] };

// Search function
const search = (searchQuery) => {
  const searchKeys = process.env.FUSE_SEARCH_KEYS.split(" ");

  const fuse = new Fuse(state.data, {
    includeScore: true,
    keys: searchKeys,
  });

  return { search: fuse.search(searchQuery) };
};

// Fetch data from Firestore
const collectionName = process.env.FIRESTORE_COLLECTION;
const unsub = onSnapshot(collection(db, collectionName), (data) => {
  state.data = data.docs.map((doc) => ({ ...doc.data() }));
});

// Express server
const app = express();

app.use(cors());

app.post("/jobs/search/", async (req, res) => {
  console.log(req.headers.query);

  try {
    const searchResponse = search(req.headers.query);

    if (searchResponse.search.length === 0) {
      throw new Error("404");
    }

    searchResponse.status = "200";
    res.send(JSON.stringify(searchResponse));
    console.log(searchResponse);
  } catch (error) {
    console.error(error + " Not found");
    res.send(JSON.stringify({ status: error.message }));
  }
});

// Start https server
const options = {
  key: fs.readFileSync(process.env.HTTPS_SSL_KEY_PATH),
  cert: fs.readFileSync(process.env.HTTPS_SSL_CERT_PATH),
};
console.log(options);
const server = https.createServer(options, app);
const port = process.env.EXPRESS_PORT;

server.listen(port, () => {
  console.log(`listening on port ${port}`);
});
