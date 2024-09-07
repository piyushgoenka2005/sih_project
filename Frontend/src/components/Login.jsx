import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email Submitted:", email);
    // Add login logic here
  };

  return (
    <div className="flex items-center justify-center bg-blue-100">
      {/* Main container */}
      <div className="flex w-2/3 mt-20 mb-28 bg-white rounded-lg shadow-lg">
        {/* Left side - Form */}
        <div className="w-full p-8 flex flex-col justify-center md:w-1/2">
          <h1 className="text-3xl font-bold text-center text-blue-600">
            Login
          </h1>
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-blue-600"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 mt-1 border border-blue-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-400"
                placeholder="Enter your email"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full px-4 py-2 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-400"
            >
              Login
            </button>
            <p className="mt-4 text-center">
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-600 hover:underline">
                Sign Up
              </Link>
            </p>
          </form>
        </div>

        {/* Right side - Blue container with text */}
        <div className="hidden w-1/2 p-8 text-white bg-blue-600 md:flex md:flex-col md:justify-center">
          <h2 className="text-4xl font-bold">Welcome Back!</h2>
          <p className="mt-4 text-lg">
            Log in to access your account and continue managing your documents
            securely.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
