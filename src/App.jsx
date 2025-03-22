import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./authentications/Login";

import OwnerRegistration from "./authentications/OwnerRegistration";
import UserRegistration from "./authentications/UserRegistration";
import Restaurants from "./pages/Restaurant/Restaurants";
import AddRestaurant from "./pages/Restaurant/AddRestaurant";
import AllMenuItems from "./pages/Restaurant/AllMenuItems";
import RestaurantMenuItems from "./pages/Restaurant/RestaurantMenuItems";
import AddMenuItem from "./pages/Restaurant/AddMenuItem";
import Orders from "./pages/Orders";

function App() {
  return (
    <Router>
      <div className="mx-auto flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow mt-14">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/all_restaurants" element={<Restaurants />} />
            <Route path="/add_restaurant" element={<AddRestaurant />} />
            <Route path="/all_menu_items" element={<AllMenuItems />} />
            <Route path="/menu_items/:restaurantId" element={<AllMenuItems />}
            />
            {/* <Route
              path="/menu_items/:restaurantId"
              element={<RestaurantMenuItems />}
            /> */}
            <Route path="/add_menu_item" element={<AddMenuItem />} />
            <Route path="/orders" element={<Orders />} />

            <Route path="/owner_register" element={<OwnerRegistration />} />
            <Route path="/user_register" element={<UserRegistration />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
