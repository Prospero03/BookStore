import React from 'react';
import { Link } from "react-router-dom";
import axios from "axios";
import { Helmet } from 'react-helmet';

const BookCard = ({ data, favorite }) => {
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: data._id,
  };

  const handleRemoveBook = async () => {
    const response = await axios.put(
      "http://localhost:1000/api/v1/remove-book-from-favorite",
      {},
      { headers }
    );
    alert(response.data.message);
  };

  return (
    <article className='bg-zinc-800 rounded p-4 flex-col' aria-labelledby={`book-${data._id}`}>
      <Helmet>
        <title>{data.title} | Книжный магазин</title>
        <meta name="description" content={`Книга "${data.title}" автора ${data.author}`} />
      </Helmet>

      <Link to={`/view-book-details/${data._id}`} aria-label={`Подробнее о книге ${data.title}`}>
        <div>
          <div className='bg-zinc-900 rounded flex items-center justify-center'>
            <img 
              src={data.url} 
              alt={`Обложка книги "${data.title}"`} 
              className='h-[20vh]'
              loading="lazy"
            />
          </div>
          <h2 id={`book-${data._id}`} className='mt-4 text-xl text-zinc-100'>{data.title}</h2>
          <p className='mt-2 text-zinc-400 font-semibold'>{data.author}</p>
          <p className='mt-2 text-zinc-200 font-semibold text-xl'>{data.price} ₽</p>
        </div>
      </Link>
      
      {favorite && (
        <button 
          className='flex text-zinc-300 text-base pt-2 hover:text-yellow-200'
          onClick={handleRemoveBook}
          aria-label={`Удалить ${data.title} из избранного`}
        >
          Удалить из избранного
        </button> 
      )}
    </article>
  );
};

export default BookCard;