import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { FaGripLines } from "react-icons/fa";
import {useSelector} from "react-redux";

const Navbar = () => {

      const links =[
        {
          title: "Главная",
          link: "/",
        },
        
        {
          title: "Каталог",
          link: "/all-books",
        },
        {
          title: "Корзина",
          link: "/cart",
        },
        {
          title: "Профиль",
          link: "/profile",
        },
      ];

      //Redux
      const isLoggedIn = useSelector((state)=> state.auth.isLoggedIn);

      //Redux - Главная, Каталог
      if (isLoggedIn ===false)
      {
        links.splice(2,2)
      }
      //Первый аргумент 2 — это индекс, с которого начинается удаление.
      //Второй аргумент 2 — количество удаляемых элементов.

      const [MobileNav, setMobileNav] = useState("hidden");

  return (
    <>
      {/*Навигация*/}
      <nav className="z-50 relative flex bg-zinc-800 text-white px-8 py-4  items-center justify-between">
                {/*Лого*/}
          <Link to="/" className='flex items-center justi'>
            <img 
              className='h-10 me-4'
              src="https://img.genially.com/5d1b2b07d637b30fbef32398/ec2cc2a6-54c0-4f38-a523-ad678a7eed0c.png" 
              alt="logo" />

            <h1 className='text-2xl font-semibold'>Book-Store</h1>
          </Link>

          <div className='nav-links-bookheaven block md:flex gap-4 items-center '>

                {/*Links - Навигация + Смена кнопки Профиль*/}
              <div className='hidden md:flex gap-4'>
              {links.map((items, i) => (


              <div className='flex items-center justify-center'>
                 {items.title === "Профиль" ? (
                 <Link 
                      to={items.link}
                      className='px-4 py-2 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300 hover:border-white'
                      key={i}>
                        {items.title}
                </Link> 
                ):( 
                <Link to={items.link}
                      className='cursor-pointer hover:text-blue-500 transition-all duration-300'
                      key={i}>
                        {items.title}{" "}
                </Link>)
                }
              </div>


              ))}
              </div>

              {/*
              <Link to={items.link}
                      className='cursor-pointer hover:text-blue-500 transition-all duration-300'
                      key={i}>
                        {items.title}
                </Link>
              */}
              
                {/*Регистрация | Авторизация */} {/*Если false, то показывает Логин и Регистрация*/}
                {isLoggedIn === false && 
                (
                  <>
                    <div className="hidden md:flex gap-4">
                      <Link to="LogIn" className=' px-4 py-2 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300 hover:border-white'>
                        Войти
                      </Link>

                      <Link to="SignUp" className=' px-4 py-2 bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300'>
                        Регистрация
                      </Link>
                    </div>
                  </>
                ) }
              
                {/*Мобильная навигация*/}
              <button className='block md:hidden text-white text-2xl hover:text-zinc-400 ' 
                      onClick={()=> MobileNav == "hidden"
                       ? setMobileNav("block") 
                       : setMobileNav ("hidden")
                       }
              >
                <FaGripLines />
              </button>
            
          </div>
      </nav>

      {/*Мобильная Навигация*/}
      <div 
      className={` ${MobileNav}
      bg-zinc-800 h-screen absolute top-0 left-0 w-full z-40 flex flex-col items-center justify-center`}>
      {links.map((items, i) => (
                <Link to={items.link}
                      className={` ${MobileNav} cursor-pointer text-white mb-8 text-4xl font-semibold hover:text-blue-500 transition-all duration-300`}
                      key={i}
                      onClick={()=> MobileNav == "hidden"
                       ? setMobileNav("block") 
                       : setMobileNav ("hidden")
                       }>
                        {items.title}{""}
                </Link>
              ))}

                  {/*Если false, то показывает Логин и Регистрация*/}
                  {isLoggedIn === false &&(
                    <>
                      <Link to="LogIn" 
                      onClick={()=> MobileNav == "hidden"
                          ? setMobileNav("block") 
                          : setMobileNav ("hidden")
                          
                          } className= {` ${MobileNav} mb-8 text-3xl font-semibold px-8 py-2 border border-blue-500 rounded text-white hover:bg-white hover:text-zinc-800 transition-all duration-300 hover:border-white`}>
                        Войти
                      </Link>
                      <Link to="SignUp" 

                      onClick={()=> MobileNav == "hidden"
                      ? setMobileNav("block") 
                      : setMobileNav ("hidden")
                      }

                      className={` ${MobileNav} mb-8 text-3xl font-semibold px-8 py-2 bg-blue-500 rounded  hover:bg-white hover:text-zinc-800 transition-all duration-300`}>
                        Регистрация
                      </Link>
                    </>
                  )}
              
      </div>
    </>
  )
}

export default Navbar