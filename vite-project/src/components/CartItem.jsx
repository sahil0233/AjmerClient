import React, { useEffect, useState } from 'react';
import { firestore } from '../firebase/FirebaseConfig';
import { doc,documentId, getDoc,query,where,collection, getDocs, addDoc, arrayUnion,arrayRemove, updateDoc } from 'firebase/firestore';
import { TrashIcon } from '@heroicons/react/24/outline';

const CartItem = (props) => {

    const [product, setProduct] = useState();

    const [quantity, setQuantity] = useState(parseInt(props.quantity));

    useEffect(() => {
        getProductDetails();
    },[quantity])

    const getProductDetails = async() => {

    const productRef = doc(firestore, 'products', props.productId);
    const prod = await getDoc(productRef);
    setProduct(prod.data());
    }

    const deleteCartItem = async () => {
        try {
            const docRef = doc(firestore, "carts", props.cartId);

            const docSnap = await getDoc(docRef);
            if(docSnap.exists()){
                const currentValue = docSnap.data()["quantities"];
                const priceArray = docSnap.data().prices;
                const discounted_priceArray = docSnap.data().discounted_prices;
                const variantArray = docSnap.data().variants;
                const productArray = docSnap.data().product;
                console.log(productArray)
                console.log(currentValue[0])

                 if (currentValue && props.index >= 0 && props.index < currentValue.length) {
                        await updateDoc(docRef, { prices: arrayRemove(priceArray[props.index]),discounted_prices:arrayRemove(discounted_priceArray[props.index]), quantities : arrayRemove(currentValue[props.index]), variants : arrayRemove(variantArray[props.index]), product : arrayRemove(productArray[props.index])});
                
                console.log('Array field updated successfully');
            } else {
                console.error('Invalid index or field name');
            }
            } else {
                console.log("document does not exisits");
            }
            setQuantity(parseInt(quantity)-1);
        }catch(err) {
            console.error(err);
        }
    }

    const decreaseQuantity = async() => {
        try {
            const docRef = doc(firestore, "carts", props.cartId);

            const docSnap = await getDoc(docRef);
            if(docSnap.exists()){
                const currentValue = docSnap.data()["quantities"];
                const priceArray = docSnap.data().prices;
                const discounted_priceArray = docSnap.data().discounted_prices;
                const variantArray = docSnap.data().variants;
                const productArray = docSnap.data().product;
                console.log(productArray)
                console.log(currentValue[0])

                 if (currentValue && props.index >= 0 && props.index < currentValue.length) {
                    if(currentValue[props.index] == 1){

                        // const updateddiscounted_priceArray = arrayRemove(discounted_priceArray, discounted_priceArray[props.index]);
                        // const updatedProductArray = arrayRemove(productArray, productArray[props.index]);
                        // const updatedVariantArray = arrayRemove(variantArray, variantArray[props.index]);
                        await updateDoc(docRef, { prices: arrayRemove(priceArray[props.index]),discounted_prices:arrayRemove(discounted_priceArray[props.index]), quantities : arrayRemove(currentValue[props.index]), variants : arrayRemove(variantArray[props.index]), product : arrayRemove(productArray[props.index])});

                    }else{
                        currentValue[props.index] = currentValue[props.index]-1;
                
                        // Update the document with the modified array
                        await updateDoc(docRef, { ["quantities"]: currentValue });
                    }
                
                console.log('Array field updated successfully');
            } else {
                console.error('Invalid index or field name');
            }
            } else {
                console.log("document does not exisits");
            }
            setQuantity(parseInt(quantity)-1);
        }catch(err) {
            console.error(err);
        }
    }

    const increaseQuantity = async () => {
        try {
            const docRef = doc(firestore, "carts", props.cartId);

            const docSnap = await getDoc(docRef);
            if(docSnap.exists()){
                const currentValue = docSnap.data()["quantities"];
                 if (currentValue && props.index >= 0 && props.index < currentValue.length) {
                        currentValue[props.index] = currentValue[props.index]+1;
                
                        // Update the document with the modified array
                        await updateDoc(docRef, { ["quantities"]: currentValue });
                
                console.log('Array field updated successfully');
            } else {
                console.error('Invalid index or field name');
            }
            } else {
                console.log("document does not exisits");
            }
            setQuantity(parseInt(quantity)+1);
        }catch(err) {
            console.error(err);
        }
    }

  return (
        <div key={props.id}>
            {product && 
            <div className="h-32 justify-between items-center mb-6 rounded-lg border px-2 sm:flex sm:justify-start">
                <img src={product.image} alt="product-image" className="box-border h-full p-2 rounded-lg sm:w-40" />
                <div className=" sm:mx-4 sm:flex sm:w-full sm:justify-between">
                    <div className="mt-5 sm:mt-0 flex flex-col justify-center">
                    <h2 className="text-xl font-normal text-black">{product.title} : {props.variant}</h2>
                    <p className="mt-1 text-xl text-gray-600">Variant: <span className=' text-xl text-black font-medium'>{props.variant}</span></p>
                    </div>
                    <h2 className='text-xl text-black font-medium flex justify-center items-center'>₹{props.discounted_price}</h2>
                    <h2 className='text-xl text-green-600 font-medium flex justify-center items-center'>₹{props.price- props.discounted_price}</h2>
                    <div className="mt-4 flex flex-col  justify-center items-center sm:mt-0">
                    <div className="flex items-center border-gray-100">
                        <button className={`${quantity==1 ? "block": "hidden"} cursor-pointer rounded-l bg-yellow-400 py-1 px-3.5 duration-100 hover:bg-yellow-200`} onClick={decreaseQuantity}> <TrashIcon className='w-4 h-6'/> </button>
                        <button className={`${quantity>1 ? "block": "hidden"} cursor-pointer rounded-l bg-yellow-400 py-1 px-3.5 duration-100 hover:bg-yellow-200`} onClick={decreaseQuantity}> - </button>
                        <span className="h-8 w-8 border bg-white text-center text-black text-xs outline-none py-2">{quantity}</span>
                        <button disabled={quantity== 3} className={`${quantity>=3? "bg-gray-400 cursor-default":" bg-yellow-400 hover:bg-yellow-200" } rounded-r  py-1 px-3 duration-100`} onClick={increaseQuantity}> + </button>
                    </div>
                        {quantity >= 3 &&
                            <span className="text-gray-400 text-xs font-normal">Max 3 items</span>
                        }
                    </div>
                    <div className='flex justify-center items-center cursor-pointer' onClick={deleteCartItem}>
                       <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.274 5.453a.62.62 0 0 0-.632.631v5.706a.62.62 0 0 0 .632.631.68.68 0 0 0 .631-.631V6.083a.68.68 0 0 0-.631-.631zM9.726 5.453a.68.68 0 0 0-.631.631v5.706a.68.68 0 0 0 .631.631.62.62 0 0 0 .632-.631V6.083a.62.62 0 0 0-.632-.631z" fill="#373737"></path><path fillRule="evenodd" clipRule="evenodd" d="M15.179 2.337h-3.642v-.61A1.69 1.69 0 0 0 9.853.041H6.147a1.69 1.69 0 0 0-1.684 1.684v.61H.821a.62.62 0 0 0-.632.632c-.02.337.253.611.59.632H1.937l.674 10.358c.042.884.778 1.6 1.684 1.579h7.41a1.655 1.655 0 0 0 1.684-1.58L14.063 3.6h1.116c.337.021.61-.253.631-.59v-.042a.62.62 0 0 0-.631-.631zm-9.453-.61c0-.232.19-.422.421-.422h3.706c.231 0 .42.19.42.421v.61H5.727v-.61zm6 12.547a.4.4 0 0 0 .4-.4L12.78 3.6H3.221l.653 10.274v.02c.02.232.21.4.42.38H11.727z" fill="#373737"></path></svg>
	
                    </div>
                </div>
            </div>
            }
            </div>
  )
}

export default CartItem
