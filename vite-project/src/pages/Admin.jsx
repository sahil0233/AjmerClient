import React, { useState } from 'react';
import AddProduct from '../components/AddProduct';
import ModifyProduct from '../components/ModifyProduct';
import { PlusIcon, PlusCircleIcon, ArrowPathIcon } from '@heroicons/react/20/solid';
import AddCategory from '../components/AddCategory';


const Admin = () => {

    const [activeComponent, setActiveComponent] = useState("add");

    const renderComponent = () => {
        switch(activeComponent){
            case 'add':
                return <AddProduct />
            case 'modify':
                return <ModifyProduct />
            case 'addCategory' :
                return <AddCategory />
        }
    }

  return (
    <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
        <div className="container max-w-screen-lg mx-auto">
            <div>
            <h2 className="font-semibold text-xl text-gray-600">Admin Dashboard</h2>
            <p className="text-gray-500 mb-6">Add/  Modify product details</p>

            <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-4">
                <div className="flex flex-col text-gray-600 bg-gray-200">
                    <button className= {`${activeComponent === 'add' ? "bg-gray-400" : ""} flex p-2`} onClick={() => setActiveComponent('add')}><PlusIcon className='w-6 h-6' /><span className='pl-1'>Add Product </span></button>
                    <button className= {`${activeComponent === 'modify' ? "bg-gray-400" : ""} flex p-2`} onClick={() => setActiveComponent('modify')}><ArrowPathIcon className='w-6 h-6' /><span className='pl-1'>Update Product </span></button>
                    <button className= {`${activeComponent === 'addCategory' ? "bg-gray-400" : ""} flex p-2`} onClick={() => setActiveComponent('addCategory')}><PlusCircleIcon className='w-6 h-6' /><span className='pl-1'>New Category </span></button>
                </div>

                <div className="lg:col-span-3">
                    {renderComponent()}
                </div>
                </div>
            </div>
            </div>
        </div>
    </div>
  )
}

export default Admin
