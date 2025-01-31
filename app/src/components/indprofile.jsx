  import React, { useState, useEffect } from 'react';
  import { FaStar } from 'react-icons/fa';
  import { useNavigate, useParams } from 'react-router-dom';
  import axios from 'axios';
  import { toast } from 'react-toastify';
  const MyProfile = () => {
    const navigate = useNavigate();
    const [ratings, setRatings] = useState([]);
    const { name, email, id } = useParams();
    const [newRating, setNewRating] = useState(0);

    const image = "https://www.w3schools.com/w3images/avatar2.png";

    useEffect(() => {
      const fetchData = async () => {
        try {
          const exist = await axios.get('https://developers-hub-urq9.vercel.app/api/alldata',{
            headers: { 'x-token': localStorage.getItem('token') },
          });
          const val=exist.data.data.filter((exist)=>exist.to_id==id)
          setRatings(val);
        } catch (e) {
          console.log(e);
          alert('Error fetching data.');
        }
      };
      fetchData();
    }, []);

    const handleRatingClick = (rating) => {
      setNewRating(rating);
    };

    const handleSubmitRating = async () => {
      if (newRating < 1 || newRating > 5) {
        toast.warn('Please select a rating between 1 and 5.');
        return;
      }
    
      try {
        await axios.post('https://developers-hub-urq9.vercel.app/api/allreview', {
          to_id: id,
          rating: newRating,
        }, {
          headers: { 'x-token': localStorage.getItem('token') },
        });
        
        toast.success('Rating submitted');
      } catch (e) {
        console.log(e);
        toast.error('Error submitting rating');
      }
    };
    
    const handleBackToDashboard = () => {
      navigate('/dashboard');
    };

    return (
      <div className="min-h-screen m-5 bg-gray-100 flex flex-col justify-center items-center">
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
          <h2 className="text-2xl font-semibold text-center mb-2">{name}</h2>
          <p className="text-center text-gray-600">{email}</p>

          <div className="mt-6 text-center">
            <p className="text-lg font-semibold mb-2">Rate this profile</p>
            <div className="flex justify-center items-center space-x-1">
              {[...Array(5)].map((_, index) => (
                <FaStar
                  key={index}
                  className={`text-gray-500 text-xl cursor-pointer ${index < newRating ? 'text-yellow-500' : ''}`}
                  onClick={() => handleRatingClick(index + 1)}
                />
              ))}
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-lg font-semibold mb-2">Select a Rating</p>
            <div className="flex justify-center space-x-4">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  className={`p-2 rounded-full ${
                    rating <= newRating ? 'bg-yellow-500' : 'bg-gray-200'
                  }`}
                  onClick={() => handleRatingClick(rating)}
                >
                  {rating}
                </button>
              ))}
            </div>
            <div className="mt-4">
              <button
                onClick={handleSubmitRating}
                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
              >
                Submit Rating
              </button>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-xl font-semibold text-center">Ratings Given by Others</h3>
            {ratings.length > 0 ? (
              ratings.map((rating, index) => (
                <div key={index} className="flex justify-between items-center mt-3">
                  <p className="font-semibold">{rating.name}</p>
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
            ) : (
              <p className="text-center text-gray-600">No ratings yet.</p>
            )}
          </div>
        </div>
      </div>
    );
  };

  export default MyProfile;
