import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const Hero = () => {
  return (
    <section className='md:h-[80vh] flex flex-col md:flex-row items-center justify-center'>
      <Helmet>
        <title>Главная | Книжный магазин</title>
        <meta 
          name="description" 
          content="Книги, которые меняют взгляд на мир. Начните свое путешествие уже сегодня с нашей коллекцией лучших произведений." 
        />
      </Helmet>

      <div className='w-full mb-12 md:mb-0 lg:w-3/6 flex flex-col items-center lg:items-start justify-center'>
        <h1 className='text-4xl lg:text-6xl font-semibold text-white lg:text-left text-center'>
          Книги, которые меняют взгляд на мир
        </h1>

        <p className='mt-4 text-xl text-zinc-300 text-center lg:text-left'>
          Каждая книга — это новое приключение. Начните свое путешествие уже сегодня с нашей коллекцией лучших произведений.
        </p>

        <div className='mt-8'>
          <Link 
            to="all-books" 
            className='text-white text-xl lg:text-2xl rounded-full font-semibold border border-white-100 px-10 py-2 hover:bg-zinc-800'
            aria-label="Открыть каталог книг"
          >
            Открыть каталог
          </Link>
        </div>
      </div>
      
      <div className='w-full lg:w-3/6 mt-5'>
        <img 
          src="./hero.png" 
          alt="Коллекция книг в книжном магазине" 
          loading="lazy"
        />
      </div>
    </section>
  );
};

export default Hero;