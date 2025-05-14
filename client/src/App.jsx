import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'react-toastify/ReactToastify.css';
import Login from './routes/Login';
import Signup from './routes/Signup';
import Protected from './routes/Protected';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={'/'} element={<Signup />} />
          <Route path={'/login'} element={<Login />} />
          <Route path={'/protected'} element={<Protected />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
