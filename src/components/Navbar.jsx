import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getUserType, removeAuthSession } from '@/auth/auth'; // Adjust the path as needed

const Navbar = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Retrieve the user type only on the client side
    setUser(getUserType());
  }, []);

  const handleLogout = () => {
    removeAuthSession();
    router.replace('/login'); // Redirect to login after logout
  };

  // Return a loading state or fallback content until `user` is set
  if (user === null) {
    return (
      <nav className="bg-gray-800 text-white py-4 px-6">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold">MyApp</div>
          <ul className="flex space-x-6">
            <li>
              <a href="/profile" className="hover:text-gray-400">
                Profile
              </a>
            </li>
            {/* Optionally render a loading indicator or placeholder */}
            <li>
              <button
                onClick={handleLogout}
                className="hover:text-gray-400 focus:outline-none">
                Logout
              </button>
            </li>
          </ul>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-gray-800 text-white py-4 px-6">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold">MyApp</div>
        <ul className="flex space-x-6">
          <li>
            <a href="/profile" className="hover:text-gray-400">
              Profile
            </a>
          </li>
          {user !== 'Member' && (
            <li>
              <a href="/admin/users" className="hover:text-gray-400">
                Settings
              </a>
            </li>
          )}
          <li>
            <button
              onClick={handleLogout}
              className="hover:text-gray-400 focus:outline-none">
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
