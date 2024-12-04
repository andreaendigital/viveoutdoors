import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import AdminDashboard from "./AdminDashboard";
import UserDashboard from "./UserDashboard";

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  if (!user) return <div>No tienes permisos para acceder a esta página</div>;

  return user.rol === "admin" ? <AdminDashboard /> : <UserDashboard />;
};

export default Dashboard;
