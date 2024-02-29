import React,{useEffect, useState} from 'react';
import Item from './Item';
import { firestore } from '../firebase/FirebaseConfig';
import { getDocs, collection, query, getDoc } from 'firebase/firestore';

const ProductGrid = () => {

    const [products, setProducts] = useState([]);

    useEffect(() =>  {
    getAllProducts();
},[]);

const getAllProducts = async() => {
    const querySnapshot = await getDocs(collection(firestore, "products"));
    querySnapshot.forEach((doc) => {
    const newData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setProducts(newData);
});



}
  return (
    <section className=" auto-cols-auto col-span-5 w-fit mx-auto grid grid-cols-1 xl:grid-cols-4 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-4 mt-10 mb-5">
                {products.map((item,index) => (
                      <Item key={index} title={item.title} image={item.image} brand={item.brand} product={item.product} price={item.price} discounted_price={item.discounted_price} id={item.id} variationId={item.variationId} />
                  ))}
    </section>
  )
}

export default ProductGrid
