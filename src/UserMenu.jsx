import { useNavigate } from "react-router-dom";
import { logout } from "./utils/auth";

export default function UserMenu({ name = "Sahar" }) {
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <div>
      <div className="container">
        <h2>Welcome, {name} !</h2>
        <div>
          <span>Dashboard</span>
          <span>Favorites</span>
          <span>Add Task</span>
        </div>
        <span onClick={handleLogout}>Logout</span>
      </div>
    </div>
  );
}
