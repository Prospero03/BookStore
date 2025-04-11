import axios from 'axios';
import React, { useState } from 'react'

const AddBook = () => {
  const [Data, setData] =useState({
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

  const change = (e) =>{
    const {name, value} = e.target;
    setData({ ...Data, [name]:value})
  };

  const submit = async () =>{
    try{
      if(
        Data.url === "" ||
        Data.title === "" ||
        Data.author === "" ||
        Data.price === "" ||
        Data.desc === "" ||
        Data.language === ""
      ) {
        alert("Не все поля заполнены");
      }else{
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
      }
    } catch(error){
      alert(error.response.data.message)
    }
  }

  return (
    <div className='h-[100%] p-0 md:p-4'>
      <h1 className='text-3xl md:text-5xl font-semibold text-zinc-500 mb-8'>
        Добавить книгу
      </h1>


      <div className='p-4 bg-zinc-800 rounded'>

        <div className=''>
          <label htmlFor="">URL Изображения</label>
          <input
            type="text"
            className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
            placeholder="Добавьте url на изображение"
            name="url"
            required
            value={Data.url}
            onChange={change}
          />
        </div>

        <div className='mt-4'>
          <label htmlFor="">Заголовок</label>
          <input
            type="text"
            className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
            placeholder="Введите заголовок"
            name="title"
            required
            value={Data.title}
            onChange={change}
          />
        </div>

        <div className='mt-4'>
          <label htmlFor="">Автор</label>
          <input
            type="text"
            className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
            placeholder="Введите автора"
            name="author"
            required
            value={Data.author}
            onChange={change}
          />
        </div>

        

        <div className='mt-4'>
          <label htmlFor="">Цена</label>
          <input
            type="text"
            className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
            placeholder="Введите цена"
            name="price"
            required
            value={Data.price}
            onChange={change}
          />
        </div>

        <div className='mt-4'>
          <label htmlFor="">Язык</label>
          <input
            type="text"
            className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
            placeholder="Введите язык"
            name="language"
            required
            value={Data.language}
            onChange={change}
          />
        </div>

        <div className='mt-4'>
          <label htmlFor="">Описание</label>
          <textarea
            rows="5"
            className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
            placeholder="Введите описание"
            name="desc"
            required
            value={Data.desc}
            onChange={change}
          />
        </div>

        <button className='mt-4 px-3 bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600'
                onClick={submit}>
          Добавить книгу
        </button>

      </div>
    </div>
  )
}

export default AddBook