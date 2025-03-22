import AllMenuItemsOnly from "./Restaurant/AllMenuListOnly/AllMenuListOnly";
import Restaurants from "./Restaurant/Restaurants";

export default function Home() {
  return (
    <div className="p-6 text-center">
      <h1 className="text-4xl font-bold text-primary">
        Welcome to Online Food Delivery
      </h1>
        <Restaurants></Restaurants>
        <AllMenuItemsOnly></AllMenuItemsOnly>
    </div>
  );
}
