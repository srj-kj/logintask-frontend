"use client"
import Navbar from '@/components/Navbar';
import React, { useEffect, useState } from 'react';
import axios from '../../../axios/axios';

const ProfilePage = () => {
  const [user,setUser] =useState('')
 
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("/profile");
        console.log("API Response:", response.data.data); 
        if (response.data.data) {
          setUser(response.data.data); 
          
          
        } else {
          console.error("Unexpected data format:", response.data);
          setUser({}); 
        }
      } catch (error) {
        console.error("Error fetching users:", error);
        setUser({}); 
      }
    };

    fetchUser();
  }, []); 

  useEffect(()=>{
    console.log(user);
  },[user])
  return (
    <>
      <Navbar />
      <div className="flex flex-col min-h-screen">
        {/* Profile Content */}
        <div className="flex-grow flex items-center justify-center bg-gray-100">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <div className="text-center mb-6">
              {/* Profile Image Placeholder */}
              <div className="w-24 h-24 mx-auto rounded-full bg-gray-300">
                <img src="/propic.png" className='rounded-full' />
              </div>

              {/* Name */}
              <h2 className="text-2xl font-semibold text-gray-900 mt-4">{user.name}</h2>

              {/* Email */}
              <p className="text-gray-600">{user.email}</p>
            </div>

            {/* Admin Settings Link */}
            {user.userType === 'Admin' && (
              <div className="text-center mt-6">
                <a
                  href="/admin/settings"
                  className="text-blue-500 hover:underline"
                >
                  Open Admin Settings
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-gray-800 text-white py-4 text-center">
          <p>© 2024 MyApp. All rights reserved.</p>
        </footer>
      </div>
    </>
  );
};

export default ProfilePage;
