import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function RestaurantMenuItems() {
  const { restaurantId } = useParams(); // Get restaurantId from URL params
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      console.error("No authentication token found. Redirecting to login.");
      return;
    }

    fetch(
      `${import.meta.env.VITE_API_URL}/restaurants/menu/${parseInt(
        restaurantId
      )}/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setMenuItems(Array.isArray(data) ? data : [data]); // Ensure it's an array
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching menu items:", error);
        setLoading(false);
      });
  }, [restaurantId]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-secondary">Menu Items</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.length > 0 ? (
            menuItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {item.name}
                  </h2>
                  <p className="text-gray-600">{item.description}</p>
                  <p className="text-sm text-gray-500 mt-2">💵 ${item.price}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center col-span-3">
              No menu items available.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
