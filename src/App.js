import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BookList from './components/BookLists';
import Login from './components/Login';

function App() {
  
  const auth = () => localStorage.getItem("isAuth") ?? localStorage.getItem("isAuth");

  console.log(auth())


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/" element={!auth? <Login /> : <BookList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;