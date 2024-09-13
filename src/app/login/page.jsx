'use client';
import React, { useEffect } from 'react';
import { useRouter } from "next/navigation";

import { getAuthSession } from "@/auth/auth";
import Login from "./sections/login";
import Homepage from '../Home/sections/home';

const Pages = () => {
  const router = useRouter();

  useEffect(() => {
    const token = getAuthSession();
    if (token) {
      router.replace('/'); 
    }
  }, [router]);

  const token = getAuthSession();

  return (
    <div>
      {!token ? <Login /> : <Homepage/>} 
    </div>
  );
};

export default Pages;
