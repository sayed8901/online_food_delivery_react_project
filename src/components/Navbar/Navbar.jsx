import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/front_page-icon.svg";

import MainMenuItems from "./MainMenuItems";
import AuthMenuItems from "./AuthMenuItems";
import { UserContext } from "../../contexts/UserContext";


const Navbar = () => {
  const { user, updateUser } = useContext(UserContext); // Get user state from context
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user info from localStorage
    const username = localStorage.getItem("username");
    const role = localStorage.getItem("role");

    if (username && role) {
      updateUser({ username, role });
    }
  }, []); // N.B.: No dependencies, so this will run only once

  // Handle logout logic
  const handleLogout = () => {
    localStorage.clear();

    updateUser({
      username: null,
      userType: null,
    });

    // redirecting to homepage
    navigate("/");
  };

  return (
    <nav className="bg-gray-600 sm:fixed z-20 w-full">
      <div className="px-2 lg:px-6 xl:px-10">
        <div className="relative flex flex-row gap-16 sm:gap-3 md:gap-8 lg:gap-16 h-14 items-center justify-between">
          <div className="flex flex-1 items-center justify-start sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <img
                className="h-8 w-auto pl-3 sm:pl-0"
                src={logo}
                alt="Your Company"
              />
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex flex-row gap-1 md:gap-5 items-center">
                {/* conditionally rendering additional menu items */}
                <MainMenuItems user={user} />
              </div>
            </div>
          </div>

          <div className="flex items-center" id="navbar-element-auth">
            {/* conditionally rendering additional login & logout menu items */}
            <AuthMenuItems user={user} handleLogout={handleLogout} />
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="sm:hidden" id="mobile-menu">
        <div className="flex justify-around items-center px-2 pb-3 pt-2">
          {/* conditionally rendering additional menu items for mobile screen */}
          <MainMenuItems user={user} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
