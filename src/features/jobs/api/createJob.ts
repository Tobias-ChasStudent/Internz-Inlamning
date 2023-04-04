// Import the necessary Firestore functions and firebase instance
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { auth, db } from "../../../lib/firebase";

// Define the createJob function that takes a newJob object as an argument
export const createJob = async (newJob: NewFormTypes): Promise<void> => {
  try {
    // Get the current user from the authentication instance
    const user = auth.currentUser;
    // Throw an error if the user is not authenticated
    if (!user) throw new Error("User is not authenticated");

    // Get a reference to the user's document in the Firestore
    const userDocRef = doc(db, "users", user.uid);
    // Fetch the user's document snapshot
    const userDocSnap = await getDoc(userDocRef);
    // Throw a custom error if the user document does not exist
    if (!userDocSnap.exists()) {
      throw {
        code: "document_error",
        message: "User document does not exist",
      };
    }

    // Extract the user data from the document snapshot
    const userData = userDocSnap.data() as UserType;
    // Throw a custom error if the user data is missing the company field
    if (!userData.company) {
      throw {
        code: "document_error",
        message: "User data is missing company field",
      };
    }

    // Get a reference to the company document in the Firestore
    const companiesDocRef = doc(db, "companies", userData.company);
    // Fetch the company
    // document snapshot
    const companiesDocSnap = await getDoc(companiesDocRef);
    // Extract the company data from the document snapshot
    const companyData = companiesDocSnap.data();
    // Throw a custom error if the company document does not exist
    if (!companyData) {
      throw {
        code: "document_error",
        message: "Company document does not exist",
      };
    }

    // Get a reference to the filters collection in the Firestore
    const filterCollectionRef = collection(db, "filters");

    // Get references to the cities and tags documents within the filters collection
    const [citiesDocRef, tagsDocRef] = [
      doc(filterCollectionRef, "cities"),
      doc(filterCollectionRef, "tags"),
    ];

    // Update the cities and tags documents with the new job's city and tags, merging with existing data
    await Promise.all([
      setDoc(
        citiesDocRef,
        { items: arrayUnion(newJob.city) },
        { merge: true }
      ),
      setDoc(tagsDocRef, { items: arrayUnion(...newJob.tags) }, { merge: true }),
    ]);

    // Create a new job data object with the company, user, and new job data
    const newJobData = {
      company: companyData,
      user: userData,
      ...newJob,
    };

    // Get a reference to the jobs collection in the Firestore
    const jobCollectionRef = collection(db, "jobs");
    // Add the new job data object to the jobs collection
    await addDoc(jobCollectionRef, newJobData);
  } catch (e) {
    // Throw any errors that occurred during the execution of the function
    throw e;
  }
};
