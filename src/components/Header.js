import React from 'react';
import { USER_AVATAR } from '../utils/constants';
import LOGO from '../assests/images/logo.png'

const Header = () => {

  return (
    <div className="sticky top-0 px-8 py-4 bg-blue-500 z-10 w-full flex justify-between items-center mb-2.5">
      <h1 className="font-bold text-black font-sans text-xl">Book Tracking App</h1>
      <img className="w-44"
      src={LOGO} 
        alt="logo"
      />
    <div className="flex p-2">
      <img 
        className="w-12 h-12"
        alt="usericon"
        src={USER_AVATAR}
      />
      <button className="font-bold text-white">Sign Out</button>
    </div>
    </div>
  )
}

export default Header;