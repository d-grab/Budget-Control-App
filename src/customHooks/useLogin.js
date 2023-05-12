import { useEffect, useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { auth } from "../Firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";

export const useLogin = () => {
  const [isStopped, setIsStopped] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext();

  // function to logout the user when he click the button for example

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    // Log in
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);

      // Dispatch logout action
      dispatch({ type: "LOGIN", payload: user });

      // update State
      if (!isStopped) {
        setIsLoading(false);
        setError(null);
      }
    } catch (err) {
      if (!isStopped) {
        setIsLoading(false);
        setError(null);

        setError(err.message);
        setIsLoading(false);
      }

      return err.message
    }
  };
  
  //Clean up function
  useEffect(() => {
    return () => setIsStopped(true);
  }, []);

  return { login, isLoading, error };
};
