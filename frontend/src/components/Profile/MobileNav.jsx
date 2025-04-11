import React from 'react'
import { useSelector } from 'react-redux'
import {Link} from "react-router-dom"

const MobileNav = () => {
    const role = useSelector((state)=> state.auth.role)
  return (
    <>
        {role ==="user" && (
            <div className='w-full flex lg:hidden items-center justify-between mt-4'>
            <Link
            to="/profile"
            className='text-zinc-100 font-semibold w-full py-2 text-center mt-4 hover:bg-zinc-900 rounded transition-all'
            >
            Избранное
            </Link>

            <Link
            to="/profile/orderHistory"
            className='text-zinc-100 font-semibold w-full py-2 text-center mt-4 hover:bg-zinc-900 rounded transition-all'
            >
            Заказы
            </Link>

            <Link
            to="/profile/settings"
            className='text-zinc-100 font-semibold w-full py-2 text-center mt-4 hover:bg-zinc-900 rounded transition-all'
            >
            Редактирование
            </Link>  
        </div>
        )}

        {role ==="admin" &&(
            <div className='w-full flex lg:hidden items-center justify-between mt-4'>
            <Link
            to="/profile"
            className='text-zinc-100 font-semibold w-full py-2 text-center mt-4 hover:bg-zinc-900 rounded transition-all'
            >
             История заказов
            </Link>

            <Link
            to="/profile/add-book"
            className='text-zinc-100 font-semibold w-full py-2 text-center mt-4 hover:bg-zinc-900 rounded transition-all'
            >
            Добавить Книгу
            </Link>

            
      </div>
        )}
    </>
    
  )
}

export default MobileNav