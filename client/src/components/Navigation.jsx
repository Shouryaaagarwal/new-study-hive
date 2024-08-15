
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

function Navigation() {
  const dispatch = useDispatch();
  const { currentAdmin, signin, signout } = useSelector(state => state.admin);
  const { currentUser, Usersignin, usersignout, usersignup } = useSelector(state => state.user);

  return (
    <div className='w-full bg-[#000] h-20 '>
       <div className="flex items-center justify-center gap-6 sm:gap-10 md:gap-16 w-[100%] sm:w-[70%] mx-auto">
    <NavLink
      to="/home"
      className={({ isActive }) =>
        `text-white text-center text-xs sm:text-sm md:text-[15px] opacity-[0.8] my-8 font-normal hover:scale-110 transition-transform duration-300 ${
          isActive ? 'text-white opacity-[1] scale-125 font-bold mukta-bold' : ''
        }`
      }
    >
      Home
    </NavLink>

    <NavLink
      to="/b.e"
      className={({ isActive }) =>
        `text-white text-center text-xs sm:text-sm md:text-[15px] opacity-[0.8] my-8 font-normal hover:scale-110 transition-transform duration-300 ${
          isActive ? 'text-white opacity-[1] scale-125 font-bold mukta-bold' : ''
        }`
      }
    >
      B.E
    </NavLink>

    <NavLink
      to="/m.e"
      className={({ isActive }) =>
        `text-white text-center text-xs sm:text-sm md:text-[15px] opacity-[0.8] my-8 font-normal hover:scale-110 transition-transform duration-300 ${
          isActive ? 'text-white opacity-[1] scale-125 font-bold mukta-bold' : ''
        }`
      }
    >
      M.E
    </NavLink>

    {signin ? (
      <div className='hover:scale-110 transition-transform duration-300'>
        <NavLink
          to="/admin/profile"
          className={({ isActive }) =>
            `text-white text-center text-xs sm:text-sm md:text-[15px] opacity-[0.8] my-8 font-normal hover:scale-110 transition-transform duration-300 ${
              isActive ? 'text-white opacity-[1] scale-125 font-bold mukta-bold' : ''
            }`
          }
        >
          Admin
        </NavLink>
      </div>
    ) : <></>}

    {Usersignin ? (
      <NavLink
        to="/profile"
        className={({ isActive }) =>
          `text-white text-center text-xs sm:text-sm md:text-[15px] opacity-[0.8] my-8 font-normal hover:scale-110 transition-transform duration-300 ${
            isActive ? 'text-white opacity-[1] scale-125 font-bold mukta-bold' : ''
          }`
        }
      >
        User
      </NavLink>
    ) : <></>}

    {signin ? <></> : (
      <NavLink
        to="/contactus"
        className={({ isActive }) =>
          `text-white text-center text-xs sm:text-sm md:text-[15px] opacity-[0.8] my-8 font-normal hover:scale-110 transition-transform duration-300 ${
            isActive ? 'text-white opacity-[1] scale-125 font-bold mukta-bold' : ''
          }`
        }
      >
        Contact
      </NavLink>
    )}
  </div>

  <div className='flex items-center justify-center mt-0 pt-0'>
    <hr className='w-[80%] sm:w-[80%] md:w-[60%] h-[0.6px] px-10 rounded-full opacity-[0.5] bg-white' />
  </div>
    </div>
  );
}

export default Navigation;
