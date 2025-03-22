import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function MenuItems() {
  const { restaurantId } = useParams(); // Get restaurantId from URL (if available)
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
      ? `${import.meta.env.VITE_API_URL}/restaurants/menu/${restaurantId}/`
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

  // Get user role from localStorage
  const userRole = localStorage.getItem("role");

  // Filter menu items based on search query
  const filteredMenuItems = menuItems.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.restaurant.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-secondary">
          {restaurantId ? "Restaurant Menu" : "All Menu Items"}
        </h1>
        <div className="flex gap-3 w-full md:w-auto">
          {/* Search Field */}
          {!restaurantId && (
            <input
              type="text"
              placeholder="Search by Menu item name or Restaurant name"
              className="px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary w-full md:w-96"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          )}

          {/* Add Menu Item Button (Only for Owners) */}
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

      {/* Loading State */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMenuItems.length > 0 ? (
            filteredMenuItems.map((menuItem) => (
              <MenuItemCard key={menuItem.id} item={menuItem} />
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

// Reusable Menu Item Card Component
function MenuItemCard({ item }) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-900">{item.name}</h2>
        <p className="text-gray-600">{item.description}</p>
        <p className="text-sm text-gray-500 mt-2">🍴 {item.restaurant}</p>
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-500 mt-2">💵 ${item.price}</p>
          <p className="text-sm text-gray-500 mt-2">
            <small>Status:</small>{" "}
            {item.available ? "Available" : "Unavailable"}
          </p>
        </div>
      </div>
    </div>
  );
}
