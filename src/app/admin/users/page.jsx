"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";

import Users from './sections/users';
import Navbar from '@/components/Navbar';
import { getUserType, getAuthSession } from '@/auth/auth'; 

const Page = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = getAuthSession();  
    const userType = getUserType(); 
    if (!token) {
      router.push('/login');  
    } else {
      setIsAuthenticated(true);   
      setUserType(userType);      
    }
  }, [router]);

  useEffect(() => {
    if (userType === "Member") {
      router.push('/');  
    }
  }, [userType, router]);

  if (!isAuthenticated) {
    return null;  
  }

  return (
    <>
      {userType !== "Member" && (  
        <div>
          <Navbar />
          <Users />
        </div>
      )}
    </>
  );
};

export default Page;
