import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loader from '../Loader/Loader';
import {Link} from "react-router-dom"

const UserOrderHistory = () => {
  const [OrderHistory, setOrderHistory] = useState();

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem('token')}`
  }

  useEffect(()=>{
    const fetch = async() =>{
      const response = await axios.get('http://localhost:1000/api/v1/get-order-history',
      {headers}
      );
      setOrderHistory(response.data.data)
    }
    fetch();
  }, [])
  return (

    <>
      {!OrderHistory && (
      <div className='flex items-center justify-center h-[100%]'>
        <Loader/>
        </div>)}

      {OrderHistory && OrderHistory.length === 0 &&(
        <div className='h-[80vh] p-4 text-zinc-100'>
          <div className='h-[100%] flex flex-col items-center justify-center'>
            <h1 className='text-5xl font-semibold text-white mb-8'>
                Нет активных заказов
            </h1>
            
          </div>
        </div>
      )}

      {OrderHistory && OrderHistory.length > 0 &&(
        <div className='h-[100%] p-0 md:p-4 text-zinc-100'>
          <h1 className='text-3xl md:text-5xl font-semibold text-zinc-500 mb-8'>
            Ваши заказ
          </h1>
          <div className='mt-4 bg-zinc-800 w-full rounded py-2 px-4 flex gap-2 '>

            <div className='w-[3%]'>
              <h1 className='text-center'>
                № 
              </h1>
            </div>
            <div className='w-[22%]'>
              <h1 className=''>
                Книги
              </h1>
            </div>
            <div className='w-[45%]'>
              <h1 className=''>
                Описание
              </h1>
            </div>
            <div className='w-[9%]'>
              <h1 className=''>
                Цена
              </h1>
            </div>
            <div className='w-[20%]'>
              <h1 className=''>
                Статус
              </h1>
            </div>
            
          </div>


          {OrderHistory.map((items,i)=>(
            <div className='bg-zinc-800 w-full rounded py-2 px-4 gap-4 hover:bg-zinc-900 hover:cursor-pointer flex'>
              <div className='w-[3%]'>
                <h1 className='text-center'>{i+1}</h1>
              </div>

              <div className='w-[22%]'>
                <Link to={`/view-book-details/${items.book._id}`}
                      className='hover:text-blue-300'>
                  {items.book.title}
                </Link>
              </div>

              <div className='w-[42%]'>
                <h1 className=''>{items.book.desc.slice(0,50)} ... </h1>
              </div>

              <div className='w-[9%]'>
                <h1 className=''>{items.book.price} ₽</h1>
              </div>

              <div className='w-[16%]'>
                <h1 className='font-semibold text-green-500'>
                  {items.status === "Успешно" ? (
                    <div className='text-green-500'>{items.status}</div>
                  ) : items.status === "Отклонено" ? (
                    <div className='text-red-500'>{items.status}</div>
                  ):(
                    items.status
                  )}
                </h1>
              </div>

            </div>
          )
          )}
        </div>
      )}
    </>

  )
}

export default UserOrderHistory