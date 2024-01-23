import { doc, deleteDoc } from "firebase/firestore";
import { db } from "./config";

export const deletePost = async (id) => {
  // console.warn("loading...");
  let result = {};
  const dbDoc = doc(db, "posts", id);
  try {
    const res = await deleteDoc(dbDoc);
    result = id;
  } catch (error) {
    console.log("Error:", error);
  }
  console.log("result", result);
  return result;
};
