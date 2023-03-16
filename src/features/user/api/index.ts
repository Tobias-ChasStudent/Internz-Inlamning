import { auth, db, storage } from "../../../lib/firebase";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  User,
} from "firebase/auth";
import { addDoc, collection, doc, setDoc, updateDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid"; // import the uuid library
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

// Register a user with email, password, username, and account type.
export const registerWithEmailAndPassword = async (
  email: string,
  password: string,
  username: string,
  type: AccountType
): Promise<void> => {
  try {
    // Create a new user using Firebase authentication.
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    // Prepare the user data object for Firestore.
    const userData: UserType = {
      id: user.uid,
      email: email,
      username,
      photo: null,
      type,
      ...(type === "company" ? { company: null } : {}),
    };

    // Get a reference to the Firestore document for the new user.
    const userDocRef = doc(db, "users", user.uid);

    // Send a verification email and save the user data to Firestore concurrently.
    await Promise.all([
      sendEmailVerification(user),
      setDoc(userDocRef, userData),
    ]);
  } catch (error) {
    throw error;
  }
};

// Upload an image to Firebase Storage and return its download URL.
const uploadImage = async (image: File): Promise<string> => {
  const imgId = uuidv4();
  const imgRef = ref(storage, `company_images/${imgId}`);
  await uploadBytes(imgRef, image);
  return await getDownloadURL(imgRef);
};

// Register a new company and update the user document with the company ID.
export const registerCompany = async (
  company: CompanyFormTypes
): Promise<void> => {
  try {
    const { currentUser } = auth;

    if (!currentUser) throw new Error("Not signed in");

    // Add the creator (user) ID to the company data.
    const companyData = { ...company, creator: currentUser.uid };

    // If a logo is provided, upload it and add its URL to the company data.
    if (typeof company.logo !== "string") {
      const imageFile = company.logo[0];
      const imageUrl = await uploadImage(imageFile);
      companyData.logo = imageUrl;
    }

    // Add the company data to the Firestore "companies" collection.
    const companyCollectionRef = collection(db, "companies");
    const companyDocRef = await addDoc(companyCollectionRef, companyData);

    // Update the user document with the new company ID.
    const userDocRef = doc(db, "users", currentUser.uid);
    await updateDoc(userDocRef, { company: companyDocRef.id });
  } catch (error) {
    throw error;
  }
};

export const loginWithEmailAndPassword = async (
  email: string,
  password: string
): Promise<boolean> => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    return user.emailVerified ? true : false;
  } catch (error) {
    throw error;
  }
};

export const loginWithGoogle = async (): Promise<void> => {
  const provider = new GoogleAuthProvider();
  try {
    await signInWithPopup(auth, provider);
  } catch (error) {
    throw error;
  }
};

export const logout = async (): Promise<void> => {
  await signOut(auth);
};

export const reloadCurrentUser = async (): Promise<void> => {
  if (auth.currentUser) {
    await auth.currentUser.reload();
    await auth.currentUser.getIdToken(true);
  }
};
