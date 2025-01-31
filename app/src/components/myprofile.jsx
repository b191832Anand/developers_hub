import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const MyProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profile = await axios.get('http://localhost:5000/api/profile', {
          headers: { 'x-token': localStorage.getItem('token') }
        });
        setUser(profile.data.profile);
      } catch (error) {
        toast.error("Failed to fetch profile");
      }
    };

    const fetchMyReview = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/myreview', {
          headers: { 'x-token': localStorage.getItem('token') }
        });
        setRatings(response.data);
      } catch (error) {
        toast.error("Failed to fetch reviews");
      }
    };

    fetchData();
    fetchMyReview();
  }, []);

  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  const image = "https://www.w3schools.com/w3images/avatar2.png";

  return(
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <button
          onClick={handleBackToDashboard}
          className="bg-blue-500 text-white py-2 px-4 rounded-lg mb-4 hover:bg-blue-600"
        >
          Back to Dashboard
        </button>
        <div className="flex justify-center mb-4">
          <img
            src={image}
            alt="Profile"
            className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-gray-300"
          />
        </div>
        <h2 className="text-2xl font-semibold text-center mb-2">{user?.name}</h2>
        <p className="text-center text-gray-600">{user?.email}</p>

        <div className="mt-6">
          <h3 className="text-xl font-semibold text-center">Ratings Given by Others</h3>
          {ratings.length>0?(
            ratings.map((rating, index) => (
              <div key={index} className="flex justify-between items-center mt-3">
                <p className="font-semibold">{rating.from}</p>
                <div className="flex">
                  {[...Array(5)].map((_, starIndex) => (
                    <FaStar
                      key={starIndex}
                      className={`text-${rating.rating > starIndex ? 'yellow' : 'gray'}-500 text-xl`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-gray-600">{rating.rating} / 5</span>
              </div>
            ))
          ):(<p className="text-center text-gray-600">No ratings yet.</p>)}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
