import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BookList from './components/BookLists';
import Login from './components/Login';
import bookStoreBg from './assests/images/backgroundImage.jpg'

function App() {
  
  const auth = () => localStorage.getItem("isAuth") ?? localStorage.getItem("isAuth");
  console.log(auth())


  return (
    <BrowserRouter>
      <div style={{ backgroundImage: `url(${bookStoreBg})` }}  className="bg-cover bg-no-repeat bg-center min-h-screen">
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/" element={!auth? <Login /> : <BookList />} />
      </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;