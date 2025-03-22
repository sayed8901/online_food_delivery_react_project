import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingSpinner from "../../utilities/LoadingSpinner";
import useTitle from "../../utilities/useTitle";

const AddMenuItem = () => {
  useTitle("Add Menu Item");

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("authToken");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleMenuItemSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    fetch(`${import.meta.env.VITE_API_URL}/restaurants/menu/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
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
          toast.success("Menu item added successfully.");
          navigate("/all_menu_items");
        }
      })
      .catch((err) => {
        setIsLoading(false);
        console.log("Menu item addition error:", err);
        setErrorMessage("An error occurred while adding the menu item.");
      });
  };

  const displayErrorMessages = (errors) => {
    const errorMessages = Object.values(errors).flat().join(", ");
    setErrorMessage(errorMessages);
  };

  return (
    <div className="container mx-auto px-2 sm:px-0 my-10">
      <h2 className="text-center text-2xl lg:text-3xl font-bold leading-8 text-gray-900 pt-10">
        <span className="text-gradient">Add</span> a new menu item
      </h2>

      <form
        className="w-full md:w-5/6 lg:w-4/6 mx-auto px-5 my-10"
        onSubmit={handleMenuItemSubmit}
      >
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-900">
              Item Name
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
              Description
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
              Price
            </label>
            <input
              type="number"
              name="price"
              required
              value={formData.price}
              onChange={handleChange}
              className="input-field"
              min="0"
              step="0.01"
            />
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-x-6">
          <button type="submit" className="btn-submit" disabled={isLoading}>
            {isLoading ? <LoadingSpinner /> : "Add Menu Item"}
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

export default AddMenuItem;
