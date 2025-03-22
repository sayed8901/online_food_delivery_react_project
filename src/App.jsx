import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./authentications/Login";

import OwnerRegistration from "./authentications/OwnerRegistration";
import UserRegistration from "./authentications/UserRegistration";
import Restaurants from "./pages/Restaurant/Restaurants";
import AddRestaurant from "./pages/Restaurant/AddRestaurant";
import AddMenuItem from "./pages/Restaurant/AddMenuItem";

import AllMenuItemsOnly from "./pages/Restaurant/AllMenuListOnly/AllMenuListOnly";
import MenuListWithCart from "./pages/Restaurant/MenuItemsWithCart/MenuList";

import Orders from "./pages/Orders";
import Contact from "./components/Contact";
import PaymentSuccessInfo from "./pages/Payment/PaymentSuccessInfo";

function App() {
  return (
    <Router>
      <div className="mx-auto flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow mt-14">
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/owner_register" element={<OwnerRegistration />} />
            <Route path="/user_register" element={<UserRegistration />} />
            <Route path="/login" element={<Login />} />

            <Route path="/all_restaurants" element={<Restaurants />} />
            <Route path="/add_restaurant" element={<AddRestaurant />} />

            <Route path="/add_menu_item" element={<AddMenuItem />} />
            <Route path="/all_menu_items" element={<AllMenuItemsOnly />} />
            <Route path="/my_menu_items" element={<MenuListWithCart />} />
            <Route
              path="/menu_items/:restaurantId"
              element={<MenuListWithCart />}
            />

            <Route path="/my_orders" element={<Orders />} />
            <Route path="/payment/success/:orderId" element={<PaymentSuccessInfo />} />

            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
