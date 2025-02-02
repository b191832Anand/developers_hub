  import React, { useState } from 'react';
  import axios from 'axios';
  import { useNavigate } from 'react-router-dom';
  import { toast } from 'react-toastify';
  import { FaEye, FaEyeSlash } from 'react-icons/fa';

  const Signup = () => {
    const [name, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [Skills,setSkills]=useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await axios.post('https://developers-hub-urq9.vercel.app/api/sign', { name, email, password });
        toast.success("Signup successful");
        navigate('/login');
      } catch (error) {
        toast.error(error.response.data);
      }
    };

    return (
      <div className="bg-gray-100 flex justify-center items-center min-h-screen px-4">
        <div className="bg-white p-8 sm:w-96 w-full rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">Signup</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-semibold text-gray-600">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={name}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-2 mt-2 border border-gray-300 rounded-lg"
                placeholder="Enter your name"
                required
              />
            </div>
            <div>
              <label htmlFor="skills" className='block text-sm font-semibold text-gray-600'>Skills</label>
              <input
                type="text"
                id="username"
                name="username"
                value={name}
                onChange={(e) => setSkills(e.target.value)}
                className="w-full p-2 mt-2 border border-gray-300 rounded-lg"
                placeholder="Separate Skills using comma(,)"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-600">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 mt-2 border border-gray-300 rounded-lg"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="relative">
              <label htmlFor="password" className="block text-sm font-semibold text-gray-600">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 mt-2 border border-gray-300 rounded-lg pr-10"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                className="m-2 absolute right-3 top-10 transform -translate-y-1/2 text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white sm:p-3 p-2 mt-4 rounded-lg hover:bg-blue-600 transition duration-200"
              >
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  export default Signup;
