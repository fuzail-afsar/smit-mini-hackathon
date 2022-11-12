import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signOut,
} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import {
  doc,
  setDoc,
  getDocs,
  addDoc,
  getFirestore,
  collection,
  query,
  where,
  serverTimestamp,
  onSnapshot,
  orderBy,
} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";
class FireBase {
  #auth;
  #db;
  #usersCollectionRef;
  constructor() {
    this.#init();
  }
  async #init() {
    const app = initializeApp({
      apiKey: "AIzaSyCm8erpe85uGcEV-HDtsNgLf5nUP2W5GS4",
      authDomain: "smit-attendance.firebaseapp.com",
      projectId: "smit-attendance",
      storageBucket: "smit-attendance.appspot.com",
      messagingSenderId: "1019056210382",
      appId: "1:1019056210382:web:d75f05c6fab1807f262b9f",
    });
    this.#auth = getAuth(app);
    this.#db = getFirestore(app);
    this.#usersCollectionRef = collection(this.#db, "users");
  }

  isLoggedIn() {
    return new Promise((resolve, reject) => {
      onAuthStateChanged(this.#auth, (user) => {
        if (user) resolve(true);
        reject(false);
      });
    });
  }

  async signIn(email, password) {
    try {
      await signInWithEmailAndPassword(this.#auth, email, password);
    } catch (error) {
      throw error;
    }
  }

  async signOutUser() {
    try {
      await signOut(this.#auth);
    } catch (error) {
      throw error;
    }
  }

  getUserProfile() {
    return this.#auth.currentUser;
  }

  getUser() {
    return new Promise(async (resolve, reject) => {
      try {
        const querySnapshot = await getDocs(
          query(
            this.#usersCollectionRef,
            where("email", "==", this.getUserProfile().email)
          )
        );
        querySnapshot.forEach((doc) => {
          resolve({ ...doc.data(), id: doc.id });
        });
      } catch (error) {
        reject(error);
      }
    });
  }
}
window.FireBase = FireBase;
