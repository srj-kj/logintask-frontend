"use client"
import React, { useEffect, useState } from 'react'
import ProfilePage from './sections/profile'
import { useRouter } from "next/navigation";
import { getAuthSession } from '@/auth/auth';


const page = () => {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    setIsClient(true); 
    const sessionToken = getAuthSession();
    setToken(sessionToken);
    
    if (!sessionToken) {
      router.replace('/login'); 
    }
  }, [router]);



  if (!isClient) {
    return null; 
  }

  return (
    <>
      {token ? <ProfilePage /> : ""} 
    </>
  );
}


export default page