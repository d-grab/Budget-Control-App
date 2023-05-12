import { useEffect, useRef, useState } from "react";
import { db } from "../Firebase/config";
import {
  collection,
  onSnapshot,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { useAuthContext } from "./useAuthContext";

export const useCollection = (collectionName, _orderTrans) => {
  const { user } = useAuthContext();
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);
  // const [isLoading, setIsLoading] = useState(true)
  // We we dont user useRef it will cause infinite loop in useEffect
  // _queryNew is arrray and it will be different on every function call

  const currentUser = useRef(["user", "==", user.uid]).current;
  const orderByy = useRef(_orderTrans).current;

  useEffect(() => {
    let ref = collection(db, collectionName);

    if (currentUser) {
      ref = query(ref, where(...currentUser));
    }
    if (orderByy) {
      ref = query(ref, orderBy(...orderByy));
    }

    const unsubscribe = onSnapshot(
      ref,
      (querySnapshot) => {
        let results = [];
        querySnapshot.docs.forEach((doc) => {
          results.push({ ...doc.data(), id: doc.id });
        });

        //update state
        setDocuments(results);
        setError(null);

      },
      (error) => {
        console.log(error);
        setError("Data not fetched");
      }
    );

    //unsubscribe on unmount
    return () => unsubscribe();
  }, [collectionName, currentUser, orderByy]);

  // setIsLoading(false)
  return { documents, error };
};
