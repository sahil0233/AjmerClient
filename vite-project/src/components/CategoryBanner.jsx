import { Bars3Icon } from '@heroicons/react/24/outline'
import React from 'react'

const CategoryBanner = () => {
  return (
    <div className='hidden w-full fixed top-[69px] z-10 bg-white h-12 md:grid gap-6 grid-cols-5 border-t shadow-md'>
    <div className='ml-4 h-full col-span-1 flex items-center gap-2 border-r'>
        <Bars3Icon className='w-5' />
        <p className='text-md font-normal text-gray-600'>All Categories</p>
    </div>
    <ul className='col-span-4 flex items-center gap-8 text-black text-md font-normal'>
    <li>Value Packs</li>
    <li>Fashion</li>
    <li>Beauty</li>
    </ul>
    </div>
  )
}

export default CategoryBanner
