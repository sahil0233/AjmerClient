import React, { useEffect, useState } from 'react';
import { firestore } from '../firebase/FirebaseConfig';
import { doc,documentId, getDoc,query,where,collection, getDocs, addDoc, arrayUnion, updateDoc } from 'firebase/firestore';

const CartItem = (props) => {

    const [product, setProduct] = useState();

    useEffect(() => {
        getProductDetails();
    },[])

    const getProductDetails = async() => {

    const productRef = doc(firestore, 'products', props.productId);
    const prod = await getDoc(productRef);
    setProduct(prod.data());
}

  return (
        <div>
            {product && 
            <div className="justify-between items-center mb-6 rounded-lg border p-6 sm:flex sm:justify-start">
                <img src={product.image} alt="product-image" className="w-full rounded-lg sm:w-40" />
                <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                    <div className="mt-5 sm:mt-0">
                    <h2 className="text-xl font-normal text-gray-900">{product.title} :45</h2>
                    <p className="mt-1 text-xl text-gray-700">Variant: <span className=' text-2xl text-black font-medium'>45 gm</span></p>
                    </div>
                    <h2 className='text-2xl text-black font-medium flex justify-center items-center'>Rs. 149</h2>
                    <h2 className='text-2xl text-green-600 font-medium flex justify-center items-center'>Rs. 21</h2>
                    <div className="mt-4 flex justify-between items-center sm:space-y-6 sm:mt-0 sm:space-x-6">
                    <div className="flex items-center border-gray-100">
                        <span className="cursor-pointer rounded-l bg-yellow-400 py-1 px-3.5 duration-100 hover:bg-yellow-200"> - </span>
                        <span className="h-8 w-8 border bg-white text-center text-black text-xs outline-none py-2">2</span>
                        <span className="cursor-pointer rounded-r bg-yellow-400 py-1 px-3 duration-100 hover:bg-yellow-200"> + </span>
                    </div>
                    </div>
                    <div className='flex justify-center items-center'>
                       <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.274 5.453a.62.62 0 0 0-.632.631v5.706a.62.62 0 0 0 .632.631.68.68 0 0 0 .631-.631V6.083a.68.68 0 0 0-.631-.631zM9.726 5.453a.68.68 0 0 0-.631.631v5.706a.68.68 0 0 0 .631.631.62.62 0 0 0 .632-.631V6.083a.62.62 0 0 0-.632-.631z" fill="#373737"></path><path fillRule="evenodd" clipRule="evenodd" d="M15.179 2.337h-3.642v-.61A1.69 1.69 0 0 0 9.853.041H6.147a1.69 1.69 0 0 0-1.684 1.684v.61H.821a.62.62 0 0 0-.632.632c-.02.337.253.611.59.632H1.937l.674 10.358c.042.884.778 1.6 1.684 1.579h7.41a1.655 1.655 0 0 0 1.684-1.58L14.063 3.6h1.116c.337.021.61-.253.631-.59v-.042a.62.62 0 0 0-.631-.631zm-9.453-.61c0-.232.19-.422.421-.422h3.706c.231 0 .42.19.42.421v.61H5.727v-.61zm6 12.547a.4.4 0 0 0 .4-.4L12.78 3.6H3.221l.653 10.274v.02c.02.232.21.4.42.38H11.727z" fill="#373737"></path></svg>
	
                    </div>
                </div>
            </div>
            }
            </div>
  )
}

export default CartItem
