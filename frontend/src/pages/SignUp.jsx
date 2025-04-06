import React, { useState } from 'react';
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const [Values, setValues] = useState({
    username:"",
    email: "",
    password: "",
    address: "",
  });

  const navigate = useNavigate();

  const change = (e)=>{
    const {name, value} = e.target;
    setValues({...Values,[name]:value});
  };

  const submit = async() => {
    
    try {
      if (Values.username === "" || 
          Values.email === "" || 
          Values.password === "" || 
          Values.address === ""
          ) {
          alert("Все поля обязательны для заполнения")
          }else {
            const response = await axios.post("http://localhost:1000/api/v1/sign-up", 
            Values
            );
            alert(response.data.message);
            navigate("/LogIn");
          } 
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='h-screen bg-zinc-900 px-12 py-8 flex items-center justify-center'>
      <div className='bg-zinc-800 rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6 '>

        <h1 className='text-zinc-200 text-xl'> Регистрация</h1>
        <div className='mt-4'>

        <div className='mt-4'>
            <label htmlFor="" className='text-zinc-400'>
              Email
            </label>
            <input  type="email"
                    className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
                    placeholder='email'
                    name="email"
                    required 
                    value= {Values.email}
                    onChange={change}
                    />
          </div>


          <div className='mt-4'>
            <label htmlFor="" className='text-zinc-400'>
              Имя пользователя
            </label>
            <input  type="text"
                    className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
                    placeholder='username'
                    name="username"
                    required 
                    value= {Values.username}
                    onChange={change}
                    />
          </div>

          

          <div className='mt-4'>
            <label htmlFor="" className='text-zinc-400'>
              Пароль
            </label>
            <input  type="password"
                    className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
                    placeholder='password'
                    name="password"
                    required 
                    value= {Values.password}
                    onChange={change}
                    />
          </div>
          <div className='mt-4'>
            <label htmlFor="" className='text-zinc-400'>
              Адрес
            </label>
            <textarea
                    className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
                    rows="5"
                    placeholder='adress'
                    name="address"
                    required 
                    value= {Values.address}
                    onChange={change}
                    />
          </div>

          <div className='mt-4'>
            <button className='w-full bg-blue-500 text-white font-semibold py-2 rounded'
                    onClick={submit}> 
              Регистрация 
            </button>
          </div>

          <div >
            <p className='mt-4 text-white text-center'>Или</p>
          </div>

          <div className='mt-4 text-zinc-400 text-center'>
            <p>Уже зарегистрированы? <Link>Войти</Link> </p>
            
          </div>




        </div>

      </div>
    </div>
  )
}

export default SignUp