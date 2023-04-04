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
  console.log(state.data);
  console.log(searchKeys);
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
  console.log(state);
});

// Express server
const app = express();

app.use(cors());

app.post("/jobs/search/", async (req, res) => {
  console.log('search query:', req.headers.query);

  try {
    let searchResponse
    if (req.headers.query === "") {
      console.log("Query: ", req.headers.query);
      searchResponse = {
        search: state.data.map(card => new Object({
          item: card
        }))
      }

    } else {
      searchResponse = search(req.headers.query);

      if (searchResponse.search.length === 0) {
        throw new Error("404");
      }
    }
    console.log(searchResponse);

    searchResponse.status = "200";
    res.send(JSON.stringify(searchResponse));
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
