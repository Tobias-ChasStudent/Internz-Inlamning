import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/reduxHooks";
import { setAllFilters, setError } from "../filterSlice";
import { db } from "../../../lib/firebase";

import { collection, getDocs } from "firebase/firestore";

export const getTags = async () => {
  const [isLoaded, setIsloaded] = useState(false);
  const dispatch = useAppDispatch();

  if (isLoaded) return;

  try {
    const data = await getDocs(collection(db, "filter-tags"));

    if (data.empty)
      throw new Error("Error loading tags data: Data does not exist.");

    dispatch(
      setAllFilters(data.docs.map((doc) => ({ ...doc.data(), active: false })))
    );

    setIsloaded(true);
  } catch (error) {
    console.error(error);
    dispatch(setError("Could not load tags."));
  }
};

export const postTags = async () => {};
