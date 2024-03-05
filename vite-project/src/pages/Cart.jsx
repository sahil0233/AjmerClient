import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { collection, doc, getDocs, query, where,getDoc } from 'firebase/firestore';
import { firestore } from '../firebase/FirebaseConfig';
import CartTotal from '../components/CartTotal';
import CartItem from '../components/CartItem';
import { useNavigate } from 'react-router-dom';
const cart = () => {

    
    const userId = localStorage.getItem("userId");
    const [cartItems, setCartItems ] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        getCartItems();
    },[])

    const getCartItems = async() => {
        const q = query(collection(firestore, "carts"), where("userId", "==",userId));
        const querySnapshot = await getDocs(q);
        if(!querySnapshot.empty){
                const currdoc = querySnapshot.docs[0];
                const existingItemsCollection = collection(firestore, 'carts', currdoc.id, "items");
                const docSnap = await getDocs(existingItemsCollection);
                let allItems =[];
                if(!docSnap.empty){
                    docSnap.forEach((doc) => {
                    allItems.push({id: doc.id ,...doc.data()});
                    })
                    setCartItems(allItems);
                }
        }

    }



  const updateCart = (index,quantity) => {

    setCartItems(prevCartItems => {
        const updatedCartItems = [...prevCartItems]; // Create a shallow copy of the cartItems array
        updatedCartItems[index] = { ...updatedCartItems[index], quantity: quantity }; // Update the quantity of the specific item
        return updatedCartItems; // Set the updated array as the new state
    });

  }

  const deletedCartItem = (index) => {
    setCartItems(prevCartItems => {
        const updatedCartItems = prevCartItems.filter((item, currentIndex) => currentIndex !== index);
        return updatedCartItems;
    });
  }

    

  return (
    <div className="h-screen pt-28">
        <Navbar />
        {cartItems && cartItems.length>0 ?
        <div className="mx-auto w-11/12 max-w-screen-2xl justify-between px-6 md:flex md:space-x-6 xl:px-0">
        <div className='w-3/5'>
        <h1 className="mb-10 flex items-center gap-2"><span className='text-md font-bold'>My Cart</span><span className='text-md text-gray-600 mr-2'>({cartItems.reduce((total, currentItem) => {return total + parseInt(currentItem.quantity)},0)} item(s))</span><span className='h-[1px] flex-grow bg-gray-600'></span></h1>
        <div className='grid grid-cols-8 w-full mx-4 mb-4 text-gray-500 font-medium'>
        <p className='col-span-4'>Product</p>
        <p className='col-span-1 text-center'>You Pay</p>
        <p className='col-span-1 text-center'>You Save</p>
        <p className='col-span-1 text-center'>No. of items</p>
        <p className='col-span-1'></p>
        </div>
        {cartItems.map((product,index) =>(
            <div className="flex flex-col rounded-lg md:w-full" key={index}>
                <CartItem product={product} index={index} updateCart={updateCart} deletedCartItem={deletedCartItem}/>
                
                {/* <button className='text-red-600 w-full text-right'>Remove all</button> */}
            </div>
        ))}
        </div>
        {/* <!-- Sub total --> */}
        <CartTotal cartItems = {cartItems} />
        </div>
        : <div className='mx-auto w-11/12 max-w-screen-2xl flex flex-col items-center justify-center gap-4'>
            <svg width="256px" height="256px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M21 5L19 12H7.37671M20 16H8L6 3H3M11 3L13.5 5.5M13.5 5.5L16 8M13.5 5.5L16 3M13.5 5.5L11 8M9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20ZM20 20C20 20.5523 19.5523 21 19 21C18.4477 21 18 20.5523 18 20C18 19.4477 18.4477 19 19 19C19.5523 19 20 19.4477 20 20Z" stroke="#317ad8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
            <h1 className='text-2xl font-medium'>No items in your cart</h1>
            <p className='text-gray-500 font-normal'>Browse from our wide variety of products & exciting offers</p>
            <button className='w-36 rounded-lg text-white py-4 bg-blue-500 hover:bg-blue-400' onClick={() => {navigate("/")}}>Start Shopping</button>
          </div>}   
    </div>
  )
}

export default cart
