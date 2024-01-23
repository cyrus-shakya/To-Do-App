import { doc, updateDoc } from "firebase/firestore";
import { db } from "./config";

export const updatePost = async (payload) => {
  // console.warn("loading...");
  let result = {};
  const dbDoc = doc(db, "posts", payload.id);
  try {
    const res = await updateDoc(dbDoc, {
      ...payload,
    });
    result = payload;
  } catch (error) {
    console.log("Error:", error);
    result = {
      ...payload,
      done: !payload.done,
    };
  }

  return result;
};
