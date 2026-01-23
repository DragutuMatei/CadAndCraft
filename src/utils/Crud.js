import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "./fire";

class Crud {
  addData = async (collectionName, data) => {
    console.log("Adding data to", collectionName, data);
    try {
      const ref = await addDoc(collection(db, collectionName), data);
      return true;
    } catch (e) {
      console.error("Error adding document: ", e);
      return false;
    }
  };

  getData = async (collectionName) => {
    try {
      const querySnapshot = await getDocs(collection(db, collectionName));
      const results = [];
      querySnapshot.forEach((doc) => {
        results.push({ id: doc.id, ...doc.data() });
      });
      if (results.length === 0) {
        return null;
      }
      return results;
    } catch (error) {
      console.error("Error getting documents: ", error);
      return null;
    }
  };
}

export default Crud;
