import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../Loader/Loader';
import { useParams } from 'react-router-dom';
import { GrLanguage } from "react-icons/gr";

const ViewBookDetails = () => {
    const { id } = useParams();
    const [Data, setData] = useState(null); // Инициализация как null
    const [loading, setLoading] = useState(true); // Состояние загрузки
    const [error, setError] = useState(null); // Состояние ошибки

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:1000/api/v1/get-book-by-id/${id}`
                );
                setData(response.data.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };
        fetchData();
    }, [id]); // Добавьте id в зависимости useEffect

    if (loading) {
        return (
            <div className="flex items-center justify-center my-8">
                <Loader />
            </div>
        );
    }
    if (error) {
        return <div className="text-red-500 text-center my-8">Ошибка: {error}</div>;
    }
    if (!Data) {
        return <div className="text-white text-center my-8">Данные не найдены</div>;
    }

    return (
        <>
            {Data &&(<div className="px-4 md:px-12 py-8 bg-zinc-900  flex flex-col md:flex-row gap-8">


            <div className="bg-zinc-800 rounded p-4 h-[60vh] lg:h-[88vh] w-full lg:w-3/6 flex  items-center justify-center">
                <img src={Data.url} alt="Обложка книги" className="h-[50vh] lg:h-[70vh] rounded" />
            </div>


            <div className="p-2 w-full lg:w-3/6">
                <h1 className='text-zinc-300 text-4xl font-semibold'>{Data.title}</h1>
                <p className='text-zinc-400 mt-1'> Автор: {Data.author} </p>
                <p className='text-zinc-500 mt-4 text-xl'> {Data.desc} </p>
                <p className='text-zinc-400 flex mt-4 items-center justify-start '><GrLanguage className='me-3'/>   {Data.language} </p>
                <p className='text-zinc-100 mt-4 text-3xl font-semibold'> Цена: {Data.price} ₽</p>
            </div>
                </div>)}
                {!Data && <div className="h-screen bg-zinc-900 flex items center justify-center"> <Loader /></div>}
        </>
    );
};

export default ViewBookDetails;