import { Route, BrowserRouter, Routes } from 'react-router-dom';
import React from 'react';
import Calendar from './pages/plan/Calendar';
import Join from './pages/account/Join';
import Login from './pages/account/Login';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/join' element={<Join />}/>
        <Route path='/calendar' element={<Calendar />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;