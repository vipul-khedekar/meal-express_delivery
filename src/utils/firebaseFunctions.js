//add new item
import { doc, setDoc } from "firebase/firestore";
import { firestore } from "../firebase.config";

export const addItem = async (data) => {
  await setDoc(doc(firestore, "foodItems", `${Date.now()}`), data, {
    merge: true,
  });
};
