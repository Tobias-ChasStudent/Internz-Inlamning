import { useState, useEffect } from "react";
import { auth, db } from "../../../lib/firebase";
import { doc, onSnapshot } from "firebase/firestore";

type AuthStateuser = UserType & { verified: boolean };

const useAuthState = () => {
  const [user, setUser] = useState<AuthStateuser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Subscribe to Firebase auth state changes
    const unsubscribeAuth = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // Get Firestore document reference for the authenticated user
        const userRef = doc(db, "users", authUser.uid);

        // Subscribe to real-time updates to the user document
        const unsubscribeSnapshot = onSnapshot(
          userRef,
          (userDoc) => {
            // Update user state with 'verified' property and document data
            const userData = userDoc.exists()
              ? ({
                  id: authUser.uid,
                  verified: authUser.emailVerified,
                  ...userDoc.data(),
                } as AuthStateuser)
              : null;
            setUser(userData);
            setLoading(false);
          },
          (error) => {
            console.error(error);
            setLoading(false);
          }
        );

        // Unsubscribe from snapshot listener when the auth state changes or the component is unmounted
        return () => {
          unsubscribeSnapshot();
        };
      } else {
        // Set user state to null when not authenticated
        setUser(null);
        setLoading(false);
      }
    });

    // Unsubscribe from auth state changes when the component is unmounted
    return () => {
      unsubscribeAuth();
    };
  }, []);

  // Return user object and loading status
  return { user, loading };
};

export default useAuthState;
