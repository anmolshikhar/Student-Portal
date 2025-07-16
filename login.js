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

// Function to show messages
function msgBox(message, elementId) {
  const msgElement = document.getElementById(elementId);
  msgElement.textContent = message;
  msgElement.style.display = 'block';
  msgElement.style.opacity = '1';
  
  // Hide message after 3 seconds
  setTimeout(() => {
    msgElement.style.opacity = '0';
    setTimeout(() => {
      msgElement.style.display = 'none';
    }, 1000);
  }, 3000);
}

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
  const submit = document.getElementById("submit");
  
  submit.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent form submission
    
    const Email = document.getElementById("email").value;
    const Password = document.getElementById("password").value;
    
    // Get all radio buttons with name="LoginAS"
    const StudentOptions = document.getElementsByName("LoginAS");
    
    let selectedRole = "";
    for (let i = 0; i < StudentOptions.length; i++) {
      if (StudentOptions[i].checked) {
        selectedRole = StudentOptions[i].value;
        break;
      }
    }
    
    // Validation
    if (!selectedRole) {
      msgBox("Please select a role (Student/Teacher/Admin)", "msgBox");
      return;
    }
    
    if (!Email || !Password) {
      msgBox("Email or password cannot be empty", "msgBox");
      return;
    }
    
    // Firebase authentication
    signInWithEmailAndPassword(auth, Email, Password)
      .then((userCredential) => {
        const user = userCredential.user;
        localStorage.setItem("loggedInUserId", user.uid);
        
        // Redirect based on role
        if (selectedRole === "Student") {
          window.location.href = "index.html";
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
        
      });
  });
});