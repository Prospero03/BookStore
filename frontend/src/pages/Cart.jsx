import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import Loader from "../components/Loader/Loader";
import { AiFillDelete } from "react-icons/ai";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const [Cart, setCart] = useState();
  const [Total, setTotal] = useState(0);
  const navigate = useNavigate();

  const headers = {
    id: localStorage.getItem('id'),
    authorization: `Bearer ${localStorage.getItem('token')}`
  };

  useEffect(() => {
    const fetch = async() => {
      const res = await axios.get(
        "http://localhost:1000/api/v1/get-user-cart",
        {headers}
      );
      setCart(res.data.data);
    };
    fetch();
  }, []);

  useEffect(() => {
    if(Cart && Cart.length > 0) {
      setTotal(Cart.reduce((sum, item) => sum + item.price, 0));
    }
  }, [Cart]);

  const deletItem = async (bookid) => {
    const response = await axios.put(
      `http://localhost:1000/api/v1/remove-from-cart/${bookid}`, 
      {}, 
      {headers}
    );
    alert(response.data.message);
  };

  const PlaceOrder = async () => {
    try {
      const response = await axios.post(
        "http://localhost:1000/api/v1/place-order", 
        {order: Cart},
        {headers}
      );
      alert(response.data.message);
      navigate("/profile/orderHistory");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='bg-zinc-900 px-12 h-screen py-8'>
      <Helmet>
        <title>Корзина | Книжный магазин</title>
        <meta name="description" content="Ваши товары в корзине" />
      </Helmet>

      {!Cart ? (
        <div className='w-full h-[100%] flex items-center justify-center'>
          <Loader/>
        </div>
      ) : Cart.length === 0 ? (
        <div className='h-screen'>
          <div className='h-[100%] flex items-center justify-center flex-col'>
            <h1 className='text-5xl lg:text-6xl font-semibold text-zinc-400'>
              Пустая Корзина
            </h1>
          </div>
        </div>
      ) : (
        <>
          <h1 className='text-5xl lg:text-6xl font-semibold text-zinc-400 mb-8'>
            Ваша Корзина
          </h1>
          
          <section aria-label="Список товаров в корзине">
            {Cart.map((items, i) => (
              <article 
                key={i}
                className='w-full my-4 rounded flex flex-col md:flex-row p-4 bg-zinc-800 justify-between items-center'
              >
                <img 
                  src={items.url} 
                  alt={`Обложка книги ${items.title}`}
                  className='h-[20vh] md:h-[10vh] object-cover' 
                />

                <div className='w-full md:w-auto'>
                  <h2 className='text-2xl text-zinc-100 font-semibold text-start mt-2 md:mt-0'>
                    {items.title}
                  </h2>
                  <p className='text-normal text-zinc-300 mt-2'>
                    {items.desc.slice(0, window.innerWidth < 768 ? 65 : 100)}...
                  </p>
                </div>

                <div className='flex mt-4 w-full md:w-auto items-center justify-between'>
                  <p className='text-zinc-100 text-3xl font-semibold flex'> 
                    {items.price} ₽ 
                  </p>
                  <button 
                    className='bg-red-100 text-red-700 border border-red-700 rounded p-2 ms-12'
                    onClick={() => deletItem(items._id)}
                    aria-label={`Удалить ${items.title} из корзины`}
                  >
                    <AiFillDelete />
                  </button>
                </div>
              </article>
            ))}
          </section>

          <div className='mt-4 w-full flex items-center justify-end'>
            <div className="p-4 bg-zinc-800 rounded">
              <h2 className="text-3xl text-zinc-200 font-semibold">
                Итого:
              </h2>
              <div className='mt-3 flex items-center justify-between text-xl text-zinc-200'>
                <p>
                  {Cart.length} {Cart.length === 1 ? 'книга':'книги'}
                </p>
                <p>{Total} ₽</p>
              </div>
              <div className='w-[100%] mt-3'>
                <button 
                  className='bg-zinc-100 rounded px-4 py-2 flex justify-center w-full font-semibold hover:bg-zinc-500'
                  onClick={PlaceOrder}
                  aria-label="Оформить заказ"
                >
                  К оформлению
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Cart;