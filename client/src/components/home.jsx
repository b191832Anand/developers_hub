import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center px-4">
      <div className="text-center bg-white p-8 rounded-lg shadow-lg max-w-2xl">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">Welcome to the Develop Hub</h1>
        <p className="text-lg text-gray-600">
          A thriving community for developers to <span className="font-semibold">connect, collaborate, and grow.</span>
        </p>

        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={() => navigate('/signup')}
            className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Join Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
