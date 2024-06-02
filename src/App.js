import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BookList from './components/BookLists';
import Login from './components/Login';
import bookStoreBg from './assests/images/backgroundImage.jpg'
import store from './utils/store';
import { Provider } from 'react-redux';

function App() {

  return (
    <Provider store={store}>
    <BrowserRouter>
      <div style={{ backgroundImage: `url(${bookStoreBg})` }}  className="bg-cover bg-no-repeat bg-center min-h-screen">
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/" element={<BookList />} />
      </Routes>
      </div>
    </BrowserRouter>
    </Provider>
  );
}

export default App;