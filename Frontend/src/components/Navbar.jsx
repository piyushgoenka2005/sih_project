import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const user = true;
  return (
    <nav className="top-0 h-14 relative container mx-auto p-2 bg-blue-600 pr-10">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="pl-6">
          <span className="text-3xl font-bold cursor-pointer text-white">
            Veridion
          </span>
        </div>
        {/* Menu Items */}
        <div className="hidden space-x-6 md:flex">
          <Link to="/" className="hover:text-white">
            Home
          </Link>
          <Link to="/about" className="hover:text-white">
            About Us
          </Link>
          <Link to="/" className="hover:text-white">
            Testimonials
          </Link>
          <Link to="/contact" className="hover:text-white">
            Contact Us
          </Link>
        </div>
        {/* Button */}
        {user ? (
          <Link
            to="/profile"
            className="hidden p-3 px-6 pt-2 text-white bg-orange-600 rounded-full baseline hover:bg-orange-400 md:block"
          >
            Profile
          </Link>
        ) : (
          <Link
            to="/login"
            className="hidden p-3 px-6 pt-2 text-white bg-orange-600 rounded-full baseline hover:bg-orange-400 md:block"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
