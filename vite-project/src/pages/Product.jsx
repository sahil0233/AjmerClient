import React from 'react';
import { useState,Fragment, useEffect } from 'react';
import { RadioGroup, Tab } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/20/solid'
import Navbar from '../components/Navbar';
import { firestore } from '../firebase/FirebaseConfig';
import { doc,documentId, getDoc,query,where,collection, getDocs, addDoc, arrayUnion, updateDoc } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
const Product = (props) => {

  const [product, setProduct] = useState();
  const [activeImage, setActiveImage] = useState();
  const [variations, setVariations] = useState([]);
  const [variant, setVariant ] = useState();
  const [selectedPrice, setSelectedPrice ] = useState();
  const [selectedDiscounted_price, setSelectedDiscounted_price ] = useState();
  const [price, setPrice ] = useState([]);
  const [discounted_price, setDiscounted_price ] = useState([]); 

  const { id } = useParams();

  useEffect(() => {
        getProductDetails();
    },[])

const getProductDetails = async() => {
    const productRef = doc(firestore, 'products', id);
    const prod = await getDoc(productRef);
    setProduct(prod.data());
    setActiveImage(prod.data().image);
    getVariationData(prod.data().variationId)
}
    const getVariationData = async(id) => {
        const docRef = doc(firestore, "variations", id);
        const docSnap = await getDoc(docRef);
        if(docSnap.exists()){
            setVariations(docSnap.data().variants);
            setPrice(docSnap.data().price);
            setDiscounted_price(docSnap.data().discounted_price);
            setVariant(docSnap.data().variants[0]);
            setSelectedPrice(docSnap.data().price[0]);
            setSelectedDiscounted_price(docSnap.data().discounted_price[0]);
        }
    }

    const handleVariantChange = (v) => {
    setVariant(v);
    // Example: Update price based on the selected variant
    let i = -1;
    for(let j =0;j< variations.length ;j++){
      if(variations[j] === v){
        i=j;
        break;
      }
    }
    setSelectedPrice(price[i]);
    setSelectedDiscounted_price(discounted_price[i]);
  };

const addToCart = async() => {
  const cartRef = collection(firestore, 'carts');
  if(localStorage.getItem('userId')){
    const q = query(cartRef, where("userId", "==", localStorage.getItem('userId')));
    const querySnapshot = await getDocs(q);
    if(querySnapshot.empty){

                await addDoc(cartRef,{
                    userId : localStorage.getItem('userId'),
                    product: arrayUnion(id)
                })
      }else {
        const currdoc = querySnapshot.docs[0];
        console.log(currdoc.id);
        const docRef = doc(firestore, 'carts', currdoc.id)
        await updateDoc(docRef, {
          product : arrayUnion(id)
        })
      }  
  
  }else {
    alert("Sign in first");
  }
}

  function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


  return (
    <div className='pt-20'>
      <Navbar />
      {product && <>
        <div className="py-6">
      {/* <!-- Breadcrumbs --> */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 text-gray-400 text-sm">
            <a href="#" className="hover:underline hover:text-gray-600">Drink</a>
            <span>
              <svg className="h-5 w-5 leading-none text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </span>
            <a href="#" className="hover:underline hover:text-gray-600">Coffee</a>
          </div>
        </div>
  {/* <!-- ./ Breadcrumbs --> */}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
          <div className="flex flex-col md:flex-row -mx-4">
            <div className="md:flex-1 px-4">
              <div x-data="{ image: 1 }">
                <div className="h-64 md:h-80 rounded-lg bg-gray-100 mb-4">
                  <div className="h-64 md:h-80 rounded-lg bg-gray-100 mb-4 flex items-center justify-center">
                    <img className=" border border-gray-400 object-contain w-full h-full" src={activeImage} />
                  </div>
                  </div>

                <div className="flex -mx-2 mb-4 gap-2">
                  {product.image.map((img,idx) => (
              <div key={idx} className="flex-1 px-2">
                <button
                  onClick={() => setActiveImage(img)}
                  className={`focus:outline-none rounded-lg h-24 md:h-32 bg-gray-100 flex items-center justify-center ${
                    activeImage === img ? 'ring-2 ring-indigo-300 ring-inset' : ''
                  }`}
                >
                  <img className="border border-gray-400 object-cover w-full h-full" src={img} />
                </button>
              </div>
            ))}
                </div>
              </div>
            </div>
            <div className="md:flex-1 px-4">
              <h2 className="mb-2 leading-tight tracking-tight font-bold text-gray-800 text-2xl md:text-3xl">{product.title}: <span className='text-md font-normal'>{variant}</span></h2>
              <p className="text-gray-500 text-sm">By <a href="#" className="text-indigo-600 hover:underline">{product.brand}</a></p>

              <RadioGroup value={variant} onChange={handleVariantChange} className="py-8 border-b">
                    <RadioGroup.Label>Variant</RadioGroup.Label>
                    <div className='flex gap-2'>
                    {variations.map((variation) => (
                      <RadioGroup.Option
                        key={variation}
                        value={variation}
                        data-headlessui-state={variant === variation ? 'checked': ""}
                        className="mt-4 border rounded-md border-gray-400 w-28 p-4 text-center ui-checked:border-yellow-400 ui-checked:bg-white ui-not-checked:bg-gray-200"
                      >
                        {variation}
                      </RadioGroup.Option>
                    ))}
                    </div>
              </RadioGroup>


              <div className="flex flex-col py-8 space-y-4 border-b">
                <div className='flex gap-12'>
                  <p className='text-md h-10 leading-10'>MRP <span className='line-through'>₹{selectedPrice}</span></p>
                  <p className='text-md h-10 leading-10'>Dmart <span className='font-bold text-2xl'>₹{selectedDiscounted_price}</span></p>
                
                </div>
                <div className='flex justify-between'>
                  <p className='flex justify-center items-center h-12 px-4 bg-yellow-200 text-yellow-800 text-center'>SAVE {selectedPrice-selectedDiscounted_price}</p>
                  <button type="button" className="h-12 px-6 py-2 font-semibold rounded-xl bg-yellow-400 hover:bg-yellow-200 text-white" onClick={addToCart}>
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full px-2 py-16 sm:px-0">
                <h1 className='text-2xl underline mb-4'>Description</h1>
                <p className='text-lg font-normal'>{product.description}</p>
          </div>
        </div>
      </div>
      </>}
      
    </div>
  )
}

export default Product

