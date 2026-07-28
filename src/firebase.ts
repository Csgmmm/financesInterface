import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";



const firebaseConfig = {
  apiKey: "AIzaSyDMr7_UXU1di-lRItAED6FIQacUyO_ruU8",
  authDomain: "finances-9b3e1.firebaseapp.com",
  projectId: "finances-9b3e1",
  storageBucket: "finances-9b3e1.firebasestorage.app",
  messagingSenderId: "591671311834",
  appId: "1:591671311834:web:4088b26b6f06b3ef8194e3"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Inicializa a base de dados (Firestore) e exporta para usar no resto do site
export const db = getFirestore(app);