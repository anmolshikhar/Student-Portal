// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCyYBktfhRKht0_tDBkbCtVMZTGJz8ouJ8",
    authDomain: "student-teacher-appointm-15733.firebaseapp.com",
    projectId: "student-teacher-appointm-15733",
    storageBucket: "student-teacher-appointm-15733.appspot.com",
    messagingSenderId: "603159057730",
    appId: "1:603159057730:web:4b471c36f6714933abe4db"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

let submit = document.getElementById("Submitbtn");

// Function to show messages
function msgshow(message, id) {
    var msgDiv = document.getElementById(id);
    if (!msgDiv) return;
    msgDiv.textContent = message;
    msgDiv.style.display = "block";
    msgDiv.style.opacity = 1;

    setTimeout(() => {
        msgDiv.style.opacity = 0;
    }, 10000);
}

submit.addEventListener("click", (event) => {
    event.preventDefault();

    // Getting values from inputs
    let username = document.getElementById("Name").value;
    let userNO = document.getElementById("number").value;
    let userEmail = document.getElementById("Email").value;
    let userPhoto = document.getElementById("photo").value;
    let collage = document.getElementById("coll").value;
    let collAdd = document.getElementById("collAdd").value;
    let pass = document.getElementById("Password").value;
    let collId = document.getElementById("collId").value;


    createUserWithEmailAndPassword(auth, userEmail, pass)
        .then((userCredential) => {
            const user = userCredential.user;

            const userdata = {
                Email: userEmail,
                userName: username,
                userNumber: userNO,
                Collage_Address: collAdd,
                collage_Name: collage,
                userPhoto: userPhoto,
                collage_Id : collId
                
            };

            msgshow('Account is created', 'signupMsg');

            const docRef = doc(db, "admin", user.uid); // collection = users
            return setDoc(docRef, userdata);
        })
        .then(() => {
           setTimeout(()=>{
             window.location.href = 'Registration.html';
           },5000)
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

            if (errorCode === 'auth/email-already-in-use') {
                msgshow('Email is already in use', 'signupMsg');
            } else {
                msgshow('Unable to create account: ' + errorMessage, 'signupMsg');
            }
            event.preventDefault();
        });
});
