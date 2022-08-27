//add new item
import { doc, setDoc } from "firebase/firestore";
import { firestore } from "../firebase.config";

export async function saveItem(data) {
  await setDoc(doc(firestore, "foodItems", `${Date.now()}`), data, {
    merge: true,
  });
}
