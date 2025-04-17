import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Helmet } from 'react-helmet';

const SignUp = () => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    address: "",
  });
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!values.username || !values.email || !values.password || !values.address) {
        setError("Все поля обязательны для заполнения");
        return;
      }

      const response = await axios.post(
        "http://localhost:1000/api/v1/sign-up",
        values
      );
      alert(response.data.message);
      navigate("/login");
    } catch (error) {
      setError(error.response?.data?.message || "Ошибка регистрации");
    }
  };

  return (
    <div className='h-screen bg-zinc-900 px-4 py-8 flex items-center justify-center'>
      <Helmet>
        <title>Регистрация | Книжный магазин</title>
        <meta name="description" content="Создайте аккаунт, чтобы получить доступ к персонализированным рекомендациям и удобным покупкам." />
      </Helmet>

      <form 
        onSubmit={handleSubmit}
        className='bg-zinc-800 rounded-lg px-6 py-8 w-full md:w-3/6 lg:w-2/6'
        aria-labelledby="signup-form-title"
      >
        <h1 id="signup-form-title" className='text-2xl text-white font-semibold mb-6'>
          Регистрация
        </h1>

        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        <div className='space-y-4'>
          <fieldset>
            <label htmlFor="email" className='block text-zinc-400 mb-1'>
              Email
            </label>
            <input
              type="email"
              id="email"
              className='w-full bg-zinc-900 text-white p-3 rounded outline-none'
              placeholder='Введите email'
              name="email"
              required
              value={values.email}
              onChange={handleChange}
              aria-required="true"
            />
          </fieldset>

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

          <fieldset>
            <label htmlFor="address" className='block text-zinc-400 mb-1'>
              Адрес
            </label>
            <textarea
              id="address"
              className='w-full bg-zinc-900 text-white p-3 rounded outline-none'
              rows="4"
              placeholder='Введите адрес'
              name="address"
              required
              value={values.address}
              onChange={handleChange}
              aria-required="true"
            />
          </fieldset>

          <button
            type="submit"
            className='w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded transition'
            aria-label="Зарегистрироваться"
          >
            Зарегистрироваться
          </button>
        </div>

        <div className='mt-6 text-center text-zinc-400'>
          <p>
            Уже зарегистрированы?{" "}
            <Link to="/login" className='text-blue-400 hover:underline'>
              Войти
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignUp;