import React, { useState } from "react";
import { useAuth } from "../Context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [showLoginMenu, setShowLoginMenu] = useState(false);
  const [showRegisterMenu, setShowRegisterMenu] = useState(false);
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login"); 
  };

  return (
    <nav className="bg-gray-100 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex items-center">
            {/* <img
              src="/logo.png"
              alt="Logo"
              className="h-10 w-auto mr-4"
            /> */}
            <span className="text-xl font-bold text-blue-800">MediQueue</span>
          </div>

          {/* Nav Links */}
          <div className="flex items-center space-x-6">
            <Link to="/" className="text-blue-900 hover:text-blue-600 font-medium">Home</Link>
            <Link to="/department" className="text-blue-900 hover:text-blue-600 font-medium">Department</Link>

            {!isLoggedIn ? (
              <>
                {/* Login Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setShowLoginMenu(!showLoginMenu)}
                    className="bg-blue-900 text-white px-4 py-2 rounded-full shadow hover:bg-blue-700 transition"
                  >
                    Login
                  </button>
                  {showLoginMenu && (
                    <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md z-10">
                      <Link to="/login" className="block px-4 py-2 text-sm hover:bg-gray-100">Patient Login</Link>
                      <Link to="/login/doctor" className="block px-4 py-2 text-sm hover:bg-gray-100">Doctor Login</Link>
                    </div>
                  )}
                </div>

                {/* Register Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setShowRegisterMenu(!showRegisterMenu)}
                    className="bg-blue-900 text-white px-4 py-2 rounded-full shadow hover:bg-blue-700 transition"
                  >
                    Register
                  </button>
                  {showRegisterMenu && (
                    <div className="absolute right-0 mt-2 w-44 bg-white shadow-lg rounded-md z-10">
                      <Link to="/register/patient" className="block px-4 py-2 text-sm hover:bg-gray-100">Patient Register</Link>
                      <Link to="/register/doctor" className="block px-4 py-2 text-sm hover:bg-gray-100">Doctor Register</Link>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link to="/patient">
                  <button className="bg-blue-900 text-white px-4 py-2 rounded-full shadow hover:bg-blue-700 transition">
                    Dashboard
                  </button>
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 text-white px-4 py-2 rounded-full shadow hover:bg-red-500 transition"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
