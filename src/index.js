import React from "react";
import ReactDOM from "react-dom";
import { AuthContextProvider } from "./context/AuthContext";
import App from "./App";

import 'react-toastify/dist/ReactToastify.css';
import "bootstrap/dist/css/bootstrap.min.css";

import "./index.css";
import "./App.css";

import "./components/Navbar/Navbar.css";
import "./pages/Login/Login.css";
import "./pages/Signup/Signup.css";
import "./pages/Plans/Plans.css"
import "./pages/Transactions/Transactions.css"
import "./pages/Categories/Categories.css"
import "./pages/Graphs/Graphs.css"
import "./pages/Profile/Profile.css"

import "./components/HeroContainer/HeroContainer.css"
import "./components/Plans/Plan.css"
import "./components/Transactions/Transaction.css"
import "./components/Categories/Category.css"


ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
