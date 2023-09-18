import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCDtBmAPjNaMBu2imWsK3Pq7Xn2fJjt_Cw",
  authDomain: "todo-app-765e7.firebaseapp.com",
  projectId: "todo-app-765e7",
  storageBucket: "todo-app-765e7.appspot.com",
  messagingSenderId: "1031177517428",
  appId: "1:1031177517428:web:b7e4df0b245dbb127c1421",

};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
