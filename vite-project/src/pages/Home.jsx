import React from 'react'
import Navbar from '../components/Navbar'
import CategorySlider from '../components/CategorySlider'

const Home = () => {
  return (
    <div>
        <Navbar />
        <div className='mt-40 lg:mt-20'>
        <CategorySlider />
        </div>
    </div>
  )
}

export default Home
