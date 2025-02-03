import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);

  const fetchData = async () => {
    try {
      const userResponse = await axios.get('https://developers-hub-urq9.vercel.app/api/profile', {
        headers: { 'x-token': localStorage.getItem('token') }
      });
      setUser(userResponse.data.profile);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchAllData = async () => {
    try {
      const a = await axios.get('https://developers-hub-urq9.vercel.app/api/allprofile', {
        headers: { 'x-token': localStorage.getItem('token') }
      });
      setUsers(a.data.profile);
    } catch (e) {
      console.log("error", e);
    }
  };

  useEffect(() => {
    fetchData();
    fetchAllData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    toast.success("Logged out successfully!");
    navigate('/login');
  };

  const defaultImage = "https://www.w3schools.com/w3images/avatar2.png";
  const solve=(email)=>{
    return email.length>=15?email.substring(0,15)+"...":email;
  }
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-8"> 
        <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-2xl font-bold text-center mb-4">Profile</h2>
          {user && (
            <div className="flex flex-col items-center space-y-4">
              <div className="flex items-center space-x-4">
                <img
                  src={user.profileImage || defaultImage}
                  alt="Profile"
                  className="w-10 h-10 sm:w-24 sm:h-24 rounded-full border-2 border-gray-300"
                />
                <div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold">{user.name}</h3>
                  <p className="text-sm sm:text-base md:text-lg text-gray-600">{solve(user.email)}</p>
                </div>
              </div>
              <div>
                <h4 className="text-lg font-semibold">Skills:</h4>
                <ul className="flex flex-wrap gap-1">
                  {user.skills?.split(',').map((val, index) => (
                    <li key={index} className="w-auto bg-blue-100 px-2 py-1 rounded-lg text-blue-700">
                      {val.trim()}
                    </li>
                  ))}
                </ul>
              </div>
              <Link to='/myprofile'>
                <button className="mt-2 p-1 sm:p-2 bg-blue-500 rounded-lg text-white">
                  My Profile
                </button>
              </Link>
            </div>
          )}
          <div className="mt-4 text-center">
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-3 py-1 sm:px-5 sm:py-2 rounded-lg hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-center mb-4">Remaining Users</h2>
          <div>
            {users.map((user, index) => (
              <div key={user._id} className="bg-gray-200 p-4 rounded-lg mb-6">
                <div className="flex justify-between items-center space-x-6 mr-4">
                  <div>
                    <div className="flex items-center space-x-4">
                      <img
                        src={defaultImage}
                        alt="User"
                        className="w-10 h-10 sm:w-24 sm:h-24 rounded-full"
                      />
                      <div>
                        <p className="font-semibold text-sm sm:text-base md:text-lg">{solve(user.name)}</p>
                        <p className="text-sm sm:text-base md:text-lg text-gray-600">{solve(user.email)}</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-2">
                          <h4 className="text-lg font-semibold">Skills:</h4>
                          <ul className="flex flex-col gap-0">
                            {user.skills?.split(',').map((val, idx) => (
                              <li key={idx} className="w-auto px-2 py-1 rounded-lg bg-blue-100 text-blue-700">
                                {val.trim()}
                              </li>
                            ))}
                          </ul>
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
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
