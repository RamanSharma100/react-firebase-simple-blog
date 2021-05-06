import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.React_App_ApiKey,
  authDomain: process.env.React_App_AuthDomain,
  projectId: process.env.React_App_ProjectId,
  storageBucket: process.env.React_App_StorageBucket,
  messagingSenderId: process.env.React_App_MessagingSenderId,
  appId: process.env.React_App_AppId,
};

const fire = firebase.initializeApp(firebaseConfig);

export default fire;
