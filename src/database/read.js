import { getFirestore, collection, getDocs } from "firebase/firestore";
import { db } from "./config";

export const load = async () => {
  // console.warn("loading...");
  let data = [];
  const dbCollection = collection(db, "posts");
  try {
    const querySnapshot = await getDocs(dbCollection);
    querySnapshot.forEach((doc) => {
      const post = {
        ...doc.data(),
        id: doc.id,
      };
      data.push(post);
    });
  } catch (error) {
    console.log("Error:", error);
  }

  return data;
};
