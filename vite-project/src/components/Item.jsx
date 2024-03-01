import { collection, doc, getDoc, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { firestore } from '../firebase/FirebaseConfig';


const Item = (props) => {
    
    const [variant, setVariant ] = useState();
    const [price, setPrice ] = useState();
    const [discounted_price, setDiscounted_price ] = useState();

    useEffect(() => {
        getVariationData();
    },[]);

    const getVariationData = async() => {
        const docRef = doc(firestore, "variations", props.variationId);
        const docSnap = await getDoc(docRef);
        if(docSnap.exists()){
            setVariant(docSnap.data().variants[0]);
            setPrice(docSnap.data().price[0]);
            setDiscounted_price(docSnap.data().discounted_price[0]);
        }
    }

  return (
    
    <div className="w-full bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
    {variant &&
        <Link to={`/product/${props.id}`}>
            <img src={props.image}
                    alt="Product" className="h-64 w-72 object-cover rounded-t-xl" />
            <div className="px-4 py-3">
                <span className="text-gray-400 mr-3 uppercase text-xs">{props.brand}</span>
                <p className="text-lg font-bold text-black truncate block capitalize">{props.product}</p>
                <div className="flex items-center">
                    <p className="text-lg font-semibold text-black cursor-auto my-3">₹{discounted_price}</p>
                    <del>
                        <p className="text-sm text-gray-600 cursor-auto ml-2">₹{price}</p>
                    </del>
                    <div className="ml-auto"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                            fill="currentColor" className="bi bi-bag-plus" viewBox="0 0 16 16">
                            <path fillRule="evenodd"
                                d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z" />
                            <path
                                d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                        </svg>
                    </div>
                </div>
            </div>
        </Link>
    }
    </div>
  )
}

export default Item
