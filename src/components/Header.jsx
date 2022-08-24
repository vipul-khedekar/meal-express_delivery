import React, { useState } from 'react'
import { Link } from "react-router-dom";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { MdOutlineShoppingCart } from 'react-icons/md';

import { app } from "../firebase.config";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import Avatar from '../images/avatar.png';

function Header() {
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const [isMenu, setIsMenu] = useState(false);
  
  const [{user}, dispatch] = useStateValue();

  async function loginAndMenu() {
    if(!user) {
      const response = await signInWithPopup(firebaseAuth, provider);
      const { providerData } = response.user;
      dispatch({type: actionType.SET_USER, user: providerData[0]});
      localStorage.setItem(`user`, JSON.stringify(providerData[0]));
    }
    if(user) {
      setIsMenu(!isMenu);
    }
  }

  return (
    <header className='box-border w-screen bg-slate-300 fixed z-50 p-6 px-8'>
        <div className='hidden md:flex h-[5vh] w-full justify-between items-center'>
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
            <div className='h-4 w-4 absolute top-0 left-4 rounded-full bg-black flex justify-center items-center'>
              <p className='text-xs text-white font-semibold'>2</p>
            </div>

            <img className='h-9 w-9 rounded-full relative drop-shadow' onClick={() => loginAndMenu()} src={user ? user.photoURL : Avatar} alt={user ? user.displayName : "user-avatar"} />

            {isMenu && (
              <menu className='flex flex-col bg-yellow-200 w-36 rounded-lg absolute top-10 drop-shadow text-center'>
                <Link to={"/create-item"}>
                  <p className='p-1 rounded-lg hover:bg-red-600'>Add new item</p>
                </Link>

                <p className='p-1 rounded-lg hover:bg-red-600'>Logout</p>
              </menu>
            )}
          </div>
        </div>

        <div className='flex md:hidden h-[4vh] w-full justify-between items-center'>
          <Link to={"/"}>
            <p className='text-2xl font-bold'>Meal <span className='italic'>Express...</span></p>
          </Link>

          <div className='flex justify-center items-center gap-7 relative'>
            <MdOutlineShoppingCart className='text-xl cursor-pointer' />
            
            <div className='h-4 w-4 absolute top-0 left-4 rounded-full bg-black flex justify-center items-center'>
              <p className='text-xs text-white font-semibold'>2</p>
            </div>
            
            <img className='h-9 w-9 rounded-full relative drop-shadow cursor-pointer' onClick={() => loginAndMenu()} src={user ? user.photoURL : Avatar} alt={user ? user.displayName : "user-avatar"} />
            
            {isMenu && (
              <menu className='flex flex-col gap-2 bg-yellow-200 w-36 rounded-lg absolute top-10 drop-shadow text-center'>
                <Link to={"/create-item"}>
                  <p className='p-1 rounded-lg cursor-pointer'>Add new item</p>
                </Link>
                <p className='p-1 rounded-lg cursor-pointer'>Home</p>
                <p className='p-1 rounded-lg cursor-pointer'>Menu</p>
                <p className='p-1 rounded-lg cursor-pointer'>Services</p>
                <p className='p-1 rounded-lg cursor-pointer'>Logout</p>
              </menu>
            )}
          </div>
        </div>
    </header>
  )
}

export default Header