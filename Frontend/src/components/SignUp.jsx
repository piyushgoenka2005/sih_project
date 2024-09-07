import React, { useState } from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    // Add submission logic here
  };

  return (
    <div className="flex items-center pt-10 pb-10 justify-center bg-blue-100">
      {/* Main container */}
      <div className="flex w-5/6 overflow-hidden bg-white rounded-lg shadow-lg">
        {/* Left side - Form */}
        <div className="w-full p-20 md:w-1/2">
          <h1 className="text-3xl font-bold text-center text-blue-600">
            Sign Up
          </h1>
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-blue-600"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 mt-1 border border-blue-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-400"
                placeholder="Enter your name"
              />
            </div>

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
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 mt-1 border border-blue-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-400"
                placeholder="Enter your email"
              />
            </div>

            {/* Role Dropdown */}
            <div>
              <label
                htmlFor="role"
                className="block text-sm font-medium text-blue-600"
              >
                Role
              </label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 mt-1 border border-blue-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-400"
              >
                <option value="">Select your role</option>
                <option value="verifying-authority">Verifying Authority</option>
                <option value="issuing-authority">Issuing Authority</option>
                <option value="individual">Individual</option>
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full px-4 py-2 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-400"
            >
              Sign Up
            </button>
            <p className="ml-24">Already have an account <Link to="/login" className="text-blue-600 hover:underline -mt-2">Login</Link></p>
          </form>
        </div>

        {/* Right side - Blue container with text */}
        <div className="hidden w-1/2 p-8 text-white bg-blue-600 md:flex md:flex-col md:justify-center">
          <h2 className="text-4xl font-bold">
            Join Us to Simplify Your Document Verification
          </h2>
          <p className="mt-4 text-lg pr-10">
            Create your account to securely store, manage, and verify your
            official documents with the power of AI and blockchain technology.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
