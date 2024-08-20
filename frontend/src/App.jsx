// src/App.js
import { useState } from "react";
import BookingForm from "./components/BookingForm";
import PaymentPage from "./components/PaymentPage";

function App() {
  const [bookingComplete, setBookingComplete] = useState(false);
  const [mentor, setMentor] = useState(null);
  const [duration, setDuration] = useState(1);

  const handleBookingComplete = (selectedMentor, sessionDuration) => {
    setMentor(selectedMentor);
    setDuration(sessionDuration);
    setBookingComplete(true);
  };

  const handlePaymentComplete = () => {
    alert("Payment successful!");
    // Reset to booking form
    setBookingComplete(false);
    setMentor(null);
    setDuration(1);
  };

  return (
    <div>
      <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-blue-500 to-purple-600 p-4 text-white border-b">
        Mentor Booking App
      </h1>
      {!bookingComplete ? (
        <BookingForm onBookingComplete={handleBookingComplete} />
      ) : (
        <PaymentPage
          mentor={mentor}
          duration={duration}
          onPaymentComplete={handlePaymentComplete}
        />
      )}
    </div>
  );
}

export default App;
