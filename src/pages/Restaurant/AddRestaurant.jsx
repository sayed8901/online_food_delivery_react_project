import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingSpinner from "../../utilities/LoadingSpinner";
import useTitle from "../../utilities/useTitle";

const AddRestaurant = () => {
  useTitle("Add Restaurant");

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: "",
    owner: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("authToken");
  const owner_id = localStorage.getItem("user_id");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRestaurantSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    const restaurantData = {
      ...formData,
      owner: parseInt(owner_id),
    };

    fetch(`${import.meta.env.VITE_API_URL}/restaurants/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(restaurantData),
    })
      .then((res) =>
        res.json().then((data) => ({
          status: res.status,
          body: data,
        }))
      )
      .then((response) => {
        setIsLoading(false);

        if (response.status === 400) {
          displayErrorMessages(response.body);
        } else {
          setSuccessMessage("Restaurant added successfully.");
          toast.success("Restaurant added successfully.");
          console.log(successMessage)
          navigate("/all_restaurants");
        }
      })
      .catch((err) => {
        setIsLoading(false);
        console.log("Restaurant addition error:", err);
        setErrorMessage("An error occurred while adding the restaurant.");
      });
  };

  const displayErrorMessages = (errors) => {
    const errorMessages = Object.values(errors).flat().join(", ");
    setErrorMessage(errorMessages);
  };

  return (
    <div className="container mx-auto px-2 sm:px-0 my-10">
      <h2 className="text-center text-2xl lg:text-3xl font-bold leading-8 text-gray-900 pt-10">
        <span className="text-gradient">Add</span> a new restaurant
      </h2>

      <form
        className="w-full md:w-5/6 lg:w-4/6 mx-auto px-5 my-10"
        onSubmit={handleRestaurantSubmit}
      >
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-900">
              Restaurant Name
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="input-field"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900">
              Short Description
            </label>
            <textarea
              name="description"
              required
              value={formData.description}
              onChange={handleChange}
              className="input-field"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900">
              Location
            </label>
            <input
              type="text"
              name="location"
              required
              value={formData.location}
              onChange={handleChange}
              className="input-field"
            />
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-x-6">
          <button type="submit" className="btn-submit" disabled={isLoading}>
            {isLoading ? <LoadingSpinner /> : "Add Restaurant"}
          </button>
        </div>
      </form>

      {errorMessage && (
        <p className="text-red-600 text-center font-semibold mt-5">
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default AddRestaurant;
