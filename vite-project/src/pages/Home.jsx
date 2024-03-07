import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import CategorySlider from '../components/CategorySlider';
import { Carousel } from 'flowbite-react';
import FooterComponent from '../components/FooterComponent';

const Home = () => {

    

  return (
    <div className='bg-gray-100'>

        <Navbar />
        <div className="max-w-11/12 mt-32 md:mt-[69px] h-20 lg:h-60 xl:h-80 2xl:h-[500px]">
          <Carousel indicators={false} leftControl=" " rightControl=" ">
            <img  src="https://www.dmart.in/_next/image?url=https%3A%2F%2Fcdn.dmart.in%2Fimages%2Frwd%2Fbanners%2Fhmpg%2F1mar24-crsl-dgr-ds.jpg&w=3840&q=75" alt="..." />
            <img src="https://www.dmart.in/_next/image?url=https%3A%2F%2Fcdn.dmart.in%2Fimages%2Frwd%2Fbanners%2Fhmpg%2F2024-dgr-03-dg.jpg&w=3840&q=75" alt="..." />
            <img src="https://www.dmart.in/_next/image?url=https%3A%2F%2Fcdn.dmart.in%2Fimages%2Frwd%2Fbanners%2Fhmpg%2F6june22-crsl-delivery-dgr1.jpg&w=3840&q=75" alt="..." />
            <img src="https://www.dmart.in/_next/image?url=https%3A%2F%2Fcdn.dmart.in%2Fimages%2Frwd%2Fbanners%2Fhmpg%2F1mar24-crsl-dgr-skincare.jpg&w=3840&q=75" alt="..." />
          </Carousel>
        </div>
        <div className='relative mt-40 bg-white mt-8 md:mt-12 lg:mt-20 border-2 rounded-md py-2 px-4 w-11/12 mx-auto'>
        <CategorySlider />
        </div>

        <div className='mt-4 sm:mt-6 w-11/12 mx-auto p-1 sm:p-2 md:p-6 border-2 rounded-md bg-white'>
        <img src='https://cdn.dmart.in/images/rwd/banners/curated/1mar24-curated-dgr-de.jpg' />
        </div>

        <div className='mt-4 sm:mt-6 w-11/12 mx-auto p-1 sm:p-2 md:p-6 border-2 rounded-md bg-white mb-4 md:mb-10'>
        <img src='https://cdn.dmart.in/images/rwd/banners/curated/1jan24-curated-dgr-bmh.jpg' />
        </div>
        
        <FooterComponent />
    </div>
  )
}

export default Home
