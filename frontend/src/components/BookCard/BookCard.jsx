import React from 'react'
import {Link} from "react-router-dom";
import axios from "axios";

const BookCard = ({data, favorite}) => {
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: data._id,
  };
  const handleRemoveBook = async()=> {
    const response = await axios.put("http://localhost:1000/api/v1/remove-book-from-favorite",{},
      {headers}
    );
    alert(response.data.message);
  }
  return (
    <div className='bg-zinc-800 rounded p-4 flex-col'>
      <Link to={`/view-book-details/${data._id}`}>
        <div >
          {/*Обложка*/}
          <div className='bg-zinc-900 rounded flex items-center justify-center'>
            <img src={data.url} alt="/" className='h-[20vh]'/>
          </div>
          {/*Описание*/}
          <h2 className='mt-4 text-xl text-zinc-100'>{data.title}</h2>
          <p className='mt-2 text-zinc-400 font-semibold'>{data.author}</p>
          <p className='mt-2 text-zinc-200 font-semibold text-xl'>{data.price} ₽</p>
          
          
        </div>
      </Link>
      {favorite && (
        <button className='flex  text-zinc-300 text-base pt-2 hover:text-yellow-200 '
                  onClick={handleRemoveBook}
                  >
                  Удалить из избранного
          </button> 
      )}
      
    </div>
  )
}

export default BookCard