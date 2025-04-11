import React, { useState } from 'react';
import {Link, useNavigate} from "react-router-dom";
import {authActions} from "../store/auth";
import {useDispatch} from "react-redux"
import axios from "axios";

const Login = () => {
  const [Values, setValues] = useState({
    username:"",
    password: "",
    
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const change = (e)=>{
    const {name, value} = e.target;
    setValues({...Values,[name]:value});
  };

  const submit = async() => {
    
    try {
      if (Values.username === "" || 
          Values.password === ""  
          ) {
          alert("Все поля обязательны для заполнения")
          }else {
            const response = await axios.post("http://localhost:1000/api/v1/login", 
            Values
            );
            alert(response.data.message);

            //Dispatch функция Redux - isLoggedIn, происходит смена на true
            dispatch(authActions.login());
            dispatch(authActions.changeRole(response.data.role));

            //Local Storage - добавляются данные в Приложение/Локальное хранилище
            localStorage.setItem("id", response.data.id);
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("role", response.data.role);
            navigate("/");
          } 
    } catch (error) {
      alert(error.response.data.message);
    }
  }


  
  return (
    <div className='h-screen bg-zinc-900 px-12 py-8 flex items-center justify-center'>
      <div className='bg-zinc-800 rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6 '>

        <h1 className='text-zinc-200 text-xl'> Авторизация</h1>
        <div className='mt-4'>

          <div className='mt-4'>
            <label htmlFor="" className='text-zinc-400'>
              Имя пользователя
            </label>
            <input  type="text"
                    className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
                    placeholder='Введите имя'
                    name="username"
                    required 
                    value={Values.username}
                    onChange={change}/>
          </div>

          

          <div className='mt-4'>
            <label htmlFor="" className='text-zinc-400'>
              Пароль
            </label>
            <input  type="password"
                    className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
                    placeholder='Введите пароль'
                    name="password"
                    required 
                    value={Values.password}
                    onChange={change}/>
          </div>
          

          <div className='mt-4'>
            <button className='w-full bg-blue-500 text-white font-semibold py-2 rounded'
                    onClick={submit}> 
            Войти 
            </button>
          </div>

          <div >
            <p className='mt-4 text-white text-center'>Или</p>
          </div>

          <div className='mt-4 text-zinc-400 text-center'>
            <p>Ещё не зарегистрированы? <Link>Регистрация</Link> </p>
            
          </div>




        </div>

      </div>
    </div>
  )
}

export default Login