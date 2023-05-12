import { useEffect, useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { toast } from "react-toastify";
import { auth } from "../Firebase/config";
import { signOut } from "firebase/auth";

export const useLogout = () => {
  const [isStopped, setIsStopped] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext();

  // function to logout the user when he click the button for example

  const logout = async () => {
    setIsLoading(true);
    setError(null);

    // Sign out
    try {
      await signOut(auth);

      // Dispatch logout action
      dispatch({ type: "LOGOUT" });

      
      // update State
      if (!isStopped) {
        setIsLoading(false);
        setError(null);
      }

    toast.success("Logout successfully.")

    } catch (err) {
      if (!isStopped) {
        setIsLoading(false);
        setError(null);

        setError(err.message);
        setIsLoading(false);
      }
    }
  };
  //Clean up function
  useEffect(() => {
    return () => setIsStopped(true);
  }, []);

  return { logout, isLoading, error };
};
