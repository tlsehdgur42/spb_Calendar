import { Route, BrowserRouter, Routes } from 'react-router-dom';
import React from 'react';
import Calendar from './pages/plan/Calendar';
import Join from './pages/account/Join';
import Login from './pages/account/Login';
import { AuthProvider } from './context/AuthProvider';

const App = () => {
  return (
    <AuthProvider >
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />}/>
          <Route path='/join' element={<Join />}/>
          <Route path='/calendar' element={<Calendar />}/>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;