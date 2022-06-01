import { useState, useEffect } from "react";
import { app } from "../firebase/firebase_config";

const useFirestore = (collection) => {
  const [collData, setCollData] = useState([]);

  useEffect(() => {
    const unsub = app
      .firestore()
      .collection(collection)
      .onSnapshot((snap) => {
        let tempArr = [];
        snap.forEach((item) => {
          tempArr.push({ ...item.data(), id: item.id });
        });
        setCollData(tempArr);
      });

    return () => unsub();
  }, [collection]);

  return { collData };
};

export default useFirestore;
