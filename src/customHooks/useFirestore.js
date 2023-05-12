import { useReducer, useEffect, useState } from "react";
import { db, timestamp } from "../Firebase/config";
import {
  collection,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
  getDoc,
  query,
  where,
} from "firebase/firestore";
import { useAuthContext } from "./useAuthContext";

let initialState = {
  isPending: false,
  document: null,
  success: null,
  error: null,
};

// Function for reducer
const firestoreReducer = (state, action) => {
  switch (action.type) {
    case "IS_PENDING":
      return { isPending: true, docuemnt: null, success: false, error: null };
    case "ADD_DOCUMENT":
      return {
        isPending: false,
        document: action.payload,
        success: true,
        error: null,
      };
    case "GET_A_DOCUMENT":
      return {
        isPending: false,
        document: action.payload,
        success: true,
        error: null,
      };
    case "UPDATE_DOCUMENT":
      return {
        isPending: false,
        document: action.payload,
        success: true,
        error: null,
      };
    case "DELETE_DOCUMENT":
      return {
        isPending: false,
        document: null,
        success: true,
        error: null,
      };
    case "ERROR":
      return {
        isPending: false,
        document: null,
        success: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const useFirestore = (collectionNew) => {
  const [response, dispatch] = useReducer(firestoreReducer, initialState);
  const [isCancelled, setIsCancelled] = useState(false);
  const { user } = useAuthContext();

  // collection reference
  const ref = collection(db, collectionNew);

  //dispatch if not cancelled
  const dispatchIfNotCancelled = (action) => {
    if (!isCancelled) {
      dispatch(action);
    }
  };

  // Add a document
  const addDocument = async (doc) => {
    dispatch({ type: "IS_PENDING" });

    try {
      const createdAt = timestamp.fromDate(new Date());
      const addedDocument = await addDoc(ref, {
        ...doc,
        createdAt,
        user: user.uid,
      });
      dispatchIfNotCancelled({
        type: "ADD_DOCUMENT",
        payload: addedDocument,
      });
    } catch (err) {
      dispatchIfNotCancelled({ type: "ERROR", payload: err.message });
    }
  };

  // Get a document
  const getDocument = async (id) => {
    dispatch({ type: "IS_PENDING" });

    try {
      const q = query(ref, where("id", "==", id))
      const querySnapshot = await getDoc(q);
      const getedDocument = querySnapshot.data()

      console.log(getedDocument)
      dispatchIfNotCancelled({
        type: "GET_A_DOCUMENT",
        payload: getedDocument,
      });
    } catch (err) {
      dispatchIfNotCancelled({ type: "ERROR", payload: err.message });
      console.log(err)
    }
  };

  // Update a document
  const updateDocument = async (newdoc, id) => {
    dispatch({ type: "IS_PENDING" });
    try {
      const updatedAt = timestamp.fromDate(new Date());
      const docRef = doc(db, collectionNew, id);
      const updatedDocument = await updateDoc(docRef, { ...newdoc, updatedAt });

      dispatchIfNotCancelled({
        type: "UPDATE_DOCUMENT",
        payload: updatedDocument,
      });
    } catch (err) {
      dispatchIfNotCancelled({
        type: "ERROR",
        payload: err.message,
      });
    }
  };

  // Delete a document
  const deleteDocument = async (id) => {
    dispatch({ type: "IS_PENDING" });

    try {
      //signle doc ref
      const docRef = doc(db, collectionNew, id);

      const deletedDocument = await deleteDoc(docRef);
      dispatchIfNotCancelled({
        type: "DELETE_DOCUMENT",
        payload: deletedDocument,
      });
    } catch (err) {
      dispatchIfNotCancelled({
        type: "ERROR",
        payload: err.message,
      });
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { addDocument, getDocument, updateDocument, deleteDocument, response };
};
