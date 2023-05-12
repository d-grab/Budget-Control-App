import { useAuthContext } from "./useAuthContext";
import { updateEmail, updatePassword, updateProfile } from "firebase/auth";
import { useState } from "react";

export const useUpdateProfile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuthContext();

  const UpdateProfile = async ({ email, password, displayName }) => {
    setIsLoading(true);

    try {
      if (displayName) {
        await updateProfile(user, { displayName });
      }

      if (email) {
        await updateEmail(user, email);
      }

      if (password) {
        await updatePassword(user, password);
      }

      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);

      return err.message;
    }
  };

  return { UpdateProfile, isLoading };
};
