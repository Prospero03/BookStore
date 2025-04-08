import React from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRightFromBracket } from "react-icons/fa6";

const Sidebar = ({data}) => {
  return (
    <div className='bg-zinc-800 p-4 rounded flex flex-col items-center justify-between h-[90%]'>
      <div className='flex items-center flex-col justify-center'>
        {" "}
        <img src={data.avatar} alt="avatar"
            className='h-[12vh]' />

        <p className='mt-3 text-xl text-zinc-100 font-semibold'>{data.username}</p>

        <p className='mt-1 text-normal text-zinc-300'>{data.email}</p>
        <div className='w-full mt-4 h-[1px] bg-zinc-500 hidden lg:block'></div>
      </div>


      <div className='w-full flex-col items-center justify center hidden lg:flex'>
        <Link
          to="/profile"
          className='text-zinc-100 font-semibold w-full py-2 text-center mt-4 hover:bg-zinc-900 rounded transition-all'
        >
          Favorites
        </Link>

        <Link
          to="/profile/orderHistory"
          className='text-zinc-100 font-semibold w-full py-2 text-center mt-4 hover:bg-zinc-900 rounded transition-all'
        >
          Order History
        </Link>

        <Link
          to="/profile/settings"
          className='text-zinc-100 font-semibold w-full py-2 text-center mt-4 hover:bg-zinc-900 rounded transition-all'
        >
          Settings
        </Link>  
      </div>

      <button className='bg-zinc900 w/6 lg:w-full mt-4 py-2 lg:mt-0 text-white font-semibold flex items-center justify-center hover:bg-zinc-900 rounded transition-all'>
        Log Out <FaArrowRightFromBracket className="ms-4"/>
      </button>

    </div>
  )
}

export default Sidebar