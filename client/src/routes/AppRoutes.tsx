import { Navigate, Route, Routes } from "react-router-dom";
import Signin from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import PrivateRoute from "../components/PrivateRoute";
import Dashboard from "../pages/Dashboard";
import TaskForm from "../pages/TaskForm";

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

      <Route
        path="/task/new"
        element={
          <PrivateRoute>
            <TaskForm />
          </PrivateRoute>
        }
      />

      <Route
        path="/task/edit/:id"
        element={
          <PrivateRoute>
            <TaskForm />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
