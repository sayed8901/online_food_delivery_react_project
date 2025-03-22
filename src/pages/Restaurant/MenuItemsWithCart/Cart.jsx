export default function Cart({ cart, menuItems, removeFromCart, placeOrder }) {
  return (
    <div className="mt-6 p-4 border rounded-lg shadow-md bg-white">
      <h2 className="text-xl font-bold">Cart</h2>
      {cart.map((cartItem) => {
        const menuItem = menuItems.find((item) => item.id === cartItem.item_id);
        return (
          <div
            key={cartItem.item_id}
            className="flex justify-between items-center border-b py-2"
          >
            <p className="text-lg">
              {menuItem?.name} (x{cartItem.quantity})
            </p>
            <button
              className="text-red-500 font-bold"
              onClick={() => removeFromCart(cartItem.item_id)}
            >
              Remove
            </button>
          </div>
        );
      })}
      <button
        onClick={placeOrder}
        className="bg-primary text-white px-4 py-2 rounded-md shadow-md hover:bg-primary-dark transition mt-4"
      >
        Place Order
      </button>
    </div>
  );
}
