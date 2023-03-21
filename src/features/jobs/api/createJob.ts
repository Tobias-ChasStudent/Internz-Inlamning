import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { auth, db } from "../../../lib/firebase";

export const createJob = async (newJob: NewFormTypes): Promise<void> => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("User is not authenticated");

    const userDocRef = doc(db, "users", user.uid);
    const userDocSnap = await getDoc(userDocRef);
    if (!userDocSnap.exists()) {
      throw {
        code: "document_error",
        message: "User document does not exist",
      };
    }

    const userData = userDocSnap.data() as UserType;
    if (!userData.company) {
      throw {
        code: "document_error",
        message: "User data is missing company field",
      };
    }

    const companiesDocRef = doc(db, "companies", userData.company);
    const companiesDocSnap = await getDoc(companiesDocRef);
    const companyData = companiesDocSnap.data();
    if (!companyData) {
      throw {
        code: "document_error",
        message: "Company document does not exist",
      };
    }

    const filterCollectionRef = collection(db, "filters");

    const [citiesDocRef, tagsDocRef] = [
      doc(filterCollectionRef, "cities"),
      doc(filterCollectionRef, "tags"),
    ];

    await Promise.all([
      setDoc(
        citiesDocRef,
        { cities: arrayUnion(newJob.city) },
        { merge: true }
      ),
      setDoc(tagsDocRef, { tags: arrayUnion(...newJob.tags) }, { merge: true }),
    ]);

    const newJobData = {
      company: companyData,
      user: userData,
      ...newJob,
    };

    const jobCollectionRef = collection(db, "jobs");
    await addDoc(jobCollectionRef, newJobData);
  } catch (e) {
    throw e;
  }
};
