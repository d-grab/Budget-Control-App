import { useEffect, useState } from "react";
import { useAuthContext } from "./useAuthContext";

//firebase imports
import { auth } from "../Firebase/config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

export const useSignup = () => {
  //states
  const [isStopped, setIsStopped] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  //creating Signup function to import it in other component
  const signup = async (email, password, displayName) => {
    // resets the error every time we sign up new user
    setError(null);
    setIsLoading(true);
    try {
      // Sign In new user
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (!user) {
        throw new Error("Could not complete signup");
      }

      //add display name for the user
      await updateProfile(user, { displayName });

      // dispatch login action
      dispatch({ type: "LOGIN", payload: user });

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
  useEffect(() => {
    return () => setIsStopped(true);
  }, []);
  // returnng 2 values inside the object to grab from
  // other compoenenets when we use the hooks

  return { error, signup, isLoading };
};
