import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useAuthContext } from "./customHooks/useAuthContext";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Singup";
import Plans from "./pages/Plans/Plans";
import Transactions from "./pages/Transactions/Transactions";
import Profile from "./pages/Profile/Profile";
import Categories from "pages/Categories/Categories";
import Graphs from "pages/Graphs/Graphs";

function App() {
  const { authIsReady, user } = useAuthContext();

  return (
    <div className="app shadow">
      {authIsReady && (
        <BrowserRouter>
          <Navbar />
          <Routes>
            {user && <Route path="/" element={<Home />} />}
            {user && <Route path="/profile" element={<Profile />} />}
            {user && <Route path="/plans" element={<Plans />} />}
            {user && <Route path="/transactions" element={<Transactions />} />}
            {user && <Route path="/categories" element={<Categories />} />}
            {user && <Route path="/graphs" element={<Graphs />} />}
            <Route path="/" element={<Navigate replace to="/login" />} />
            {!user && <Route path="/login" element={<Login />} />}
            <Route path="/login" element={<Navigate replace to="/" />} />
            {!user && <Route path="/signup" element={<Signup />} />}
            <Route path="/signup" element={<Navigate replace to="/" />} />
          </Routes>
          <ToastContainer
            position="top-right"
            autoClose={2000}
            limit={2}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
