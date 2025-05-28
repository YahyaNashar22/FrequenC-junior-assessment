import { Navigate, Route, Routes } from "react-router-dom";
import Signin from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import PrivateRoute from "../components/PrivateRoute";
import Dashboard from "../pages/Dashboard";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={"/signin"} />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<SignUp />} />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
