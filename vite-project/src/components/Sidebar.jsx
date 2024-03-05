import React, { useEffect } from 'react'
import { Fragment, useState } from 'react'
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid'
import classNames from "classnames";
import ProductGrid from "./ProductGrid"
import { Link, useNavigate, useParams } from 'react-router-dom'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { firestore } from '../firebase/FirebaseConfig'
const Sidebar = () => {

    const { category } = useParams();
    const categoryid = category.split("-aesc-")[0];
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(categoryid);
    const parentCategory = category.split("-aesc-")[1];
    const navigate = useNavigate();

    

    useEffect(() => {
      getCategories();

    },[]);

    const getCategories = async() => {
      let catObj = [];

      const categoriesRef = collection(firestore, "categories");
      const q = query(categoriesRef, where("parent", "==", categoryid));
      const querySnapshot = await getDocs(q);

// Use Promise.all to execute async operations concurrently
    await Promise.all(querySnapshot.docs.map(async (doc) => {
        const data = doc.data();
        const subcategories = [];

        const q2 = query(categoriesRef, where("parent", "==", data.name));
        const subcategorySnapshot = await getDocs(q2);
        subcategorySnapshot.forEach((doc) => {
            const subcategoryData = doc.data();
            subcategories.push(subcategoryData.displayName);
        });

        catObj.push({
            name: data.displayName,
            subcategories: subcategories
        });
    }));

    setCategories(catObj);
    }

  return (
    <div className="bg-white">
      <div>
        <main className="mx-auto w-full pr-4 sm:pr-6">
          <div className="flex items-baseline justify-between border-b border-gray-200 py-4">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 pl-4">All Categories</h1>

            
          </div>

          <section aria-labelledby="products-heading" className="pb-24">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="flex gap-x-4 gap-y-10">
              {/* Filters */}
              <div className="hidden lg:block w-72 border">
                <h3 className='border-b border-gray-200 py-2 px-4 cursor-pointer' onClick={() => {setSelectedCategory(categoryid)}}>{parentCategory}</h3>
                
                <div className='flex flex-col'>
                {categories && categories.map((category,index) => (
                  <Disclosure>
                  <div className=' flex justify-between border-b border-gray-200 px-4 py-2'>
                      <h1 className='cursor-pointer' onClick={() => {setSelectedCategory(category.name)}}>{category.name}</h1>
                      <Disclosure.Button className="">
                        +
                      </Disclosure.Button>
                    </div>
                    <Disclosure.Panel className="text-gray-500">
                    <ul className='flex flex-col gap-2 bg-gray-200 px-4'>
                      {category.subcategories.map((subcategory,idx) => (
                        <li key={idx} className='pl-2 cursor-pointer text-gray-800' onClick={() => {setSelectedCategory(subcategory)}}>{subcategory}</li>
                      ))}
                      </ul>
                    </Disclosure.Panel>
                  </Disclosure>
                ))}
                </div>
              </div>

              {/* Product grid */}
              <ProductGrid selectedCategory={selectedCategory} />
              <div className="lg:col-span-2">{/* Your content */}</div>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}

export default Sidebar
