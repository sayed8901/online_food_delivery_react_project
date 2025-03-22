import { NavLink } from "react-router-dom";
import userIcon from "../../assets/profile_img.png";

const AuthMenuItems = ({ user, handleLogout }) => {
  return (
    <div className="flex gap-3 items-center">
      {/* Conditionally render items based on user authentication status */}
      {user.username && user.role ? (
        <div className="flex gap-3 items-center">
          {/* Profile Info Display */}
          <div
            className={`flex flex-col items-center justify-center ml-1 mr-4`}
          >
            <div className="flex flex-row items-center justify-center gap-1">
              <p className="font-bold text-sm text-green-300">
                {user.username}
              </p>
              <img
                className="h-4 w-4 rounded-full -mr-2"
                src={userIcon}
                alt="Profile Icon"
                style={{ filter: "invert(100%)" }}
              />
            </div>
            <p className="text-white text-sm">({user.role})</p>
          </div>

          <button
            onClick={handleLogout}
            className="rounded-md p-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white text-center"
          >
            Logout
          </button>
        </div>
      ) : (
        <>
          <NavLink
            to="/login"
            className="rounded-md p-4 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
          >
            Login
          </NavLink>
          <NavLink
            to="/owner_register"
            className="rounded-md p-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white text-center w-24"
          >
            Owner Registration
          </NavLink>
          <NavLink
            to="/user_register"
            className="rounded-md p-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white text-center w-24"
          >
            User Registration
          </NavLink>
        </>
      )}
    </div>
  );
};

export default AuthMenuItems;
