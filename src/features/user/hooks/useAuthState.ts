// Import the necessary dependencies
import { useState, useEffect } from "react";
import { auth, db } from "../../../lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { User } from "firebase/auth";

// Define the AuthStateUser type
type AuthStateUser = UserType & { verified: boolean };

// Define the useAuthState custom hook
const useAuthState = () => {
  // Declare user state with initial value of null
  const [user, setUser] = useState<AuthStateUser | null>(null);
  // Declare loading state with initial value of true
  const [loading, setLoading] = useState(true);

  // Use the useEffect hook to manage side effects
  useEffect(() => {
    // Define the updateUser function to update the user state
    const updateUser = async (authUser: User | null) => {
      if (authUser) {
        // Get a reference to the user's document in the Firestore
        const userRef = doc(db, "users", authUser.uid);
        // Fetch the user's document
        const userDoc = await getDoc(userRef);
        // Create a new user object if the document exists
        const userData = userDoc.exists()
          ? ({
              id: authUser.uid,
              verified: authUser.emailVerified,
              ...userDoc.data(),
            } as AuthStateUser)
          : null;

        // Set the user state with the new user object
        setUser(userData);
        // Set the loading state to false
        setLoading(false);
      } else {
        // Set the
        // user state to null when no authenticated user is found
        setUser(null);
        // Set the loading state to false
        setLoading(false);
      }
    };

    // Define the handleUserDataChanged function to be called when the 'user-data-changed' event is emitted
    const handleUserDataChanged = () => {
      updateUser(auth.currentUser);
    };

    // Subscribe to auth state changes by invoking the onAuthStateChanged method
    const unsubscribeAuth = auth.onAuthStateChanged(updateUser);

    // Listen for custom event 'user-data-changed' and call the handleUserDataChanged function when the event is emitted
    window.addEventListener("user-data-changed", handleUserDataChanged);

    return () => {
      // Unsubscribe from auth state changes when the component is unmounted
      unsubscribeAuth();
      // Remove the event listener for 'user-data-changed' when the component is unmounted
      window.removeEventListener("user-data-changed", handleUserDataChanged);
    };
  }, []);

  // Return the user and loading states
  return { user, loading };
};

export default useAuthState;
