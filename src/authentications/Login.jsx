import { useContext, useState } from "react";
import { toast } from "react-toastify";
import LoadingSpinner from "../utilities/LoadingSpinner";
import useTitle from "../utilities/useTitle";
import { UserContext } from "../contexts/UserContext";

const Login = () => {
  useTitle("Login");

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { updateUser } = useContext(UserContext); // Get user state from context

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Clear previous error message
    setSuccessMessage(""); // Clear previous success message
    setIsLoading(true); // Show loading spinner

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/login/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();

      if (data.error) {
        // Display error message
        setErrorMessage(data.error || "Invalid login credentials");
      } else {
        // Store the user details in localStorage
        localStorage.setItem("authToken", data.access);
        localStorage.setItem("refreshToken", data.refresh);
        localStorage.setItem("user_id", data.user_id);
        localStorage.setItem("role", data.role);
        localStorage.setItem("username", data.username);

        // Update the user context
        updateUser({
          username: data.username,
          userType: data.role,
        });

        // Show success toast
        toast.success("Login Successful.");
        console.log(successMessage);

        // Conditionally redirecting with page refresh
        window.location.href = "/";
      }
    } catch (error) {
      // Display error message
      setErrorMessage("An error occurred. Please try again.");
      console.error("Login error", error);
    } finally {
      setIsLoading(false); // Hide loading spinner
    }
  };

  return (
    <div className="container mx-auto">
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            <span className="text-gradient">Sign in</span> to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Username
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  autoComplete="username"
                  className="block w-full rounded-md border-0 py-2 px-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-white"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md border-0 py-2 px-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-white"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500"
                disabled={isLoading}
              >
                {isLoading ? <LoadingSpinner></LoadingSpinner> : "Log in"}
              </button>
            </div>
          </form>

          {/* Display error messages */}
          {errorMessage && (
            <div className="mt-6 text-center text-base text-red-600">
              {errorMessage}
            </div>
          )}

          <div className="flex justify-between items-center gap-3 my-10">
            <p className="text-center text-sm text-gray-500">
              Do not have an account yet? No Tension.
            </p>
            <a
              href="/register"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 text-sm"
            >
              Create Account.
            </a>
          </div>

          {/* Display credentials info */}
          <div className="mt-10 p-6 border rounded-lg shadow-md bg-gray-100">
            <h3 className="font-semibold text-xl text-center text-indigo-600 mb-4">
              Demo Credentials for Testing:
            </h3>

            <div className="mb-4 p-4 border rounded-lg shadow-md bg-white">
              <div className="mt-2 text-center text-sm text-gray-700">
                <p className="mb-1">
                  Owner Username: <strong>Sayed</strong>
                </p>
                <p className="mb-1">
                  Owner Password: <strong>sayed8901</strong>
                </p>
              </div>
            </div>

            <div className="p-4 border rounded-lg shadow-md bg-white">
              <div className="mt-2 text-center text-sm text-gray-700">
                <p className="mb-1">
                  User Username: <strong>Tasmi</strong>
                </p>
                <p className="mb-1">
                  User Password: <strong>sayed8901</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
