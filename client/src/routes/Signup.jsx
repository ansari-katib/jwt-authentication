import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { apiClient } from '../lib/api-client';
import { SIGNIN_ROUTE } from '../constants/constants';
import { useCookies } from 'react-cookie';
import { useEffect } from 'react';

const Signup = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [cookies] = useCookies(["cookie-name"]);
  const navigate = useNavigate();

  useEffect(() => {
    if (cookies.jwt) {
      navigate('/protected');
    }
  }, [cookies, navigate]);

  const checkFormData = () => {
    if (!formData.email || !formData.password) {
      toast.error('All fields are required.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!checkFormData()) return;
    setLoading(true);
    try {
      const response = await apiClient.post(
        SIGNIN_ROUTE,
        { ...formData },
        { withCredentials: true }
      );

      if (response.status === 200) {
        toast.success('Signup successful!');
        setFormData({ email: '', password: '' });
        navigate('/protected');
      } else {
        toast.error('Signup failed.');
        navigate('/');
      }
    } catch (error) {
      toast.error('Signup error: ' + (error.response?.data?.error || error.message));
      console.error("Error while signing up:", error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 flex-col">
      <h1
        className="text-4xl mb-20 bg-gradient-to-r from-pink-500 via-black to-yellow-400 text-white p-6 rounded-xl"
      >Authentication using JSON_WEB_TOKE in short JWT</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-center mb-6">Create an Account</h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={loading}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={loading}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
        >
          {loading ? "Signing up..." : "Signup"}
        </button>

        <p className="text-center mt-4 text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Signup;
