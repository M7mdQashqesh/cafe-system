import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAjUlNXRMUpBQcjD5B_gjoUlftHzMwV6j8",
  authDomain: "cafe-eb193.firebaseapp.com",
  projectId: "cafe-eb193",
  storageBucket: "cafe-eb193.firebasestorage.app",
  messagingSenderId: "103211126237",
  appId: "1:103211126237:web:2a8999795eeb9552243a34",
  measurementId: "G-BF4Q6M191J",
};

export const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const auth = getAuth(app);
