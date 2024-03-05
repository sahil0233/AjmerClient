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

    function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ display: "block", color:"black" }}
      onClick={onClick}
    />
  );
}

function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", color: "black" }}
      onClick={onClick}
    />
  );
}

    const settings = {
        infinte: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />
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
    const imgPaths = [
        "/src/assets/categoryFruits.svg",
        "/src/assets/categoryPackagedFood.svg",
        "/src/assets/categoryGrocery.svg",
        "/src/assets/categoryPersonalCare.svg",
        "/src/assets/categoryBaby.svg"

    ]

  return (
        <Slider {...settings}>
            {categories && categories.map((c,i) => (
                <div className=' flex items-center justify-center border py-2 text-black rounded-xl cursor-pointer' onClick={() => { navigate(`/category/${c.name}-aesc-${c.displayName}`)}}>
                    <img className='h-16 w-auto mx-auto' src={imgPaths[i]} />
                    <div className='flex justify-center items-center p-4'>
                        <p>{c.displayName}</p>
                    </div>
                </div>
            ))}
        </Slider>
  )
}

export default CategorySlider
