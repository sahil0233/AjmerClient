import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { collection, doc, getDocs, query, where,getDoc } from 'firebase/firestore';
import { firestore } from '../firebase/FirebaseConfig';
import CartItem from '../components/CartItem';
import CartTotal from '../components/CartTotal';

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
        setCartItems({id: querySnapshot.docs[0].id ,...querySnapshot.docs[0].data()});

    }

  return (
    <div className="h-screen pt-28">
        <Navbar />
        {cartItems && cartItems.product.length>0 ?
        <div className="mx-auto w-11/12 max-w-screen-2xl justify-between px-6 md:flex md:space-x-6 xl:px-0">
        <div className="rounded-lg md:w-2/3">
            <h1 className="mb-10 flex items-center gap-2"><span className='text-md font-bold'>My Cart</span><span className='text-md text-gray-600 mr-2'>({cartItems.quantities.reduce((accumulator, currentValue) => accumulator + currentValue, 0)}item(s))</span><span className='h-[1px] flex-grow bg-gray-600'></span></h1>

            {cartItems.product.map((id,index) => (
                <div key={id}>
                <CartItem cartId={cartItems.id} productId={id} variant={cartItems.variants[index]} price={cartItems.prices[index]} discounted_price={cartItems.discounted_prices[index]} quantity ={cartItems.quantities[index]} index = {index} />
                </div>
            ))}
            
            <button className='text-red-600 w-full text-right'>Remove all</button>
        </div>
        {/* <!-- Sub total --> */}
        <CartTotal cartItems = {cartItems} />
        </div>
        : <div>Cart is Empty</div>}   
    </div>
  )
}

export default cart
