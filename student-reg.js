
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js"
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
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

let submit_Btn = document.getElementById("submit")

function mesShow(msg, Id) {
  var message = document.getElementById(Id);
  if (!message) return;
  message.textContent = msg;
  message.style.display = "block";
  message.style.opacity = 1;
  setTimeout(() => {
    message.style.opacity = 0;
  }, 5000)

}
submit_Btn.addEventListener("click", (event) => {
 event.preventDefault();
  
  let name = document.getElementById("name").value;
  let Father = document.getElementById("F_name").value;
  let Mother = document.getElementById("M_name").value;
  let age = document.getElementById("age").value;
  let w_number = document.getElementById("w_NUM").value;
  let class_ = document.getElementById("class").value;
  let addmistion_year = document.getElementById("Add_miss").value;
  let Password = document.getElementById("pass").value;
  let email = document.getElementById("Email").value;
  let collage_Id = document.getElementById("coll_Id")

  createUserWithEmailAndPassword(auth, email, Password)
    .then((userCredential) => {
      const user = userCredential.user;

      const userData = {
        userName: name,
        userFather: Father,
        userMother: Mother,
        userAge: age,
        userNumber: w_number,
        userClass: class_,
        userAddmis: addmistion_year,
        userPass: Password,
        userEmail: email,
        collage:collage_Id
      };

      mesShow("Account is successfully created", "msgBox");
      const userDoc = doc(db, "users", user.uid);
      return setDoc(userDoc, userData);
    })
    .then(() => {
      window.location.href = "student-reg.html";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      if (errorCode === 'auth/email-already-in-use') {
        mesShow('Email is already in use', 'msgBox');
      } else {
        mesShow('Unable to create account: ' + errorMessage, 'msgBox');
      }
    });
});
