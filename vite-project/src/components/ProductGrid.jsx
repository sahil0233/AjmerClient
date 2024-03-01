import React,{useEffect, useState} from 'react';
import Item from './Item';
import { firestore } from '../firebase/FirebaseConfig';
import { getDocs, collection, query,  where } from 'firebase/firestore';

const ProductGrid = (props) => {
  console.log(props.selectedCategory)

    const [products, setProducts] = useState([]);

    useEffect(() =>  {
    getAllProducts(props.selectedCategory);
},[props.selectedCategory]);

const getAllSubcategories = async (categoryName) => {
  // Array to store subcategories
  let subcategories = [categoryName];

  // Function to fetch subcategories recursively
  const fetchSubcategories = async (parent) => {
    const categoriesRef = collection(firestore,"categories");
    const q = query(categoriesRef, where("parent","==",parent));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      const categoryData = doc.data();
      const categoryName = categoryData.name;
      subcategories.push(categoryName);

      // Recursively fetch subcategories
      fetchSubcategories(categoryName);
    });
  };

  // Start fetching subcategories recursively
  await fetchSubcategories(categoryName);

  return subcategories;
};

const getAllProducts = async(categoryName) => {
  let subcategories = await getAllSubcategories(categoryName);
  if(subcategories.length>0){
  const prodRef = collection(firestore,"products");
  const q = query(prodRef, where("category","in",subcategories));
  const querySnapshot = await getDocs(q);
  const newData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setProducts(newData);
  }
  

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
