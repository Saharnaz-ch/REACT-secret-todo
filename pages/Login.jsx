//We Need:
//a login page with username
//then save the username to localStorage
//redirect to dashboard
//show user's tasks => CRUD
//polish and logout

import { useEffect, useState } from "react";
import { login, isAuthenticated } from "../src/utils/auth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  return (
    <div>
      <title>Login</title>
      <LoginForm />
    </div>
  );
}

function LoginForm() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    //for restericted user
    const trimmedUser = user.trim();

    //checks user and pass
    if (trimmedUser === "admin" && password == "p@ssw0rd") {
      login(trimmedUser);
      navigate("/dashboard");
    } else {
      alert("Invalid username or password");
    }
  };

  useEffect(() => {
    const alreadyLoggedIn = isAuthenticated();
    if (alreadyLoggedIn) {
      navigate("/dashboard", { replace: true });
    }
  }, []);

  return (
    <div className="flex min-h-screen">
      {/* Left side: Login form */}
      <div className="w-1/2 bg-white flex flex-col justify-center items-start px-20">
        {/* Title */}
        <div className="mb-10">
          <h1 className="text-2xl font-semibold text-[#D3B1F1] ">
            Secret Club
          </h1>
          <h2 className="text-5xl font-bold text-[#30005B]">TODO WebApp</h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full space-y-6">
          {/* Email */}
          <div>
            <label className="block mb-1 text-gray-800">Email</label>
            <input
              type="text"
              value={user}
              placeholder="you@example.com"
              onChange={(e) => setUser(e.target.value)}
              className="w-full border-b border-gray-500 focus:outline-none focus:border-purple-500 py-2 bg-transparent"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 text-gray-800">Password</label>
            <input
              type="password"
              value={password}
              placeholder="••••••••"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-b border-gray-500 focus:outline-none focus:border-purple-500 py-2 bg-transparent"
            />
          </div>

          {/* Forgot Password */}
          <div className="text-right">
            <span className="text-sm text-purple-400 hover:text-purple-600 cursor-pointer">
              Forgot password?
            </span>
          </div>

          {/* Login Button */}
          <div>
            <button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 text-[#ffffff] font-semibold px-6 py-2 rounded cursor-pointer"
            >
              LOGIN
            </button>
            <p className="text-red-400 text-xs pt-5">
              use "admin" as username and "p@ssw0rd" as the password
            </p>
          </div>
        </form>

        {/* Footer Text */}
        <p className="mt-12 text-sm text-gray-500">
          don’t have an account yet?{" "}
          <a href="/login" className="text-[#8C4CC5] hover:underline">
            Sign up
          </a>
        </p>
      </div>

      {/* Right side: Image */}
      <div className="w-1/2">
        <img
          src="/img/purple.jpg"
          alt="Purple Background"
          className="object-cover w-full h-full"
        />
      </div>
    </div>
  );
}
