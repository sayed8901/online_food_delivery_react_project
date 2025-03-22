import { useState, useEffect } from "react";
import ProcessPayment from "./Payment/ProcessPayment";
// import ProcessPayment from "./ProcessPayment";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paying, setPaying] = useState(null);
  const userId = localStorage.getItem("user_id");
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    if (!userId || !token) {
      console.error("User not authenticated.");
      return;
    }

    fetch(`${import.meta.env.VITE_API_URL}/orders/user/${userId}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setOrders(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
        setLoading(false);
      });
  }, [userId, token]);

  console.log(paying);

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold text-secondary mb-4">My Orders</h2>

      {loading ? (
        <p>Loading...</p>
      ) : orders.length === 0 ? (
        <p className="text-gray-500">No orders found.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="border p-4 rounded-lg shadow-md">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold">Order_ID #{order.id}</h3>
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    order.is_payment_done ? "bg-green-500" : "bg-red-500"
                  } text-white`}
                >
                  {order.is_payment_done ? "Paid" : "Pending Payment"}
                </span>
              </div>
              <p className="text-gray-600">
                <strong>Status:</strong> {order.status}
              </p>
              <p className="text-gray-600">
                <strong>Total Cost:</strong> ${order.total_cost}
              </p>
              <p className="text-gray-600">
                <strong>Ordered On:</strong>{" "}
                {new Date(order.created_at).toLocaleString()}
              </p>

              <h4 className="mt-4 font-semibold">Order Items:</h4>
              <ul className="list-disc list-inside text-gray-700">
                {order.order_items.map((item, index) => (
                  <li key={index}>
                    <strong>{item.name}</strong> - {item.quantity}x (
                    {item.description})
                  </li>
                ))}
              </ul>

              {!order.is_payment_done && (
                <ProcessPayment
                  orderId={order.id}
                  token={token}
                  setPaying={setPaying}
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
