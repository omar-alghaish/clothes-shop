import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage"
import "firebase/storage"


const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY ,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MASSIGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
  };


  const app = initializeApp(firebaseConfig);

  const auth = getAuth(app);

  export default auth;
  export const db = getFirestore(app);
  export const storage = getStorage(app)
  
  // "AIzaSyAzR5_NTEDjbbUPTBdq9z4afogL9OCZJdU"