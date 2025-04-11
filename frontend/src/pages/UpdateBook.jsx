import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const UpdateBook = () => {
    
    
    const [Data, setData] =useState({
        url: "",
        title: "",
        author: "",
        price: "",
        desc: "",
        language: "",
      });
    
      
      
      

      const {id} = useParams();
      const navigate = useNavigate();

      const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
        bookid: id,
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
            const response = await axios.put(
              "http://localhost:1000/api/v1/update-book",
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
            navigate(`/view-book-details/${id}`);
          }
        } catch(error){
          alert(error.response.data.message)
          
        }
      }

      useEffect(() =>{
        const fetch = async() => {
            const response = await axios.get(`http://localhost:1000/api/v1/get-book-by-id/${id}`
            );
            setData(response.data.data)
        };
        fetch();
      },[]);

  return  (
    <div className='bg-zinc-900 h-screen p-0 md:p-4'>
      <h1 className='text-3xl md:text-5xl font-semibold text-zinc-500 mb-8'>
        Редактирование книги
      </h1>


      <div className='p-4 bg-zinc-800 rounded'>

        <div className=''>
          <label htmlFor="" className="text-white">URL Изображения</label>
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
          <label htmlFor="" className="text-white">Заголовок</label>
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
          <label htmlFor="" className="text-white">Автор</label>
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
          <label htmlFor="" className="text-white">Цена</label>
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
          <label htmlFor="" className="text-white">Язык</label>
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
          <label htmlFor="" className="text-white">Описание</label>
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
          Сохранить
        </button>

      </div>
    </div>
  )
}

export default UpdateBook