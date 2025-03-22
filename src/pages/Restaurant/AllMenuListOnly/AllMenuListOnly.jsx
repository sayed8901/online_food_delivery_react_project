import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import SearchBar from "../MenuItemsWithCart/SearchBar";
import MenuItemCard from "./MenuItemCard";


export default function AllMenuItemsOnly() {
  const { restaurantId } = useParams();
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      console.error("No authentication token found. Redirecting to login.");
      navigate("/login");
      return;
    }

    const url = restaurantId
      ? `${import.meta.env.VITE_API_URL}/restaurants/res_menu/${restaurantId}/`
      : `${import.meta.env.VITE_API_URL}/restaurants/menu/`;

    fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.status === 401) {
          console.error("Unauthorized. Redirecting to login.");
          navigate("/login");
          return [];
        }
        return response.json();
      })
      .then((data) => {
        setMenuItems(Array.isArray(data) ? data : [data]);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching menu items:", error);
        setLoading(false);
      });
  }, [restaurantId, navigate]);

  const userRole = localStorage.getItem("role");

  // Filter menu items based on search query
  const filteredMenuItems = menuItems.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.restaurant.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-secondary">
          {restaurantId ? "Restaurant Menu" : "All Menu Items"}
        </h1>
        <div className="flex gap-3 w-full md:w-auto">
          {!restaurantId && (
            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          )}
          {userRole === "owner" && (
            <button
              onClick={() => navigate("/add_menu_item")}
              className="bg-primary text-white px-4 py-2 rounded-md shadow-md hover:bg-primary-dark transition"
            >
              Add Menu Item
            </button>
          )}
        </div>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMenuItems.length > 0 ? (
            filteredMenuItems.map((menuItem) => (
              <MenuItemCard
                key={menuItem.id}
                item={menuItem}
                userRole={userRole}
              />
            ))
          ) : (
            <p className="text-gray-500 text-center col-span-3">
              No menu items found.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
