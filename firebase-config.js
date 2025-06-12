import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, query, where, doc, getDocs, setDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";



const firebaseConfig = {
  apiKey: "AIzaSyDHut_26N5mo3PGt8-T29rCFaBYdSjDpRU",
  authDomain: "olimpiadasliceo.firebaseapp.com",
  projectId: "olimpiadasliceo",
  storageBucket: "olimpiadasliceo.firebasestorage.app",
  messagingSenderId: "770744605474",
  appId: "1:770744605474:web:892a43846aa6f423af237b"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);



export { db, collection, doc, query, where, getDocs, setDoc };