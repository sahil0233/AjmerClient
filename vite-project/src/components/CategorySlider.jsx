import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { firestore } from '../firebase/FirebaseConfig';
import { BackspaceIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useNavigate } from 'react-router-dom';

const categories = [{
  name : "creamssc2",
  displayName : 'Creams'
},{
  name : 'soapssc2',
  displayName : 'Soaps'
},{
  name : 'shampoossc2',
  displayName : 'Shampoos'
}
]
const CategorySlider = () => {

    const navigate = useNavigate();

    const slider = React.useRef(null);

    const settings = {
        dots : false,
        infinte: true,
        speed: 500,
        arrows : false,
        slidesToShow: 5,
        slidesToScroll: 1,
        responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          dots : false,
        infinte: true,
        speed: 500,
        arrows : false,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 3
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      }
    ]
    };
    const imgPaths = [
        "https://firebasestorage.googleapis.com/v0/b/ajmerstore-7d3af.appspot.com/o/assets%2FcategoryFruits.svg?alt=media&token=6ad904b8-3664-46df-a4df-816d531d16fd",
        "https://firebasestorage.googleapis.com/v0/b/ajmerstore-7d3af.appspot.com/o/assets%2FcategoryPackagedFood.svg?alt=media&token=ab77e307-d18e-4e02-b485-a93efac38b0b",
        "https://firebasestorage.googleapis.com/v0/b/ajmerstore-7d3af.appspot.com/o/assets%2FcategoryGrocery.svg?alt=media&token=a3e31d80-9c35-45d8-b153-b74d3ea4ab30"
    ]

  return (
    <div className='w-full py-1 sm:py-4'>
        
          <ChevronLeftIcon className='absolute left-1 top-1/2 transform -translate-y-1/2 h-5 md:h-7 cursor-pointer' onClick={() => slider?.current?.slickPrev()} />
          <ChevronRightIcon className='absolute right-1 top-1/2 transform -translate-y-1/2 h-5 md:h-7 cursor-pointer' onClick={() => slider?.current?.slickNext()} />
        <Slider ref={slider} {...settings}>
          
            {categories && categories.map((c,i) => (
                <div key={i} className=' flex items-center justify-center text-black' >
                    <img className=' h-14 md:h-24 lg:h-28 mx-auto  border rounded-xl p-4 cursor-pointer' src={imgPaths[i]} onClick={() => { navigate(`/category/${c.name}-aesc-${c.displayName}`)}} />
                        <p className='flex justify-center items-center text-xs md:text-sm font-medium text-center cursor-pointer' onClick={() => { navigate(`/category/${c.name}-aesc-${c.displayName}`)}}>{c.displayName}</p>
                    
                </div>
            ))}
        </Slider>
        </div>
  )
}

export default CategorySlider
