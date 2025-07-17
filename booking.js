// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCyYBktfhRKht0_tDBkbCtVMZTGJz8ouJ8",
  authDomain: "student-teacher-appointm-15733.firebaseapp.com",
  databaseURL: "https://student-teacher-appointm-15733-default-rtdb.firebaseio.com",
  projectId: "student-teacher-appointm-15733",
  storageBucket: "student-teacher-appointm-15733.firebasestorage.app",
  messagingSenderId: "603159057730",
  appId: "1:603159057730:web:4b471c36f6714933abe4db"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

function showLogin() {
  // Automatically show login box on page load
  document.getElementById("login-box").style.display = "block";
  document.getElementById("book").style.display = "none"
}

signInWithEmailAndPassword(auth, Email, Password)
  .then((userCredential) => {
    const user = userCredential.user;
    localStorage.setItem("loggedInUserId", user.uid);

    // Redirect based on role
    if (selectedRole === "Student") {
      window.location.href = "Student.html";
    } else if (selectedRole === "admin") {
      window.location.href = "admin.html";
    } else if (selectedRole === "Teacher") {
      window.location.href = "index.html";
    }
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;

    console.error("Authentication error:", errorCode, errorMessage);

    if (errorCode === 'auth/invalid-credential') {
      msgBox("Invalid email or password", "msgBox");
    } else if (errorCode === 'auth/user-not-found') {
      msgBox("User not found", "msgBox");
    } else if (errorCode === 'auth/wrong-password') {
      msgBox("Wrong password", "msgBox");
    } else if (errorCode === 'auth/too-many-requests') {
      msgBox("Too many failed attempts. Please try again later", "msgBox");
    } else {
      msgBox("Something went wrong: " + errorMessage, "msgBox");
    }
  })