//add new item
import {
  doc,
  setDoc,
  getDocs,
  query,
  collection,
  orderBy,
} from "firebase/firestore";
import { firestore } from "../firebase.config";

export async function saveItem(data) {
  await setDoc(doc(firestore, "foodItems", `${Date.now()}`), data, {
    merge: true,
  });
}

export async function fetchFoodItems() {
  const items = await getDocs(
    query(collection(firestore, "foodItems"), orderBy("id", "desc"))
  );
  return items.docs.map((doc) => {
    return doc.data();
  });
}
