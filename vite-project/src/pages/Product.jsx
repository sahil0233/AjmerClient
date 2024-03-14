import React from 'react';
import { useState,Fragment, useEffect } from 'react';
import { RadioGroup, Tab } from '@headlessui/react';
import { CheckIcon, TrashIcon } from '@heroicons/react/20/solid'
import Navbar from '../components/Navbar';
import CategoryBanner from '../components/CategoryBanner';
import { firestore } from '../firebase/FirebaseConfig';
import { doc,documentId, getDoc,query,where,collection, getDocs, addDoc, arrayUnion, updateDoc, increment, deleteDoc } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { cartTotalAtom } from '../store/atoms/totalCartQuantity';
const Product = (props) => {

  const [product, setProduct] = useState();
  const [activeImage, setActiveImage] = useState();
  const [variations, setVariations] = useState([]);
  const [selectedVariant, setSelectedVariant ] = useState();
  const [quantity, setQuantity] = useState(0); 
  const [cartTotal, setCartTotal] = useRecoilState(cartTotalAtom);

  const { id } = useParams();

  useEffect(() => {
        getProductDetails();
    },[])

const getProductDetails = async() => {
    const productRef = doc(firestore, 'products', id);
    const prod = await getDoc(productRef);
    setProduct(prod.data());
    setActiveImage(prod.data().image);
    getVariationData()
}
const getVariationData = async() => {
        const docRef = collection(firestore, "products",id,"variations");
        const docSnap = await getDocs(docRef);
        const newData = docSnap.docs.map(doc => ({ variationId: doc.id, ...doc.data() }));

            setVariations(newData);
            console.log(newData[0]);
            setSelectedVariant(newData[0]);
            // console.log(newData[0].variationId)
            getQuantity(newData[0].variationId);
    }

const getQuantity = async(variationid) => {
        console.log(variationid);
        console.log(id);
        const cartRef = collection(firestore, 'carts');
            const q = query(cartRef, where("userId", "==", localStorage.getItem('userId')));
            const querySnapshot = await getDocs(q);
            const currdoc = querySnapshot.docs[0];
            const itemsCollection = collection(firestore,"carts",currdoc.id,"items");
            const itemq = query(itemsCollection,where("productId","==",id),where("variantId","==",variationid))
            const docSnap = await getDocs(itemq);
            if(docSnap.docs[0]){
            setQuantity(docSnap.docs[0].data().quantity);}
            else{
                setQuantity(0);
            }


    }

    const handleVariantChange = (v) => {
    // Example: Update price based on the selected variant
        let i = -1;
        for(let j =0;j< variations.length ;j++){
        if(variations[j].name === v){
            i=j;
            break;
        }
        }
        setSelectedVariant(variations[i]);
        console.log(variations[i].variationId)
        getQuantity(variations[i].variationId);
    };

const addToCart = async() => {
        try {
        const cartRef = collection(firestore, 'carts');
        if(localStorage.getItem('userId')){
            const q = query(cartRef, where("userId", "==", localStorage.getItem('userId')));
            const querySnapshot = await getDocs(q);
            if(querySnapshot.empty){

                        const docRef = await addDoc(cartRef,{
                            userId : localStorage.getItem('userId')
                        })

                        const itemsCollection = collection(firestore,"carts",docRef.id,"items");
                        const itemRef = await addDoc(itemsCollection, {
                            productId : id,
                            variantId : selectedVariant.variationId,
                            quantity: 1,
                            productImage : product.image,
                            productTitle : product.title,
                            price : selectedVariant.price,
                            discountPrice : selectedVariant.discountPrice,
                            variantName : selectedVariant.name,
                            productBrand : product.brand

                        })

            }
            else {
                console.log(querySnapshot.docs[0])
                const currdoc = querySnapshot.docs[0];
                console.log(currdoc.id);
                const existingItemsCollection = collection(firestore, 'carts', currdoc.id, "items");
                const itemRef = await addDoc(existingItemsCollection, {
                            productId : id,
                            variantId : selectedVariant.variationId,
                            quantity: 1,
                            productImage : product.image,
                            productTitle : product.title,
                            price : selectedVariant.price,
                            discountPrice : selectedVariant.discountPrice,
                            variantName : selectedVariant.name,
                            productBrand : product.brand

                        })
                } 
                setQuantity(1); 
                setCartTotal(cartTotal+1);
        
        }else {
            alert("Sign in first");
        }
        }catch(err){
            console.error(err)
        }
    }

    const deleteCartItem = async() => {
        try {
        const cartRef = collection(firestore, 'carts');
            const q = query(cartRef, where("userId", "==", localStorage.getItem('userId')));
            const querySnapshot = await getDocs(q);
            console.log();
            const currdoc = querySnapshot.docs[0];
            const itemsCollection = collection(firestore,"carts",currdoc.id,"items");
            console.log(currdoc.id)
            const itemq = query(itemsCollection,where("productId","==",id),where("variantId","==",selectedVariant.variationId))
            const itemDoc = await getDocs(itemq);
            console.log(itemDoc.docs[0].id);
            const docDel = doc(firestore,"carts", currdoc.id, "items", itemDoc.docs[0].id)
                await deleteDoc(docDel)
                setCartTotal(cartTotal-quantity);
                setQuantity(0);
        }catch(err){
            console.error(err)
        }

    }

    const decreaseQuantity = async() => {
        try {
            const cartRef = collection(firestore, 'carts');
            const q = query(cartRef, where("userId", "==", localStorage.getItem('userId')));
            const querySnapshot = await getDocs(q);
            const currdoc = querySnapshot.docs[0];
            const itemsCollection = collection(firestore,"carts",currdoc.id,"items");
            const itemq = query(itemsCollection,where("productId","==",id),where("variantId","==",selectedVariant.variationId))
            const docSnap = await getDocs(itemq);
            const itemDoc = doc(firestore,"carts",currdoc.id,"items",docSnap.docs[0].id)
            await updateDoc(itemDoc, {
                quantity : increment(-1)
            })
            setQuantity(quantity-1) 
            setCartTotal(cartTotal-1);
        }catch(err){
            console.error(err);
        }

    }

    const increaseQuantity = async() => {
        try {
            const cartRef = collection(firestore, 'carts');
            const q = query(cartRef, where("userId", "==", localStorage.getItem('userId')));
            const querySnapshot = await getDocs(q);
            const currdoc = querySnapshot.docs[0];
            const itemsCollection = collection(firestore,"carts",currdoc.id,"items");
            const itemq = query(itemsCollection,where("productId","==",id),where("variantId","==",selectedVariant.variationId))
            const docSnap = await getDocs(itemq);
            const itemDoc = doc(firestore,"carts",currdoc.id,"items",docSnap.docs[0].id)
            await updateDoc(itemDoc, {
                quantity : increment(1)
            }) 
            setQuantity(quantity+1)
            setCartTotal(cartTotal+1);
        }catch(err) {
            console.error(err)
        }

    }

  function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


  return (
    <div className='pt-20'>
      <Navbar />
      {product && <>
        <div className="mt-24">
      {/* <!-- Breadcrumbs --> */}
        {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 text-gray-400 text-sm">
            <a href="#" className="hover:underline hover:text-gray-600">Drink</a>
            <span>
              <svg className="h-5 w-5 leading-none text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </span>
            <a href="#" className="hover:underline hover:text-gray-600">Coffee</a>
          </div>
        </div> */}
  {/* <!-- ./ Breadcrumbs --> */}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            {selectedVariant &&
            <div className="md:flex-1 px-4">
              <h2 className="mb-2 leading-tight tracking-tight font-bold text-gray-800 text-2xl md:text-3xl">{product.title}: <span className='text-md font-normal'>{selectedVariant.name}</span></h2>
              <p className="text-gray-500 text-sm">By <a href="#" className="text-indigo-600 hover:underline">{product.brand}</a></p>

              <RadioGroup value={selectedVariant} onChange={handleVariantChange} className="py-8 border-b">
                    <RadioGroup.Label>Variant</RadioGroup.Label>
                    <div className='flex gap-2'>
                    {variations.map((variation) => (
                      <RadioGroup.Option
                        key={variation.name}
                        value={variation.name}
                        data-headlessui-state={selectedVariant.name === variation.name ? 'active checked': ""}
                        className="mt-4 border rounded-md border-gray-400 w-28 p-4 text-center ui-active:border-blue-400 ui-active:bg-white ui-not-active:bg-gray-200"
                      >
                        {variation.name}
                      </RadioGroup.Option>
                    ))}
                    </div>
              </RadioGroup>


              <div className="flex flex-col py-8 space-y-4 border-b">
                <div className='flex gap-12'>
                  <p className='text-md h-10 leading-10'>MRP <span className='line-through'>₹{localStorage.getItem("userId")!=null?selectedVariant.price:""}</span></p>
                  <p className='text-md h-10 leading-10'>Dmart <span className='font-bold text-2xl'>₹{localStorage.getItem("userId")!=null?selectedVariant.discountPrice:""}</span></p>
                
                </div>
                <div className='flex justify-between'>
                  <p className='flex justify-center items-center h-12 px-4 bg-blue-200 text-blue-800 text-center'>SAVE {localStorage.getItem("userId")!=null? selectedVariant.price - selectedVariant.discountPrice :""}</p>
                  {quantity == 0 ?
                  <button type="button" className="h-12 px-6 py-2 font-semibold rounded-xl bg-blue-500 hover:bg-blue-400 text-white" onClick={addToCart}>
                    Add to Cart
                  </button>
                  :
                  <div className='flex flex-col items-center justify-center gap-2'>
                  <div className="flex items-center border-gray-100">
                    <button className={`${quantity==1 ? "block": "hidden"} h-8 cursor-pointer rounded-l bg-blue-500 py-1 px-3.5 duration-100 hover:bg-blue-300`} onClick={deleteCartItem}> <TrashIcon className='text-white w-auto h-4'/> </button>
                    <button className={`${quantity>1 ? "block": "hidden"} text-white cursor-pointer rounded-l bg-blue-500 py-1 px-3.5 duration-100 hover:bg-blue-300`} onClick={decreaseQuantity}> - </button>
                    <span className="h-8 w-8 border bg-white text-center text-black text-xs outline-none py-2">{quantity}</span>
                    <button disabled={quantity== 3} className={`${quantity>=3? "bg-gray-400 cursor-default":" bg-blue-500 hover:bg-blue-300" } h-8 text-white text-xl rounded-r  px-3 duration-100`} onClick={increaseQuantity}> + </button>
                  </div>
                    {quantity >= 3 &&
                            <span className="w-full text-gray-400 text-xs font-normal text-center">Add more from Cart</span>
                        }
                  </div>
                  }
                </div>
              </div>
            </div>
            }
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

