"use client";
import Navbar from "@/components/Navbar";
import React, { useState } from "react";

const Homepage = () => {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [result, setResult] = useState(null);

  const handleCalculation = () => {
    const sum = parseFloat(num1) + parseFloat(num2);
    setResult(sum);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
   <Navbar/>

      {/* Main Content */}
      <div className="flex-grow flex items-center justify-center bg-gray-100">
  <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
    <h2 className="text-2xl font-bold text-center mb-4 text-gray-900">Calculator</h2>
    <div className="space-y-4">
      <input
        type="number"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
        placeholder="Enter first number"
        value={num1}
        onChange={(e) => setNum1(e.target.value)}
      />
      <input
        type="number"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
        placeholder="Enter second number"
        value={num2}
        onChange={(e) => setNum2(e.target.value)}
      />
      <button
        onClick={handleCalculation}
        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
      >
        Calculate
      </button>
      {result !== null && (
        <div className="mt-4 text-center">
          <p className="text-xl text-gray-900">Result: {result}</p>
        </div>
      )}
    </div>
  </div>
</div>


      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4 text-center">
        <p>© 2024 MyApp. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Homepage;
