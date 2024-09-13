"use client";

import React, { useEffect, useState } from 'react';
import axios from '../../../../axios/axios';

const Users = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);


  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await axios.get('/admin/users');
        if (Array.isArray(response.data.users)) {
          setUsers(response.data.users);
        } else {
          console.error("Unexpected data format:", response.data);
          setUsers([]);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
        setUsers([]);
      }
      setLoading(false);
    };

    fetchUsers();
  }, []);


  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

 
  const handleRoleChange = async (id, newRole) => {
    try {
      const data = { id, newRole };
      const response = await axios.put('/admin/users', data);

      if (response.status === 200) {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === id ? { ...user, userType: newRole } : user
          )
        );
      } else {
        console.error("Error updating role:", response);
      }
    } catch (error) {
      console.error("Error updating role:", error);
    }
  };

  const filteredUsers = Array.isArray(users)
    ? users.filter(
        (user) =>
          user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];
console.log(filteredUsers);

  return (
    <div className="h-screen bg-gray-50 w-full flex justify-center items-center">
      <div className="bg-white w-full max-w-4xl shadow-lg rounded-xl p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-black">Edit Users</h1>
          <input
            type="text"
            placeholder="Search by name or email"
            className="px-3 py-2 border rounded text-black"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-black">Sl. No</th>
              <th className="py-2 px-4 border-b text-black">Name</th>
              <th className="py-2 px-4 border-b text-black">Email</th>
              <th className="py-2 px-4 border-b text-black">Role</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4" className="py-2 px-4 border-b text-center text-black">
                  Loading...
                </td>
              </tr>
            ) : filteredUsers.length > 0 ? (
              filteredUsers.map((user, index) => (
                <tr className="text-center" key={user._id}>
                  <td className="py-2 px-4 border-b text-black">{index + 1}</td>
                  <td className="py-2 px-4 border-b text-black">{user.name}</td>
                  <td className="py-2 px-4 border-b text-black">{user.email}</td>
                  <td className="py-2 px-4 border-b text-black">
                    {user.userType === 'superAdmin' ? (
                      <span className="text-black">Super Admin</span>
                    ) : (
                      <select
                        className="px-2 py-1 border rounded text-black"
                        value={user.userType}
                        onChange={(e) =>
                          handleRoleChange(user._id, e.target.value)
                        }
                      >
                        <option value="Member">Member</option>
                        <option value="Admin">Admin</option>
                      </select>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="py-2 px-4 border-b text-center text-black">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
