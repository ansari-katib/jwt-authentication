import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { apiClient } from '../lib/api-client';
import { PROTECTED } from '../constants/constants';
import { toast } from 'react-toastify';

const Protected = () => {

  const [data, setData] = useState(null);
  const navigate = useNavigate();

  const [cookies, setCookie, removeCookie] = useCookies([]);

  useEffect(() => {
    const verifyUser = async () => {
      if (!cookies.jwt) {
        navigate('/login');
      } else {
        const response = await apiClient.get(PROTECTED,{
          withCredentials: true
        });

        if (!response.data.status) {
          removeCookie("jwt");
          navigate("/login");
        } else {
          setData(response.data.user);
          toast.success('hi there welcome to protected page', { theme: "dark" });
        }

      }
    }
    verifyUser();
  }, [cookies, removeCookie, navigate])

  const logOut = async () => {
    removeCookie("jwt");
    navigate("/login");
  }

  return (
    <div>
      <div
        className=' flex items-center justify-center min-h-screen flex-col'
      >
        <input
          value={data?.email || ''}
          className='bg-gray-300 text-3xl p-5 rounded-xl border-none '
          readOnly
        />
        <h1
          className='text-5xl p-5 m-5'
        >protected page which only accessed by authenticated user </h1>
        <button
          className='bg-blue-600 text-white text-5xl p-10 px-20 rounded-xl border-none'
          onClick={logOut}
        >Logout</button>
      </div>
    </div>
  )
}

export default Protected
