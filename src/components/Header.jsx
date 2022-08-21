import React from 'react'
import { Link } from "react-router-dom";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { MdOutlineShoppingCart } from 'react-icons/md';

import { app } from "../firebase.config";
import Avatar from '../images/avatar.png';

function Header() {
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();

  async function login() {
    const response = await signInWithPopup(firebaseAuth, provider);
    console.log(response);
  }

  return (
    <header className='box-border w-screen bg-slate-300 fixed z-50 p-6 px-14'>
        <div className='hidden md:flex h-full w-full justify-between items-center'>
          <Link to={"/"}>
            <p className='text-2xl font-bold'>Meal <span className='italic'>Express...</span></p>
          </Link>
          
          <ul className='flex gap-8'>
            <li className='cursor-pointer'>Home</li>
            <li className='cursor-pointer'>Menu</li>
            <li className='cursor-pointer'>Services</li>
          </ul>

          <div className='flex justify-center items-center gap-7 relative'>
            <MdOutlineShoppingCart className='text-xl cursor-pointer' />
            <div className='h-4 w-4 absolute top-0 left-4 rounded bg-black flex justify-center items-center'>
              <p className='text-xs text-white font-semibold'>2</p>
            </div>
            <div>
              <img src={Avatar} onClick={() => login()} className='h-9 w-9 drop-shadow' alt="user-avatar" />
            </div>
          </div>
        </div>

        <div className='flex md:hidden'>Mobile</div>
    </header>
  )
}

export default Header