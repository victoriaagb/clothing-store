// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBYcFtB_znJ3LKLnxPL_ECBmUQJHNB8hxk",
  authDomain: "crwn-clothing-db-9dc3b.firebaseapp.com",
  projectId: "crwn-clothing-db-9dc3b",
  storageBucket: "crwn-clothing-db-9dc3b.appspot.com",
  messagingSenderId: "108218895207",
  appId: "1:108218895207:web:39af8e26050a9fa0427dc2",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// The Google provider that we will use for all of our authentications
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();

// Method so users sign in with a popup
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);

// Method so users sign in via redirect outside of application
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

// Creates a document based on the userAuth if user doesn't exist
export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  console.log(userSnapshot);
  console.log(userSnapshot.exists());

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    // try {
    await setDoc(userDocRef, {
      displayName,
      email,
      createdAt,
      ...additionalInformation,
    });
    // } catch (error) {
    //   console.log("error creating the user", error.message);
    //   throw new Error(error);
    // }
  }

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};
