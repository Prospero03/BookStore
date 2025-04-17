import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { authActions } from "../store/auth";
import { useDispatch } from "react-redux";
import axios from "axios";
import { Helmet } from 'react-helmet';

const Login = () => {
  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!values.username || !values.password) {
        setError("Все поля обязательны для заполнения");
        return;
      }

      const response = await axios.post(
        "http://localhost:1000/api/v1/login",
        values
      );
      alert(response.data.message);

      dispatch(authActions.login());
      dispatch(authActions.changeRole(response.data.role));

      localStorage.setItem("id", response.data.id);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);
      navigate("/");
    } catch (error) {
      setError(error.response?.data?.message || "Ошибка авторизации");
    }
  };

  return (
    <div className='h-screen bg-zinc-900 px-4 py-8 flex items-center justify-center'>
      <Helmet>
        <title>Авторизация | Книжный магазин</title>
        <meta name="description" content="Войдите в свой аккаунт, чтобы получить доступ к персональным рекомендациям и избранным книгам." />
      </Helmet>

      <form 
        onSubmit={handleSubmit}
        className='bg-zinc-800 rounded-lg px-6 py-8 w-full md:w-3/6 lg:w-2/6'
        aria-labelledby="login-form-title"
      >
        <h1 id="login-form-title" className='text-2xl text-white font-semibold mb-6'>
          Авторизация
        </h1>

        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        <div className='space-y-4'>
          <fieldset>
            <label htmlFor="username" className='block text-zinc-400 mb-1'>
              Имя пользователя
            </label>
            <input
              type="text"
              id="username"
              className='w-full bg-zinc-900 text-white p-3 rounded outline-none'
              placeholder='Введите имя'
              name="username"
              required
              value={values.username}
              onChange={handleChange}
              aria-required="true"
            />
          </fieldset>

          <fieldset>
            <label htmlFor="password" className='block text-zinc-400 mb-1'>
              Пароль
            </label>
            <input
              type="password"
              id="password"
              className='w-full bg-zinc-900 text-white p-3 rounded outline-none'
              placeholder='Введите пароль'
              name="password"
              required
              value={values.password}
              onChange={handleChange}
              aria-required="true"
            />
          </fieldset>

          <button
            type="submit"
            className='w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded transition'
            aria-label="Войти в аккаунт"
          >
            Войти
          </button>
        </div>

        <div className='mt-6 text-center text-zinc-400'>
          <p>
            Ещё не зарегистрированы?{" "}
            <Link to="/signup" className='text-blue-400 hover:underline'>
              Регистрация
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;