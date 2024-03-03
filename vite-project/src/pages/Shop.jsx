import React from 'react'
import Navbar from '../components/Navbar'
import Item from '../components/Item'
import Sidebar from '../components/Sidebar'


const Shop = () => {
  return (
    <div>
        <Navbar />
        <div className='flex flex-col mt-36 md:mt-20'>
            <Sidebar />
        </div>
      
    </div>
  )
}

export default Shop
