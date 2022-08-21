import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCL1IAHY4Ov-V42VXemQOv9QswwqM81NJw",
  authDomain: "meal-express-delivery.firebaseapp.com",
  databaseURL: "https://meal-express-delivery-default-rtdb.firebaseio.com",
  projectId: "meal-express-delivery",
  storageBucket: "meal-express-delivery.appspot.com",
  messagingSenderId: "177729859997",
  appId: "1:177729859997:web:f0c10c9b7e21a77bdabf74",
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, firestore, storage };
