import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { collection, doc, getDocs, query, where } from 'firebase/firestore';
import { firestore } from '../firebase/FirebaseConfig';
import CartItem from '../components/CartItem';

const cart = () => {
    const userId = localStorage.getItem("userId");
    const [cartItems, setCartItems ] = useState();

    useEffect(() => {
        getCartItems();
    },[])

    const getCartItems = async() => {
        const q = query(collection(firestore, "carts"), where("userId", "==",userId));
        const querySnapshot = await getDocs(q);
        console.log(querySnapshot.docs[0].data());
        setCartItems(querySnapshot.docs[0].data())

    }

  return (
    <div className="h-screen pt-28">
        <Navbar />

        <div className="mx-auto w-11/12 max-w-screen-2xl justify-between px-6 md:flex md:space-x-6 xl:px-0">
        <div className="rounded-lg md:w-2/3">
            <h1 className="mb-10 flex items-center gap-2"><span className='text-md font-bold'>My Cart</span><span className='text-md mr-2'>(2 item(s))</span><span className='h-[1px] flex-grow bg-black'></span></h1>
            {cartItems && cartItems.product.map((id) => (
                <CartItem productId={id} />
            ))}
            
            <button className='text-red-600 w-full text-right'>Remove all</button>
        </div>
        {/* <!-- Sub total --> */}
        <div className="mt-6 h-full   md:mt-0 md:w-1/4">
            <div className="border bg-white rounded-sm shadow-md">
                <div className='w-full py-4 pl-2 border-b'>
                    <h1 className='font-medium text-md'>Price Summary</h1>
                </div>
                <div className="py-4 w-11/12 mx-auto flex border-b justify-between">
                <p className="text-gray-700">Cart Total</p>
                <p className="text-gray-700">$129.99</p>
                </div>
                <div className="py-4 w-11/12 mx-auto flex border-b justify-between">
                <p className="text-gray-700">Delivery Charge</p>
                <p className="text-red-700">+ Extra</p>
                </div>
                <div className="py-4 w-11/12 mx-auto flex justify-between">
                    <p className="text-gray-700">Savings</p>
                    <p className="text-green-700">$4.99</p>
                </div>
                
            </div>
            <button className="mt-6 w-full rounded-md bg-yellow-400 py-2 font-medium text-blue-50 hover:bg-yellow-600">PROCEED TO CHECKOUT</button>
        </div>
        </div>
    </div>
  )
}

export default cart
