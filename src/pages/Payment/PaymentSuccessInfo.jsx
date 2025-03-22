import { useNavigate } from "react-router-dom";

const PaymentSuccessInfo = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/my_orders");
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-bold text-green-600 text-center mb-4">
        Payment Successful
      </h2>
      <p className="text-center text-lg mb-4">Thanks for choosing us!</p>
      <hr className="my-6" />
      <div className="text-center">
        <button
          onClick={handleGoBack}
          className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
        >
          Go Back to My Orders
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccessInfo;
