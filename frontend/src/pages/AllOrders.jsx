import axios from 'axios';
import React, { useEffect, useState } from 'react';
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

  if (allOrders.length === 0) {
    return (
      <div className="h-[80vh] p-4 text-zinc-100">
        <div className="h-[100%] flex flex-col items-center justify-center">
          <h1 className="text-5xl font-semibold text-white mb-8">
            Нет заказов
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[100%] p-0 md:p-4 text-zinc-100">
      <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
        История заказов
      </h1>
      <div className="mt-4 bg-zinc-800 w-full rounded py-2 px-4 flex gap-2">
        <div className="w-[3%]">
          <h1 className="text-center">№</h1>
        </div>
        <div className="w-[22%]">
          <h1>Книга</h1>
        </div>
        <div className="w-[30%]">
          <h1>Описание</h1>
        </div>
        <div className="w-[10%]">
          <h1>Цена</h1>
        </div>
        <div className="w-[15%]">
          <h1>Статус</h1>
        </div>
        <div className="w-[15%]">
          <h1>Пользователь</h1>
        </div>
        
      </div>

      {allOrders.map((order, index) => (
        <div
          key={order._id}
          className="bg-zinc-800 w-full rounded py-2 px-4 gap-4 hover:bg-zinc-900 hover:cursor-pointer flex items-center"
        >
          <div className="w-[3%]">
            <h1 className="text-center">{index + 1}</h1>
          </div>

          <div className="w-[22%]">
            <Link
              to={`/view-book-details/${order.book._id}`}
              className="hover:text-blue-300"
            >
              {order.book.title}
            </Link>
          </div>

          <div className="w-[30%]">
            <h1>{order.book.desc?.slice(0, 50)}...</h1>
          </div>

          <div className="w-[10%]">
            <h1>{order.book.price} руб</h1>
          </div>

          <div className="w-[15%]">
            <h1
              className={`font-semibold ${
                order.status === 'Успешно'
                  ? 'text-green-500'
                  : order.status === 'Canceled'
                  ? 'text-red-500'
                  : 'text-green-500'
              }`}
            >
              {order.status}
            </h1>
          </div>

          <div className="w-[20%]">
            <h1>{order.user?.name || order.user?.email || 'Неизвестно'}</h1>
          </div>

          
        </div>
      ))}
    </div>
  );
};

export default AllOrders;