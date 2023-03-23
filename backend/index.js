import http from "http";
import express from "express";
import cors from "cors";
import Fuse from "fuse.js";
import { db } from "./lib/firebase.js";
import { collection, getDocs, onSnapshot } from "firebase/firestore";

import dotenv from "dotenv";
dotenv.config({ path: "./lib/firebase.env.local" });

// State
const state = { data: [] };

// Search function
const search = (searchQuery) => {
  const fuse = new Fuse(state.data, { includeScore: true, keys: ["test"] });

  return fuse.search(searchQuery);
};

// Fetch data from Firebase
const getTags = async () => {
  try {
    const data = await getDocs(collection(db, "test-search"));

    if (data.empty)
      throw new Error("Error loading tags data: Data does not exist.");

    state.data = data.docs.map((doc) => ({ ...doc.data() }));
    console.log(JSON.stringify(state.data));
  } catch (error) {
    console.error(error);
  }
};

// Update data from Firestore every n ms
// Rewrite with onSnapshot?
/* setInterval(() => {
  getTags();
}, 30000); */
getTags();

// Express server
const app = express();
app.use(cors());
app.post("/jobs/search/", async (req, res) => {
  console.log(req.headers.query);
  console.log(req.headers);

  try {
    const searchResponse = search(req.headers.query);

    /*  res.set({
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
      "Content-Type": "application/json",
      crossorigin: "anonymous",
    }); */
    // res.type("json");
    // res.append("Access-Control-Allow-Origin", "*");

    if (searchResponse.length === 0) {
      console.log("not found");
      res.send(JSON.stringify({}));
    }
    console.log(searchResponse);
    res.send(JSON.stringify(searchResponse));
  } catch (error) {
    console.error(error);
  }
});

const server = http.createServer(app);
const port = 3001;

server.listen(port, () => {
  console.log(`listening on port ${port}`);
});
