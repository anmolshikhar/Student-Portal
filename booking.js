
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCyYBktfhRKht0_tDBkbCtVMZTGJz8ouJ8",
  authDomain: "student-teacher-appointm-15733.firebaseapp.com",
  databaseURL: "https://student-teacher-appointm-15733-default-rtdb.firebaseio.com",
  projectId: "student-teacher-appointm-15733",
  storageBucket: "student-teacher-appointm-15733.firebasestorage.app",
  messagingSenderId: "603159057730",
  appId: "1:603159057730:web:4b471c36f6714933abe4db"
}
function msgBox(message, Id) {
  const box = document.getElementById(Id)
  box.textContent = message;
  box.style.display = 'block';
  box.style.opacity = '1';
  setTimeout(() => {
    box.style.opacity = '0';
    setTimeout(() => {
      box.style.display = 'none';
    }, 1000);
  }, 3000);

}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

let submit_Btn = document.getElementById("submit")


submit_Btn.addEventListener("click", (event) => {
  event.preventDefault();
  let Email = document.getElementById("Email").value;
  let Password = document.getElementById("password").value
  let logBox = document.getElementById("login-box");
  let bookBox = document.getElementById("book");

  signInWithEmailAndPassword(auth, Email, Password)
    .then((userCredential) => {
      const user = userCredential.user
      localStorage.setItem("loggedInUserId", user.uid);
      logBox.style.display = 'none';
      bookBox.style.display = 'inline';



    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

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
})
const appSub = document.getElementById("Appointment_btn")
appSub.addEventListener("click", (event) => {
  event.preventDefault();


  const Name = document.getElementById("studentName").value
  const Teacher = document.getElementById("teacher").value
  const date = document.getElementById("date").value
  const time = document.getElementById("time").value
  const request = document.getElementById("message").value
  const user_data = {
    Name: Name,
    Teacher: Teacher,
    Date: date,
    Time: time,
    Request_msg: request

  }
  const auth = getAuth();
  const user = auth.currentUser;
  if (user) {
    const docRef = doc(db, "appointment", user.uid);
    try {
      setDoc(docRef, user_data);
      alert("Appointment saved successfully!");
    } catch (error) {
      console.error("Error saving appointment: ", error);
      alert("Failed to save appointment.");
    }
  } else {
    alert("User is not logged in.");
  }

})