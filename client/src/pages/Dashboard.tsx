import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const Dashboard = () => {
  const { clearToken } = useAuthStore();
  const navigate = useNavigate();

  const logout = () => {
    clearToken();
    navigate("/signin");
  };
  return (
    <main>
      <h1>Dashboard</h1>
      <button onClick={logout}>Logout</button>
    </main>
  );
};

export default Dashboard;
