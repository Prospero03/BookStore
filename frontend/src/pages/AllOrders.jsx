import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import Loader from '../components/Loader/Loader';
import { Link } from 'react-router-dom';

const AllOrders = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const headers = {
    authorization: `Bearer ${localStorage.getItem('token')}`,
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          'http://localhost:1000/api/v1/get-all-orders',
          { headers }
        );
        setAllOrders(response.data.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="h-[100%] flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="h-[100%] p-0 md:p-4 text-zinc-100">
      <Helmet>
        <title>История заказов | Книжный магазин</title>
        <meta name="description" content="Просмотр истории ваших заказов" />
      </Helmet>

      <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
        История заказов
      </h1>

      {allOrders.length === 0 ? (
        <div className="h-[80vh] p-4">
          <div className="h-[100%] flex flex-col items-center justify-center">
            <h2 className="text-5xl font-semibold text-white mb-8">
              Нет заказов
            </h2>
          </div>
        </div>
      ) : (
        <section aria-label="Список заказов">
          <div className="mt-4 bg-zinc-800 w-full rounded py-2 px-4 flex gap-2">
            {['№', 'Книга', 'Описание', 'Цена', 'Статус', 'Пользователь'].map((header, i) => (
              <div key={i} className={i === 0 ? "w-[3%]" : i === 1 ? "w-[22%]" : i === 2 ? "w-[30%]" : "w-[15%]"}>
                <h2>{header}</h2>
              </div>
            ))}
          </div>

          {allOrders.map((order, index) => (
            <article 
              key={order._id}
              className="bg-zinc-800 w-full rounded py-2 px-4 gap-4 hover:bg-zinc-900 hover:cursor-pointer flex items-center"
              aria-label={`Заказ №${index + 1}`}
            >
              <div className="w-[3%]">
                <p className="text-center">{index + 1}</p>
              </div>

              <div className="w-[22%]">
                <Link
                  to={`/view-book-details/${order.book._id}`}
                  className="hover:text-blue-300"
                  aria-label={`Просмотреть ${order.book.title}`}
                >
                  {order.book.title}
                </Link>
              </div>

              <div className="w-[30%]">
                <p>{order.book.desc?.slice(0, 50)}...</p>
              </div>

              <div className="w-[10%]">
                <p>{order.book.price} руб</p>
              </div>

              <div className="w-[15%]">
                <p className={`font-semibold ${
                  order.status === 'Успешно' ? 'text-green-500' :
                  order.status === 'Canceled' ? 'text-red-500' : 'text-green-500'
                }`}>
                  {order.status}
                </p>
              </div>

              <div className="w-[20%]">
                <p>{order.user?.name || order.user?.email || 'Неизвестно'}</p>
              </div>
            </article>
          ))}
        </section>
      )}
    </div>
  );
};

export default AllOrders;