import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../Loader/Loader';
import { useParams } from 'react-router-dom';
import { GrLanguage } from "react-icons/gr";
import { FaHeart } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import {useSelector} from "react-redux"
import { FaEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";

const ViewBookDetails = () => {
    
    const { id } = useParams();
    const [Data, setData] = useState(null); // Инициализация как null
    const [loading, setLoading] = useState(true); // Состояние загрузки
    const [error, setError] = useState(null); // Состояние ошибки

    const isLoggedIn = useSelector((state)=> state.auth.isLoggedIn)
    const role = useSelector((state)=> state.auth.role)
    console.log(isLoggedIn);
    console.log(role);

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
    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
        bookid: id,
    }
    const handleFavorite =  async() =>{
        const response = await axios.put("http://localhost:1000/api/v1/add-book-to-favorite", {}, {headers})
        alert(response.data.message);
    }

    const handleCart = async ()=>{
        const response = await axios.put("http://localhost:1000/api/v1/add-to-cart", {}, {headers})
        alert(response.data.message)
    }
    

    return (
        <>
            {Data &&(<div className="px-4 md:px-12 py-8 bg-zinc-900  flex flex-col lg:flex-row gap-8">


            <div className="  px-4  w-full lg:w-3/6  ">
                {" "}
                <div className='flex flex-col lg:flex-row justify-around bg-zinc-800 py-12 rounded'>
                    {" "}
                    <img    src={Data.url} 
                            alt="Обложка книги" 
                            className="h-[50vh] md:h-[60vh] lg:h-[70vh] rounded object-cover" />


                   {isLoggedIn === true && role === "user" && (
                        <div className='flex flex-col md:flex-row lg:flex-col mt-4 lg:mt-0 justify-between items-center lg:justify-start'>
                            <button className='bg-white lg:rounded-full rounded text-3xl p-3 mt-2 text-red-500 flex items-center justify-center' 
                                    onClick={handleFavorite}>
                                <FaHeart /> {" "} 
                                <span className='ms-4 block lg:hidden'>Favorite</span>
                            </button>
                            <button className='text-white lg:rounded-full rounded mt-8 lg:mt-8 md:mt-0 text-3xl p-3  bg-blue-500 flex items-center justify-center'
                            onClick={handleCart}>
                                <FaShoppingCart/> {" "} 
                                <span className='ms-4 block lg:hidden'>Add to cart</span>
                            </button>
                        </div>
                   )}

                    {isLoggedIn === true && role === "admin" && (
                        <div className='flex flex-col md:flex-row lg:flex-col mt-4 lg:mt-0 justify-between items-center lg:justify-start'>
                            <button className='bg-white lg:rounded-full rounded text-3xl p-3 mt-2  flex items-center justify-center'>
                            <FaEdit /> {" "} 
                            <span className='ms-4 block lg:hidden'>Edit Book</span>
                            </button>
                            <button className='text-red lg:rounded-full rounded text-3xl p-3 mt-8 md:mt-0 bg-white flex items-center justify-center'>
                            <MdOutlineDelete /> {" "} 
                            <span className='ms-4 block lg:hidden'>Delete Book</span>
                            </button>
                        </div>
                   )}

                </div>
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