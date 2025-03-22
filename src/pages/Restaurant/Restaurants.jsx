import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Restaurants() {
  const [restaurants, setRestaurants] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      console.error("No authentication token found. Redirecting to login.");
      navigate("/login");
      return;
    }

    fetch(`${import.meta.env.VITE_API_URL}/restaurants/`, {
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
      .then((data) => setRestaurants(data))
      .catch((error) => console.error("Error fetching restaurants:", error));
  }, [navigate]);

  // Get user role from localStorage
  const userRole = localStorage.getItem("role");

  // Fallback image URL
  const fallbackImage =
    "https://plus.unsplash.com/premium_photo-1661883237884-263e8de8869b?q=80&w=1189&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  // Filter restaurants based on search query
  const filteredRestaurants = restaurants.filter(
    (restaurant) =>
      restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      restaurant.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle card click to navigate to specific restaurant's menu items page
  const handleRestaurantClick = (restaurantId) => {
    navigate(`/menu_items/${restaurantId}`);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-secondary">Restaurants</h1>
        <div className="flex gap-3 w-full md:w-auto">
          {/* Search Field (Increased Width) */}
          <input
            type="text"
            placeholder="Search by name or location"
            className="px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary w-full md:w-96"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          {/* Add Restaurant Button (Only for Owners) */}
          {userRole === "owner" && (
            <button
              onClick={() => navigate("/add_restaurant")}
              className="bg-primary text-white px-4 py-2 rounded-md shadow-md hover:bg-primary-dark transition"
            >
              Add Restaurant
            </button>
          )}
        </div>
      </div>

      {/* Restaurants Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRestaurants.length > 0 ? (
          filteredRestaurants.map((restaurant) => (
            <div
              key={restaurant.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer"
              onClick={() => handleRestaurantClick(restaurant.id)}
            >
              <img
                src={fallbackImage}
                alt={restaurant.name}
                className="w-full h-48 object-cover"
                onError={(e) => (e.target.src = fallbackImage)} // Fallback image
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  {restaurant.name}
                </h2>
                <p className="text-gray-600">{restaurant.description}</p>
                <p className="text-sm text-gray-500 mt-2">
                  📍 {restaurant.location}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-3">
            No restaurants found.
          </p>
        )}
      </div>
    </div>
  );
}
