/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// src/components/BookingForm.js
import { useState } from "react";
import axios from "axios";
import MentorList from "./MentorList";

const BookingForm = ({ onBookingComplete }) => {
  const [areaOfInterest, setAreaOfInterest] = useState(" ");
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [duration, setDuration] = useState(1);

  const handleBooking = () => {
    const bookingTime = new Date().toISOString();
    const student_id = 1; // For testing purposes, assume student_id is 1.

    axios
      .post("https://career-carve.onrender.com/bookings", {
        student_id,
        mentor_id: selectedMentor.id,
        booking_time: bookingTime,
      })
      .then((response) => {
        onBookingComplete(selectedMentor, duration);
      })
      .catch((error) => {
        console.error("There was an error booking the session!", error);
      });
  };

  return (
    <div>
      {!selectedMentor && (
        <MentorList
          areaOfInterest={areaOfInterest}
          setAreaOfInterest={setAreaOfInterest}
          onSelectMentor={setSelectedMentor}
        />
      )}

      {selectedMentor && (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-green-400 to-blue-500 p-8">
          <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md text-center">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Booking Session with {selectedMentor.name}
            </h2>
            <label className="block text-gray-700 text-lg mb-2">
              Duration (minutes):
            </label>
            <select
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="mb-4 p-3 w-full rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="30">30</option>
              <option value="45">45</option>
              <option value="60">60</option>
            </select>
            <button
              onClick={handleBooking}
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Book Session
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingForm;
