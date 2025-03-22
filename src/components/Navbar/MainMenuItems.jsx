import { NavLink } from "react-router-dom";

const MainMenuItems = ({ user }) => {
  return (
    <>
      <NavLink
        to="/"
        className="rounded-md p-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white text-center"
      >
        Home
      </NavLink>
      <NavLink
        to="/all_restaurants"
        className="rounded-md p-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white text-center"
      >
        Restaurants
      </NavLink>

      {user.role === "owner" && (
        <>
          <NavLink
            to="/my_menu_items"
            className="rounded-md p-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white text-center"
          >
            My Menu Item
          </NavLink>
        </>
      )}

      {user.role === "user" && (
        <>
          <NavLink
            to="/all_menu_items"
            className="rounded-md p-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white text-center"
          >
            All Menu Item
          </NavLink>
          <NavLink
            to="/my_orders"
            className="rounded-md p-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white text-center"
          >
            My Orders
          </NavLink>
        </>
      )}
      <NavLink
        to="/contact"
        className="rounded-md p-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white text-center"
      >
        Contact
      </NavLink>
    </>
  );
};

export default MainMenuItems;
