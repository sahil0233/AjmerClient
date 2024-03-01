import React from 'react'
import Navbar from '../components/Navbar'
import Item from '../components/Item'
import Sidebar from '../components/Sidebar'


const Shop = () => {
  return (
    <div>
        <Navbar />
        <div className='flex flex-col mt-20'>
            <Sidebar />
        </div>
      
    </div>
  )
}

export default Shop
