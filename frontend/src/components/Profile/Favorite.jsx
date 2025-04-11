import axios from 'axios'
import React, { useEffect, useState } from 'react'
import BookCard from "../BookCard/BookCard"

const Favorite = () => {
  const [FavoriteBooks, setFavoriteBooks] = useState();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`
  }
  useEffect(()=>{
    const fetch = async () =>{
      const response = await axios.get("http://localhost:1000/api/v1/get-favorite-books", {headers}
      );
      setFavoriteBooks(response.data.data)
    };
    fetch();
  }, [FavoriteBooks]);

  return (
    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4' >
      {FavoriteBooks && FavoriteBooks.length === 0 && <div className='text-2xl font-semibold '>Вы ещё не добавили книгу в избранное</div>}
      {FavoriteBooks &&
       FavoriteBooks.map((items,i)=> (
        <div key={i}>
          <BookCard data={items} favorite={true} />
        </div>
      ))}
    </div>
  )
}

export default Favorite