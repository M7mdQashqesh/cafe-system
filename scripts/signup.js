import { auth, firestore } from "./firebase.js";
import {
  doc,
  setDoc,
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

let signupForm = document.querySelector("form");
signupForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  let emailInput = document.querySelector("#email");
  let passwordInput = document.querySelector("#password");
  let confirmInput = document.querySelector("#confirm-password");

  let email = emailInput.value.trim();
  let password = passwordInput.value.trim();
  let confirmPassword = confirmInput.value.trim();

  if (!email || !password || !confirmPassword) {
    // Notification
    Toastify({
      text: "All fields are required",
      duration: 3000,
      gravity: "top",
      position: "right",
      stopOnFocus: false,
      style: {
        background: "linear-gradient(to right, #ff416c, #ff4b2b)",
      },
      onClick: function () {},
    }).showToast();

    return;
  }

  if (
    !email.match(/^[\w.-]+@[\w.-]+\.\w{2,10}$/) ||
    !password.match(/^(?=.*?[0-9])(?=.*?[A-Za-z]).{8,32}$/) ||
    password !== confirmPassword
  ) {
    // Notification
    Toastify({
      text: "Wrong in email or password, please try again",
      duration: 3000,
      gravity: "top",
      position: "right",
      stopOnFocus: false,
      style: {
        background: "linear-gradient(to right, #ff416c, #ff4b2b)",
      },
      onClick: function () {},
    }).showToast();

    return;
  }

  try {
    let userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const userId = userCredential.user.uid;
    const useRef = doc(firestore, "users", userId);
    console.log(userId);
    await setDoc(useRef, {
      userId: userId,
      email: email,
      createdAt: new Date().toISOString(),
    });

    // Notification
    Toastify({
      text: "Account Created Successfully",
      duration: 3000,
      gravity: "top",
      position: "right",
      stopOnFocus: false,
      style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
      },
      onClick: function () {},
    }).showToast();

    setTimeout(() => {
      emailInput.value = "";
      passwordInput.value = "";
      confirmInput.value = "";
      window.location.href = "../pages/login.html";
    }, 500);
  } catch (error) {
    console.error("Filed To Signup: " + error);
    Toastify({
      text: "Signup failed: " + error.message,
      duration: 3000,
      gravity: "top",
      position: "right",
      stopOnFocus: false,
      style: {
        background: "linear-gradient(to right, #ff416c, #ff4b2b)",
      },
    }).showToast();
  }
});
