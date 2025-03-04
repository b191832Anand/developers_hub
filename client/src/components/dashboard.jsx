import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          toast.error("Unauthorized! Please log in.");
          navigate('/login');
          return;
        }

        const userResponse = await axios.get('https://developers-hub-urq9.vercel.app/api/profile', {
          headers: { 'x-token': token },
        });

        console.log("User Profile:", userResponse.data);
        setUser(userResponse.data.profile);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    const fetchAllData = async () => {
      try {
        const response = await axios.get('https://developers-hub-urq9.vercel.app/api/allprofile', {
          headers: { 'x-token': localStorage.getItem('token') },
        });

        console.log("All Profiles:", response.data);
        setUsers(response.data.profile || []);
      } catch (error) {
        console.error("Error fetching all users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    fetchAllData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    toast.success("Logged out successfully!");
    navigate('/login');
  };

  const defaultImage = "https://www.w3schools.com/w3images/avatar2.png";

  const truncateEmail = (email = '') => {
    return email.length >= 15 ? email.substring(0, 15) + "..." : email;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl font-semibold">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-8"> 
        {/* User Profile */}
        {user && (
          <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
            <h2 className="text-2xl font-bold text-center mb-4">Profile</h2>
            <div className="flex flex-col items-center space-y-4">
              <div className="flex items-center space-x-4">
                <img
                  src={user.profileImage || defaultImage}
                  alt="Profile"
                  className="w-10 h-10 sm:w-24 sm:h-24 rounded-full border-2 border-gray-300"
                />
                <div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold">{user.name}</h3>
                  <p className="text-sm sm:text-base md:text-lg text-gray-600">{truncateEmail(user.email)}</p>
                </div>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-center">Skills:</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mt-2">
                  {(user.skills || "").split(',').map((skill, index) => (
                    <div 
                      key={index} 
                      className="bg-blue-100 px-2 py-1 rounded-lg text-blue-700 text-sm text-center"
                    >
                      {skill.trim()}
                    </div>
                  ))}
                </div>
              </div>
              <Link to='/myprofile'>
                <button className="mt-2 p-1 sm:p-2 bg-blue-500 rounded-lg text-white">
                  My Profile
                </button>
              </Link>
            </div>
            <div className="mt-4 text-center">
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-3 py-1 sm:px-5 sm:py-2 rounded-lg hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          </div>
        )}

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-center mb-4">Remaining Users</h2>
          {users.length === 0 ? (
            <p className="text-center text-gray-500">No users found.</p>
          ) : (
            <div>
              {users.map((user) => (
                <div key={user._id} className="bg-gray-200 p-4 rounded-lg mb-6">
                  <div className="flex justify-between items-center space-x-6">
                    <div className="flex items-center space-x-4">
                      <img
                        src={defaultImage}
                        alt="User"
                        className="w-10 h-10 sm:w-24 sm:h-24 rounded-full"
                      />
                      <div>
                        <p className="font-semibold text-sm sm:text-base md:text-lg">{truncateEmail(user.name)}</p>
                        <p className="text-sm sm:text-base md:text-lg text-gray-600">{truncateEmail(user.email)}</p>
                      </div>
                    </div>
                    <div className="text-center">
                      <h4 className="text-lg font-semibold">Skills:</h4>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                        {(user.skills || "").split(',').map((skill, idx) => (
                          <div key={idx} className="px-2 py-1 rounded-lg bg-blue-100 text-blue-700 text-sm text-center">
                            {skill.trim()}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className='flex justify-center items-center mt-4'>
                    <Link to={`/indprofile/${user._id}`}>
                      <button type="button" className="p-1 sm:p-2 bg-blue-500 rounded-lg text-white">
                        View Profile
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
