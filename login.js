


const StudentOptions = document.getElementsByName("LoginAS");
const FormBox = document.querySelector(".form-box");


// Function to remove any existing registration link
function removeExistingRegisterLink() {
    let existingLink = document.querySelector(".register-link");
    if (existingLink) {
        existingLink.remove();
    }
}
//Registration link for student 

for (let i = 0; i < StudentOptions.length; i++) {

    StudentOptions[i].addEventListener("click", function () {

        removeExistingRegisterLink(); //Remove any existing link

        if (StudentOptions[i].checked && StudentOptions[i].value === "Student" ) {
            // Add the registration link for Student
            FormBox.insertAdjacentHTML("beforeend", '<a href="student-reg.html" class="register-link">Register as Student</a>');
        }
         if(StudentOptions[i].checked && StudentOptions[i].value=== "admin"){
        FormBox.insertAdjacentHTML("beforeend",'<a href="Registration.html" class="register-link">Register as Admin</a>')
    }
    });
}




//Code for loging
let submit = document.getElementById("submit");
submit.addEventListener("click",()=>{
    const email = document.getElementById("email");
    const Password = document.getElementById("password");
    firebase.auth().signInWithEmailAndPassword(email, Password)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
  });
})





