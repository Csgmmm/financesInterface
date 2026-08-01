import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut 
} from "firebase/auth";


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

export const auth = getAuth(app);

// Fornecedor do Google e funções auxiliares de Login/Logout
export const googleProvider = new GoogleAuthProvider();
export const loginWithGoogle = () => signInWithPopup(auth, googleProvider);
export const logout = () => signOut(auth);

// Inicializa a base de dados (Firestore) e exporta para usar no resto do site
export const db = getFirestore(app);