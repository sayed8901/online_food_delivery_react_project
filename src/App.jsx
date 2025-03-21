import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Restaurants from "./pages/Restaurants";
import Orders from "./pages/Orders";
import Navbar from "./components/Navbar/Navbar";
import Login from "./authentications/Login";
import OwnerRegistration from "./authentications/OwnerRegistration";
import UserRegistration from "./authentications/UserRegistration";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/all_restaurants" element={<Restaurants />} />
        <Route path="/orders" element={<Orders />} />

        <Route path="/owner_register" element={<OwnerRegistration />} />
        <Route path="/user_register" element={<UserRegistration />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
