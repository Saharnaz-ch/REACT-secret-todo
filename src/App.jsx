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
import TaskProvider from "../context/TaskContext";

// const isAuthenticated = false

function App() {
  return (
    <div>
      <Router>
        <TaskProvider>
          <Routes>
            {/* <Navigate /> used to redirect users safely. replacement for Redirect */}
            <Route
              path="/"
              element={
                isAuthenticated() ? (
                  <Navigate to="/dashboard" />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route path="/login" element={<Login />} />
            <Route
              path="/dashboard"
              //redirect user based on login status using Navigate
              element={<Dashboard />}
            />
            <Route path="/taskitem" element={<TaskItem />} />
            <Route path="/add" element={<AddTodo />} />
          </Routes>
        </TaskProvider>
      </Router>
    </div>
  );
}

export default App;
