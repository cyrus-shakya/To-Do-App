import { getFirestore, collection, addDoc, getDoc } from "firebase/firestore";
import { db } from "./config";

export const addPost = async (description, done) => {
  // console.warn("loading...");
  let result = {};
  const dbCollection = collection(db, "posts");
  try {
    // firestore db fields name must be same
    const res = await addDoc(dbCollection, {
      description,
      done,
    });

    const docSnapshot = await getDoc(res);
    if (docSnapshot.exists()) {
      result = {
        ...docSnapshot.data(),
        id: docSnapshot.id,
      };
    } else {
      console.log("Document does not exist");
    }
  } catch (error) {
    console.log("Error:", error);
  }
  console.log("result", result);
  return result;
};
