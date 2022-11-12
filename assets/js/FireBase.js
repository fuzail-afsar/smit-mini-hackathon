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
  updateDoc,
  deleteDoc,
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
  #classesCollectionRef;
  #studentsCollectionRef;
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
    this.#classesCollectionRef = collection(this.#db, "classes");
    this.#studentsCollectionRef = collection(this.#db, "students");
  }

  // Authentication
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

  // Classes
  async createClass(data) {
    try {
      await addDoc(this.#classesCollectionRef, data);
    } catch (error) {
      throw error;
    }
  }

  async getClasses(callback) {
    try {
      const q = query(this.#classesCollectionRef);
      await onSnapshot(q, (querySnapshot) => {
        const classes = [];
        querySnapshot.forEach((doc) => {
          classes.push({ id: doc.id, ...doc.data() });
        });
        callback && typeof callback === "function" && callback(classes);
      });
    } catch (error) {
      throw error;
    }
  }

  async deleteClass(id) {
    try {
      await deleteDoc(doc(this.#db, "classes", id));
    } catch (error) {
      throw error;
    }
  }

  async editClass(id, data) {
    try {
      await updateDoc(doc(this.#db, "classes", id), data);
    } catch (error) {
      throw error;
    }
  }

  async getClass(id, callback) {
    try {
      await onSnapshot(doc(this.#db, "classes", id), (doc) => {
        callback && typeof callback === "function" && callback(doc.data());
      });
    } catch (error) {
      throw error;
    }
  }

  // Students
  async createStudent(data) {
    try {
      await addDoc(this.#studentsCollectionRef, data);
    } catch (error) {
      throw error;
    }
  }

  async getStudents(callback) {
    try {
      const q = query(this.#studentsCollectionRef);
      await onSnapshot(q, (querySnapshot) => {
        const students = [];
        querySnapshot.forEach((doc) => {
          students.push({ id: doc.id, ...doc.data() });
        });
        callback && typeof callback === "function" && callback(students);
      });
    } catch (error) {
      throw error;
    }
  }

  async deleteStudent(id) {
    try {
      await deleteDoc(doc(this.#db, "students", id));
    } catch (error) {
      throw error;
    }
  }

  async editStudent(id, data) {
    try {
      await updateDoc(doc(this.#db, "students", id), data);
    } catch (error) {
      throw error;
    }
  }

  async getStudent(id, callback) {
    try {
      await onSnapshot(doc(this.#db, "students", id), (doc) => {
        callback && typeof callback === "function" && callback(doc.data());
      });
    } catch (error) {
      throw error;
    }
  }
}
window.FireBase = FireBase;
