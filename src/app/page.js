'use client';

import { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import { getAuthSession } from "@/auth/auth";
import Homepage from "./Home/sections/home";
import Login from './login/sections/login';

export default function Home() {
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
      {token ? <Homepage /> : <Login />} 
    </>
  );
}
