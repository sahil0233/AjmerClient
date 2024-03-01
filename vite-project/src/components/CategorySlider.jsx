import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { firestore } from '../firebase/FirebaseConfig';
import { BackspaceIcon } from '@heroicons/react/24/outline';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useNavigate } from 'react-router-dom';

const CategorySlider = () => {
    const [categories, setCategories] = useState();

    const navigate = useNavigate();

    const settings = {
        dots:true,
        infinte: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3
    };

    useEffect(() => {
        getCategories();
    },[]);

    const getCategories = async() => {
        const categoriesRef = collection(firestore, "categories");
        const q = query(categoriesRef, where("parent","==", null));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(doc => doc.data());
        console.log(data);
        setCategories(data);
    }

  return (
    <div className='w-3/4 m-auto'>
        <div className='mt-24'>
        <Slider {...settings}>
            {categories && categories.map((c) => (
                <div className='bg-blue-200 h-22 text-black rounded-xl cursor-pointer' onClick={() => { navigate(`/category/${c.name}`)}}>
                    <div className='flex justify-center items-center p-4'>
                        <p>{c.name}</p>
                    </div>
                </div>
            ))}
        </Slider>
        </div>
      
    </div>
  )
}

export default CategorySlider
