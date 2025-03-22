import { useState } from "react";

export default function ProcessPayment({ orderId, token, setPaying }) {
  const [paying, setLocalPaying] = useState(false);

  const handlePayment = async () => {
    setPaying(orderId);
    setLocalPaying(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/payments/initiate/${orderId}/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Payment initiation failed");
      }

      const data = await response.json();
      window.location.href = data.gateway_url; // Redirect user to the payment gateway
    } catch (error) {
      console.error("Error initiating payment:", error);
    } finally {
      setLocalPaying(false);
    }
  };

  return (
    <div className="text-center">
      <button
        onClick={handlePayment}
        className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition duration-300"
        disabled={paying || paying}
      >
        {paying ? "Processing..." : "Pay Now"}
      </button>
    </div>
  );
}
