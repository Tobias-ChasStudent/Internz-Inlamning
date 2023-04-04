import { auth, db, storage } from "../../../lib/firebase";
import {
  createUserWithEmailAndPassword,
  EmailAuthProvider,
  GoogleAuthProvider,
  reauthenticateWithCredential,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updatePassword,
  verifyBeforeUpdateEmail,
} from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
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

export const registerWithGoogle = async (type: AccountType): Promise<void> => {
  const provider = new GoogleAuthProvider();
  try {
    const { user } = await signInWithPopup(auth, provider);

    if (!user) return;

    const userData: UserType = {
      id: user.uid,
      email: user.email as string,
      username: user.displayName as string,
      photo: user.photoURL,
      type,
      ...(type === "company" ? { company: null } : {}),
    };

    const userDocRef = doc(db, "users", user.uid);

    await setDoc(userDocRef, userData);
  } catch (error) {
    throw error;
  }
};

export const loginWithGoogle = async (): Promise<void> => {
  const provider = new GoogleAuthProvider();
  try {
    const { user } = await signInWithPopup(auth, provider);

    if (!user) return;

    const userDocRef = doc(db, "users", user.uid);
    const userSnapshot = await getDoc(userDocRef);
    if (!userSnapshot.exists()) {
      const userData: UserType = {
        id: user.uid,
        email: user.email as string,
        username: user.displayName as string,
        photo: user.photoURL,
        type: "student",
      };
      await setDoc(userDocRef, userData);
      await reloadCurrentUser();
    }
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
    const userDataChangedEvent = new CustomEvent("user-data-changed");
    window.dispatchEvent(userDataChangedEvent);
  }
};

export const updateAccount = async (
  userId: string,
  formData: EditStudentAccountFormInputs | EditCompanyAccountFormInputs
): Promise<void> => {
  try {
    // Get a reference to the Firestore document for the user.
    const userDocRef = doc(db, "users", userId);

    const userData = Object.entries(formData).reduce(
      (acc: Record<string, any>, [key, value]) => {
        if (value !== "" && value !== null && value !== undefined) {
          acc[key] = value;
        }
        return acc;
      },
      {}
    ) as EditStudentAccountFormInputs;

    if (userData.photo instanceof FileList && userData.photo.length > 0) {
      const imageFile = userData.photo[0];
      const imageUrl = await uploadImage(imageFile);
      userData.photo = imageUrl;
    } else {
      delete userData.photo;
    }

    // Update the user document with the new data.
    await updateDoc(userDocRef, userData);
    await reloadCurrentUser();
  } catch (error) {
    throw error;
  }
};

export const getCompanyById = async (
  companyId: string
): Promise<CompanyFormTypes> => {
  try {
    const companyDocRef = doc(db, "companies", companyId);
    const companySnapshot = await getDoc(companyDocRef);
    if (!companySnapshot.exists()) {
      throw new Error("Company not found");
    }
    const companyData = companySnapshot.data() as CompanyFormTypes;
    return companyData;
  } catch (error) {
    throw error;
  }
};

export const updateCompanyById = async (
  companyId: string,
  formData: EditCompanyFormInputs
): Promise<void> => {
  try {
    // Get a reference to the Firestore document for the company.
    const companyDocRef = doc(db, "companies", companyId);

    const companyData = Object.entries(formData).reduce(
      (acc: Record<string, any>, [key, value]) => {
        if (value !== "" && value !== null && value !== undefined) {
          acc[key] = value;
        }
        return acc;
      },
      {}
    ) as EditCompanyFormInputs;

    if (companyData.logo instanceof FileList && companyData.logo.length > 0) {
      const imageFile = companyData.logo[0];
      const imageUrl = await uploadImage(imageFile);
      companyData.logo = imageUrl;
    } else {
      delete companyData.logo;
    }

    // Update the company document with the new data.
    await updateDoc(companyDocRef, companyData);
  } catch (error) {
    throw error;
  }
};

export const updateUserPassword = async (
  currentPassword: string,
  newPassword: string
): Promise<void> => {
  try {
    const { currentUser } = auth;
    if (!currentUser?.email) throw new Error("Not signed in");

    // Reauthenticate the user with their current password.
    const credentials = EmailAuthProvider.credential(
      currentUser.email,
      currentPassword
    );
    await reauthenticateWithCredential(currentUser, credentials);

    // Update the user's password.
    await updatePassword(currentUser, newPassword);
  } catch (error) {
    throw error;
  }
};

export const getUserAuthProvider = async (): Promise<
  "email" | "google" | null
> => {
  const user = auth.currentUser;
  if (!user) return null;

  const providers = user.providerData.map((p) => p.providerId);

  if (providers.includes("google.com")) return "google";
  else if (providers.includes("password")) return "email";
  else return null;
};

export const getUserWithCompanyById = async (
  userId: string
): Promise<Profile> => {
  try {
    const userDocRef = doc(db, "users", userId);
    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
      throw new Error("User not found");
    }

    const userData = userSnapshot.data() as UserType;

    let companyData: CompanyFormTypes | null = null;

    if (userData.type === "company" && userData.company) {
      const companyDocRef = doc(db, "companies", userData.company);
      const companySnapshot = await getDoc(companyDocRef);

      if (companySnapshot.exists()) {
        companyData = companySnapshot.data() as CompanyFormTypes;
      }
    }

    return { user: userData, company: companyData };
  } catch (error) {
    throw error;
  }
};
