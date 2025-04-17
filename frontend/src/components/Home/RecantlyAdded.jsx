import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Helmet } from 'react-helmet';
import BookCard from '../BookCard/BookCard';
import Loader from '../Loader/Loader';

const RecentlyAdded = () => {
  const [Data, setData] = useState();

  useEffect(() => { 
    const fetch = async () => {
      const response = await axios.get(
        "http://localhost:1000/api/v1/get-recent-books"
      );
      setData(response.data.data);
    };
    fetch();
  }, []);

  return (
    <section className='mt-8 px-8' aria-label="Новинки">
      <Helmet>
        <title>Новые поступления | Книжный магазин</title>
      </Helmet>

      <h2 className='text-3xl text-white'>Новинки</h2>

      {!Data ? (
        <div className='flex items-center justify-center my-8'>  
          <Loader/>
        </div>
      ) : (
        <div className="my-8 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-8">
          {Data.map((items, i) => (
            <div key={i}>
              <BookCard data={items} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default RecentlyAdded;