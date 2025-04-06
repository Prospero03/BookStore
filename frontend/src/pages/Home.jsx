import React, { useEffect } from 'react'
import Hero from '../components/Home/Hero'
import RecantlyAdded from '../components/Home/RecantlyAdded'

const Home = () => {

    useEffect(()=>{
      window.scrollTo(0,0);
    }, []);
  return (
    <div className="bg-zinc-900 text-white px-10 py-8 ">
        <Hero/>
        <RecantlyAdded/>
    </div>
  )
}

export default Home