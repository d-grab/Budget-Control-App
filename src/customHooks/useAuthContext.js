import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

export const useAuthContext = () => {
    const context = useContext(AuthContext)

    if (!context) {
    //check if the context is in the scope (at the moment all app is in the scope)
        throw Error ('useAuthContext must be inside AuthContextProvider ! ')
    }

    return context
}