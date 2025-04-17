import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Hero from '../components/Home/Hero';
import RecantlyAdded from '../components/Home/RecantlyAdded';

const Home = () => {
  useEffect(() => {
    window.scrollTo(0,0);
  }, []);

  return (
    <div className="bg-zinc-900 text-white px-10 py-8">
      <Helmet>
        <title>Главная | Книжный магазин</title>
        <meta name="description" content="Добро пожаловать в наш книжный интернет-магазин. Широкий выбор книг по доступным ценам." />
        <meta property="og:title" content="Книжный интернет-магазин" />
        <meta property="og:description" content="Лучшие книги по доступным ценам" />
      </Helmet>

      <main>
        <Hero/>
        <RecantlyAdded/>
      </main>
    </div>
  )
}

export default Home;