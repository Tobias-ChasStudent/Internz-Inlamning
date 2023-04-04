import {
  getFirestore,
  collection,
  getDocs,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
  query,
  where,
} from "firebase/firestore";
import { db } from "./firebase";
import filterSlice from "../features/filter/filterSlice";
import filter from "../features/filter/filterSlice";
import { useAppSelector, useAppDispatch } from "../app/reduxHooks";
import loadJobs from "../features/finder/finderSlice";

//////Importera Filter array och filtrera ut "active: false"
// const filterArray = filterSlice.filter((filter) => filter.active === false);

//////Skicka med en querry till firebase som kollar i firebase efter taggar som matchar filter

// Read
export const fetchFromDB = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "todos"));
    const docs = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return docs;
  } catch (error) {
    console.error("Error fetching documents: ", error);
    throw error;
    return [];
  }
};

export const searchFullText = async (searchTerm: string) => {
  try {
    const response = await fetch("https://localhost:3001/jobs/search", {
      method: "POST",
      headers: {
        query: searchTerm,
        accept: "*/*",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: "",
      mode: "cors",
    });

    // const dispatch = useAppDispatch()
    const JSONdata = await response.json();
    const data: Array<any> = JSONdata.search
    console.log(data);

    // dispatch(loadJobs(data))

    return data

  } catch (error) {
    console.error(error);
  }
};
