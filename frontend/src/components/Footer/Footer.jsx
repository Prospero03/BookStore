import React from 'react';
import { Helmet } from 'react-helmet';

const Footer = () => {
  return (
    <footer className='bg-zinc-800 text-white px-8 py-4'>
      <Helmet>
        <meta name="keywords" content="книги, интернет-магазин, купить книги" />
      </Helmet>
      <h2 className='text-xl font-semibold text-center'>&copy; 2025, Book Store</h2>
    </footer>
  );
};

export default Footer;