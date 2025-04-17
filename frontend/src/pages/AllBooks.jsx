import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Helmet } from 'react-helmet';
import Loader from '../components/Loader/Loader';
import BookCard from '../components/BookCard/BookCard';

const AllBooks = () => {
  const [Data, setData] = useState();

  useEffect(() => { 
    const fetch = async() => {
      const response = await axios.get(
        "http://localhost:1000/api/v1/get-all-books"
      );
      setData(response.data.data);
    };
    fetch();
  }, []);

  return (
    <div className='bg-zinc-900 px-12 h-screen py-8'>
      <Helmet>
        <title>Все книги | Книжный магазин</title>
        <meta name="description" content="Каталог всех книг в нашем интернет-магазине" />
      </Helmet>

      <h1 className='text-3xl text-white'>Все Книги</h1>

      {!Data ? (
        <div className='w-full h-screen flex items-center justify-center'>  
          <Loader/>
        </div>
      ) : (
        <section className="my-8 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-8" 
                 aria-label="Список книг">
          {Data.map((items, i) => (
            <article key={i} aria-labelledby={`book-title-${i}`}>
              <BookCard data={items} />
            </article>
          ))}
        </section>
      )}
    </div>
  )
}

export default AllBooks;