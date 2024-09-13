'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast, Toaster } from 'react-hot-toast';
import axios from '../../../axios/axios'

const Login = () => {
  const router = useRouter();


  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [register, setRegister] = useState(false);

  const handleSignUp = async() => {
   await axios.post("/signup", formData);
   router.push('/login');
    toast.success('Account created successfully');
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post("/login", formData);
      console.log(response);

      if (response.status === 200) { 
          const accessToken = response.data.accessToken;
         localStorage.setItem('accessToken', accessToken);
         localStorage.setItem('userType', response.data.user);
         router.push('/');
      } 
      if (response.data === "Email or Password Incorrect") { 
       
        toast.error("Email or password Incorrect");
    } 
    } catch (error) {
      console.error("Error:", error);
      toast.error("Email or password Incorrect");
    }
  };

  return (
    <div>
      <div className="md:h-screen w-full">
        <div className="flex flex-col md:flex-row justify-center items-center h-full mx-auto p-4 layout">
          <div className="h-full border border-[#DBDBDB] rounded-xl w-full flex flex-col md:flex-row justify-between items-center">
            <div className="w-full md:w-1/2 h-full">
              <img
                src="/login1.jpg"
                className="h-full w-full object-cover rounded-t-xl md:rounded-t-none md:rounded-l-xl"
                alt="Login"
              />
            </div>
            <div className="w-full md:w-1/2 h-full flex flex-col justify-center items-center p-4">
              <div className="w-full flex flex-col justify-center max-sm:gap-5 items-center h-full md:px-10">
                <div className="text-4xl uppercase w-full text-start">
                  <p className="text-xl volkhov-bold md:text-4xl">My APP</p>
                </div>
                <div className="w-full text-xl">
                  <p className="text-center poppins-medium md:text-left text-base md:text-xl">
                    {register ? 'Create Account' : 'Sign In'}
                  </p>
                </div>

                {register ? (
                  <>
                    <div className="w-full flex flex-col justify-center items-center gap-y-6">
                      <div className="w-full mt-5 gap-y-6 grid gap-3 grid-cols-1 md:grid-cols-2">
                        <input
                          className="appearance-none border-b border-gray-300 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 text-base md:text-lg"
                          placeholder="Name"
                          type="text"
                          name="name"
                          onChange={handleChange}
                          value={formData.name}
                        />
                        <input
                          className="appearance-none border-b border-gray-300 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 text-base md:text-lg"
                          placeholder="Email Address"
                          type="email"
                          name="email"
                          onChange={handleChange}
                          value={formData.email}
                        />
                        <input
                          className="appearance-none border-b border-gray-300 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 text-base md:text-lg"
                          placeholder="Password"
                          type="password"
                          name="password"
                          onChange={handleChange}
                          value={formData.password}
                        />
                      </div>
                    </div>
                    <div className="w-1/2 mt-4 text-sm md:text-base space-y-6">
                      <button
                        onClick={handleSignUp}
                        className="w-full poppins-medium bg-black py-2 rounded-lg text-white"
                      >
                        Create Account
                      </button>
                    </div>

                    <div className="w-full poppins-medium text-center mt-4 text-xs">
                      <p>
                        Already have an account?{' '}
                        <span
                          className="text-blue-600 poppins-medium hover:cursor-pointer"
                          onClick={() => setRegister(false)}
                        >
                          Login
                        </span>
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-full space-y-6">
                      <input
                        className="appearance-none border-b border-gray-300 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 text-base md:text-lg"
                        type="email"
                        placeholder="Email ID"
                        name="email"
                        onChange={handleChange}
                        value={formData.email}
                      />
                      <input
                        className="appearance-none border-b border-gray-300 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 text-base md:text-lg"
                        placeholder="Password"
                        type="password"
                        name="password"
                        onChange={handleChange}
                        value={formData.password}
                      />
                    </div>
                    <div className="w-full mt-6">
                      <button
                        onClick={handleLogin}
                        className="w-full bg-black text-white py-2 rounded-lg text-lg font-semibold hover:bg-gray-800 transition-colors duration-300"
                      >
                        Sign In
                      </button>
                    </div>
                    <div className="w-full text-center text-xs mt-4">
                      <p>
                        Don't have an account?{' '}
                        <span
                          className="text-blue-600 hover:cursor-pointer"
                          onClick={() => setRegister(true)}
                        >
                          Create one
                        </span>
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        <Toaster position="bottom-center" />
      </div>
    </div>
  );
};

export default Login;
