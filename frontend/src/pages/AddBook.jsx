import axios from 'axios';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';

const AddBook = () => {
  const [Data, setData] = useState({
    url: "",
    title: "",
    author: "",
    price: "",
    desc: "",
    language: "",
  });

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const change = (e) => {
    const {name, value} = e.target;
    setData({ ...Data, [name]:value});
  };

  const submit = async () => {
    try {
      if(!Data.url || !Data.title || !Data.author || !Data.price || !Data.desc || !Data.language) {
        alert("Не все поля заполнены");
        return;
      }
      
      const response = await axios.post(
        "http://localhost:1000/api/v1/add-book",
        Data,
        {headers}
      );
      
      setData({
        url: "",
        title: "",
        author: "",
        price: "",
        desc: "",
        language: "",
      });
      alert(response.data.message);
    } catch(error) {
      alert(error.response.data.message);
    }
  }

  return (
    <div className='h-[100%] p-0 md:p-4'>
      <Helmet>
        <title>Добавить книгу | Книжный магазин</title>
        <meta name="description" content="Добавление новой книги в каталог интернет-магазина" />
      </Helmet>

      <h1 className='text-3xl md:text-5xl font-semibold text-zinc-500 mb-8'>
        Добавить книгу
      </h1>

      <div className='p-4 bg-zinc-800 rounded'>
        {Object.entries({
          url: {label: "URL Изображения", type: "text", placeholder: "Добавьте url на изображение"},
          title: {label: "Заголовок", type: "text", placeholder: "Введите заголовок"},
          author: {label: "Автор", type: "text", placeholder: "Введите автора"},
          price: {label: "Цена", type: "text", placeholder: "Введите цену"},
          language: {label: "Язык", type: "text", placeholder: "Введите язык"}
        }).map(([name, {label, type, placeholder}]) => (
          <div key={name} className='mt-4'>
            <label htmlFor={name} className="text-white">{label}</label>
            <input
              id={name}
              type={type}
              className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
              placeholder={placeholder}
              name={name}
              required
              value={Data[name]}
              onChange={change}
              aria-label={label}
            />
          </div>
        ))}

        <div className='mt-4'>
          <label htmlFor="desc" className="text-white">Описание</label>
          <textarea
            id="desc"
            rows="5"
            className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
            placeholder="Введите описание"
            name="desc"
            required
            value={Data.desc}
            onChange={change}
            aria-label="Описание книги"
          />
        </div>

        <button 
          className='mt-4 px-3 bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600'
          onClick={submit}
          aria-label="Добавить книгу"
        >
          Добавить книгу
        </button>
      </div>
    </div>
  )
}

export default AddBook;