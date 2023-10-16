import {
  collection,
  getDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { db } from "../firebase";
import { useAuth } from "./AuthContext";

const UserContext = createContext();

const UserProvider = ({ children }) => {

  const { currentUser, logout } = useAuth();

  const [user, setUser] = useState();

  const getUsers = async () => {
    const usersRef = collection(db, "users");
    const snapShop = await getDocs(usersRef);
    const data = snapShop.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  };

  const getUser = async (email) => {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("email", "==", `${email}`));
    const snapShop = await getDocs(q);
    const doc = snapShop.docs.map((doc) => ({ id: doc.id, ...doc.data() }))[0];
    setUser(doc);
    //   return user1;
  };

  const updateUser = async (id, data) => {
    const userRef = doc(db, "users", `${id}`);
     await updateDoc(userRef,data)
  };

  useEffect(()=>{
    getUser(currentUser?.email)
  },[])

  return (
    <UserContext.Provider value={{ getUser, user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;

export const useUser = () => {
  return useContext(UserContext);
};
