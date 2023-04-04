import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/reduxHooks";
import { setAllFilters, setError } from "../filterSlice";
import { db } from "../../../lib/firebase";

import { doc, collection, getDocs, updateDoc } from "firebase/firestore";

// Collection name in DB
const filterCollection = "filters";

// Used to check if tag filters are loaded from DB
let isLoadedTagsFromDB = false;

export const getTags = async () => {
  const dispatch = useAppDispatch();

  if (isLoadedTagsFromDB) return;
  try {
    const data = await getDocs(collection(db, filterCollection));

    // Throw error if nothing is returned from DB
    if (data.empty)
      throw new Error("Error loading tags data: Data does not exist.");

    isLoadedTagsFromDB = true;

    // Set all tag filters in redux store
    dispatch(setAllFilters(data.docs.map((doc) => ({ ...doc.data() }))));

  } catch (error) {
    console.error(error);

    // Set error message in redux store
    dispatch(setError("Could not load tags."));
  }
};

////////////////////
//This function is not used at the moment. To be used when adding new tags to DB.
//Maybe this should be redesigned. It's easy to over write the whole collection of tags by mistake.
//At least a check should be added before using.
///////////////////
/**
 *
 * @param category The category to add new tag. Must be an already existing.
 * @param tag New tag name to add.
 * @param allFilters Filters array from redux store.
 * @example postTag("Location", "Malmö", selectFilters);
 */
export const postTag = async (
  category: string,
  tag: string,
  allFilters: Array<any>
) => {
  const selectedCategory = allFilters.find((cat) => cat.name === category);

  type FilterItems = { tag: string; amount: number; active: boolean };

  const updatedArray = selectedCategory.items.map(
    (item: FilterItems) => new Object({ tag: item.tag, amount: item.amount })
  );

  updatedArray.push({ tag: tag, amount: 1 });

  try {
    updateDoc(doc(db, filterCollection, category.toLocaleLowerCase()), {
      name: category,
      items: updatedArray,
    });
  } catch (error) {
    console.error(error);
    //TODO error handling
  }
};
