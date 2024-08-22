/* eslint-disable react/prop-types */
// src/components/PaymentPage.js

const PaymentPage = ({ mentor, duration, onPaymentComplete }) => {
  // Determine the cost based on the selected duration
  const calculateTotalCost = (duration) => {
    switch (duration) {
      case "30":
        return 2000;
      case "45":
        return 3000;
      case "60":
        return 4000;
      default:
        return 0; // This is a fallback, ideally duration should always be 30, 45, or 60
    }
  };

  const totalCost = calculateTotalCost(duration);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-yellow-400 to-orange-500 p-8">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Payment Details</h2>
        <p className="text-xl text-gray-700 mb-4">
          Mentor: <span className="font-semibold">{mentor.name}</span> (
          {mentor.is_premium ? (
            <span className="text-yellow-500 font-bold">Premium</span>
          ) : (
            <span className="text-gray-500">Standard</span>
          )}
          )
        </p>
        <p className="text-xl text-gray-700 mb-4">
          Duration: <span className="font-semibold">{duration}</span> minutes
        </p>
        <p className="text-2xl font-bold text-gray-800 mb-8">
          Total Cost: <span className="text-green-600">${mentor.is_premium ? totalCost * 1.5 : totalCost}</span>
        </p>
        <button
          onClick={onPaymentComplete}
          className="bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300"
        >
          Confirm Payment
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;