import { createContext, useContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail, updateProfile, updateEmail, updatePassword, onAuthStateChanged, sendEmailVerification } from "firebase/auth";
import auth from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {

  const [currentUser, setCurrentUser] = useState();
  const [user, setUser] =useState()
  const [loading, setLoading] = useState(true);

  const signup = async (email, password) => {
    // try {
    //   const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    //   const user = userCredential.user;
      
    //   await sendEmailVerification(user);
    //   setCurrentUser(user);

    //   // Wait for email verification
    //   const isEmailVerified = user.emailVerified;
    //   if (!isEmailVerified) {
    //     throw new Error("Please verify your email address");
    //   }

    //   return user;
    // } catch (error) {
    //   throw error;
    // }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await sendEmailVerification(user);

      // Wait for email verification
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        setCurrentUser(user);
        setLoading(false);
        unsubscribe(); // Unsubscribe to prevent further updates
      });

      return user;
    } catch (error) {
      throw error;
    }
  };
  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const userEmail = userCredential.user.email;

      const usersRef = collection(db, "users");
     const filteredQuery = query(usersRef, where("email", "==", userEmail));
     const snapshot = await getDocs(filteredQuery);
     const user = snapshot.docs.map((doc) => doc.data());

      setCurrentUser(user[0]);
      return user;
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setCurrentUser(null);
    } catch (error) {
      throw error;
    }
  };

  const forgotPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      throw error;
    }
  };

  const updateProfile = async (displayName) => {
    try {
      const user = auth.currentUser;
      await updateProfile(user, { displayName });
      setCurrentUser({ ...user, displayName });
    } catch (error) {
      throw error;
    }
  };

  const updateUserEmail = async (email) => {
return updateEmail(auth.currentUser, email)
  };

  const updateUserPassword = async (password) => {

    return updatePassword(auth.currentUser, password);

  };


  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, signup, login, logout, forgotPassword, updateProfile, updateUserEmail, updateUserPassword }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};