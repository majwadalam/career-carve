/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
// src/components/MentorList.js
import { useState, useEffect } from "react";
import axios from "axios";

const MentorList = ({ areaOfInterest, setAreaOfInterest, onSelectMentor }) => {
  const [mentors, setMentors] = useState([]);
  const [filteredMentors, setFilteredMentors] = useState([]);

  useEffect(() => {
    axios
      .get("https://career-carve.onrender.com/mentors")
      .then((response) => {
        setMentors(response.data.mentors);
        setFilteredMentors(response.data.mentors);
      })
      .catch((error) => {
        console.error("There was an error fetching the mentors!", error);
      });
  }, []);

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setAreaOfInterest(value);

    if (value) {
      const filtered = mentors.filter((mentor) =>
        mentor.areas_of_expertise.toLowerCase().includes(value.toLowerCase()) || mentor.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredMentors(filtered);
    } else {
      setFilteredMentors(mentors);
    }
  };

  return (
    <div className="h-screen flex flex-col items-center bg-gradient-to-r from-blue-500 to-purple-600 p-8">
      <h1 className="text-4xl font-bold text-white mb-6">Find Your Mentor</h1>

      <input
        type="text"
        value={areaOfInterest}
        onChange={handleSearchChange}
        placeholder="Search by area of expertise..."
        className="mb-8 p-4 w-full max-w-lg rounded-lg shadow-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full max-w-7xl">
        {filteredMentors.length > 0 ? (
          filteredMentors.map((mentor) => (
            <div
              onClick={() => onSelectMentor(mentor)}
              key={mentor.id}
              className="bg-white shadow-lg rounded-xl p-6 transform transition-transform duration-300 hover:scale-105 cursor-pointer hover:shadow-2xl"
            >
              <h4 className="text-2xl font-semibold mb-4 text-gray-800">
                {mentor.name}
              </h4>
              <p className="text-gray-600 mb-4">{mentor.areas_of_expertise}</p>
              <p
                className={
                  mentor.is_premium
                    ? "text-yellow-500 font-bold"
                    : "text-gray-500"
                }
              >
                {mentor.is_premium ? "Premium Mentor" : "Standard Mentor"}
              </p>
            </div>
          ))
        ) : (
          <p className="text-white text-xl">
            No mentors found for "{areaOfInterest}"
          </p>
        )}
      </div>
    </div>
  );
};

export default MentorList;
