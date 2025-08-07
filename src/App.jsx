import "./App.css";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { isAuthenticated } from "./utils/auth";
import TaskItem from "./TaskItem";
import AddTodo from "./AddTodo";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          {/* <Navigate /> used to redirect users safely. replacement for Redirect */}
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            //redirect user based on login status using Navigate
            element={
              isAuthenticated() ? <Dashboard /> : <Navigate to="/login" />
            }
          />
          <Route path="/taskitem" element={<TaskItem />} />
          <Route path="/add" element={<AddTodo />} />
          <Route path="/tailwind" element={<TailwindP />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
