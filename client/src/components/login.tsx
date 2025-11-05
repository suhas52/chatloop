import React, { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log('Username:', username);
    console.log('Password:', password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <div className="bg-white bg-opacity-90 backdrop-blur-md shadow-2xl rounded-xl p-10 w-full max-w-md animate-fade-in">
        <div className="flex flex-col items-center mb-6">
          <FaUserCircle className="text-5xl text-indigo-600 mb-2" />
          <h2 className="text-2xl font-bold text-gray-800">Sign In</h2>
          <p className="text-sm text-gray-500">Welcome back! Please enter your credentials.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-200"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
