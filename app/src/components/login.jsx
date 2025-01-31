import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import {toast} from 'react-toastify'
const Login = () => {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [showPassword, setShowPassword] = useState(false);
   const navigate = useNavigate();

   const submit = async (e) => {
      e.preventDefault();
      try {
         const response = await axios.post('http://localhost:5000/api/login', { email, password });
         localStorage.setItem('token', response.data.token);
         toast.success("Login successful");
         navigate('/dashboard');
      } catch (error) {
         console.log("Login failed, check credentials", error);
         toast.error("Login failed");
      }
   };

   return (
     <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
          <div className="p-8 w-full sm:w-96 bg-white shadow-lg rounded-lg">
               <p className='text-2xl text-center mb-4 font-semibold'>Login</p>
               <form className="flex flex-col space-y-4" onSubmit={submit}>
                   <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
                   <input 
                       type="email" 
                       id="email" 
                       className='p-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500' 
                       value={email} 
                       onChange={(e) => setEmail(e.target.value)} 
                       placeholder='Enter your email'
                       required
                   />

                   <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
                   <div className="relative w-full">
                      <input 
                          type={showPassword ? "text" : "password"} 
                          id="password" 
                          className='p-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10' 
                          value={password} 
                          onChange={(e) => setPassword(e.target.value)} 
                          placeholder='Enter your password'
                          required
                      />
                      <button 
                          type="button" 
                          onClick={() => setShowPassword(!showPassword)} 
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      >
                          {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                   </div>

                   <button type="submit" className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200">
                        Login
                   </button>
               </form>
          </div>
     </div>
  );
};

export default Login;
