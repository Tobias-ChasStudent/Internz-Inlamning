import { useState, useEffect } from "react";
import { auth, db } from "../../../lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { User } from "firebase/auth";

type AuthStateUser = UserType & { verified: boolean };

const useAuthState = () => {
  const [user, setUser] = useState<AuthStateUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const updateUser = async (authUser: User | null) => {
      if (authUser) {
        const userRef = doc(db, "users", authUser.uid);
        const userDoc = await getDoc(userRef);
        const userData = userDoc.exists()
          ? ({
              id: authUser.uid,
              verified: authUser.emailVerified,
              ...userDoc.data(),
            } as AuthStateUser)
          : null;

        setUser(userData);
        setLoading(false);
      } else {
        setUser(null);
        setLoading(false);
      }
    };

    const handleUserDataChanged = () => {
      updateUser(auth.currentUser);
    };

    // Subscribe to auth state changes
    const unsubscribeAuth = auth.onAuthStateChanged(updateUser);

    // Listen for custom event 'user-data-changed'
    window.addEventListener("user-data-changed", handleUserDataChanged);

    return () => {
      // Unsubscribe from auth state changes
      unsubscribeAuth();
      // Remove event listener when the component is unmounted
      window.removeEventListener("user-data-changed", handleUserDataChanged);
    };
  }, []);

  return { user, loading };
};

export default useAuthState;
