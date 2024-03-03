import React, { useEffect } from 'react';
import { useState } from 'react';
import CategoryListItem from './CategoryListItem';
import RegisterModal from './RegisterModal';
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import SideCart from './SideCart';
import { collection, getDocs, query , where} from 'firebase/firestore';
import { firestore } from '../firebase/FirebaseConfig';
import { useNavigate } from 'react-router-dom';
import { getAuth,signOut } from 'firebase/auth';

const Navbar = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [searchIterm, setSearchIterm] = useState("");

    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getCategories();
    },[])

    const auth = getAuth();
    const logOut = () => {

        signOut(auth).then(() => {
            localStorage.removeItem("userId")
            localStorage.removeItem("token")
            window.location.reload();
            
        }).catch((error) => {
        // An error happened.
        });
    }

    const getCategories = async() => {
        let catObj = [];
        const categoriesRef = collection(firestore,"categories");
        const q = query(categoriesRef, where("parent","==",null));
        const querySnapshot = await getDocs(q);

        await Promise.all(querySnapshot.docs.map(async (doc) => {
            const data = doc.data();
            const subcategories = [];

            const q2 = query(categoriesRef, where("parent", "==", data.name));
            const subcategorySnapshot = await getDocs(q2);
            subcategorySnapshot.forEach((doc) => {
                const subcategoryData = doc.data();
                subcategories.push(subcategoryData.name);
            });

            catObj.push({
                name: data.name,
                subcategories: subcategories
            });
        }));
        setCategories(catObj);
    }

    const toggleMenu = () => {
      setIsOpen(!isOpen);
    };

    const [modal, setModal] = useState(false);
    const [open, setOpen] = useState(false);

  return (
    <div className='flex flex-col border-b shadow-md fixed bg-white top-0 w-full z-10'>
        <nav className="relative px-4 py-4 flex lg:flex-row flex-row-reverse justify-between items-center bg-white">
            <a className="text-3xl font-bold leading-none cursor-pointer" onClick={() => {navigate("/")}}>
                <img className='h-8 w-auto' src='/src/assets/martlogo.jpeg' />
            </a>
            <div className='flex justify-center items-center'>
            <div className="lg:hidden">
                <button className="navbar-burger flex items-center text-blue-600 p-3" onClick={toggleMenu}>
                    <svg className="block h-4 w-4 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <title>Mobile menu</title>
                        <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
                    </svg>
                </button>
            </div>
            <ul className={`hidden lg:inline-flex absolute top-3/4 left-1/2 transform -translate-y-1/2 -translate-x-1/2 lg:flex lg:mx-auto lg:flex lg:items-center lg:w-auto lg:space-x-6`}>
                <li className="mb-3 md:w-96">
                    <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                        <input
                        type="search"
                        className="relative m-0 -mr-0.5 block min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-gray-200 bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-black dark:placeholder:text-gray-400 dark:focus:border-primary"
                        placeholder="Apko kya chahiye?"
                        aria-label="Search"
                        aria-describedby="button-addon1"
                        value={searchIterm}
                        onChange={(e) => {setSearchIterm(e.target.value)}} />
                        <button
                        className="relative z-[2] flex items-center rounded-r bg-yellow-400 px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg"
                        type="button"
                        id="button-addon1"
                        data-te-ripple-init
                        data-te-ripple-color="light"
                         onClick={() => {navigate(`/search?searchItem=${searchIterm}`)}}
                         >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="h-5 w-5"
                            >
                            <path
                            fillRule="evenodd"
                            d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                            clipRule="evenodd" />
                        </svg>
                        </button>
                    </div>
                </li>
            </ul>
            {localStorage.getItem("userId") ==null ? 
            <button className="hidden lg:inline-block lg:ml-auto lg:mr-3 py-2 px-6 bg-gray-50 text-sm text-gray-900 font-bold hover:underline" onClick={() =>{setModal(true)}}>Sign In/Register</button>
            : <button className="hidden lg:inline-block lg:ml-auto lg:mr-3 py-2 px-6 bg-gray-50 text-sm text-gray-900 font-bold hover:underline" onClick={logOut}>Logout</button>}
            <ShoppingCartIcon className="h-6 w-6 text-gray-500 cursor-pointer" onClick={() => {navigate("/cart")}}/>
            </div>
            {/* onClick={() => setOpen(true)} */}
            {/* <SideCart open={open} setOpen={setOpen}/> */}

        </nav>
        <div className="lg:hidden mb-3 px-2 w-full self-center">
            <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                <input
                type="search"
                className="relative m-0 -mr-0.5 block min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-gray-200 bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-black dark:placeholder:text-gray-400 dark:focus:border-primary"
                placeholder="Apko kya chahiye?"
                aria-label="Search"
                aria-describedby="button-addon1" 
                value={searchIterm}
                onChange={(e) => {setSearchIterm(e.target.value)}}
                />
                <button
                className="relative z-[2] flex items-center rounded-r bg-yellow-400 px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg"
                type="button"
                id="button-addon1"
                data-te-ripple-init
                data-te-ripple-color="light"
                onClick={() => {navigate(`/search?searchItem=${searchIterm}`)}}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-5 w-5">
                    <path
                    fillRule="evenodd"
                    d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                    clipRule="evenodd" />
                </svg>
                </button>
            </div>
        </div>
        <div className={`lg:hidden navbar-menu relative z-50 ${isOpen? "": "hidden"}`}>
            <div className="navbar-backdrop fixed inset-0 bg-gray-800 opacity-25" onClick={toggleMenu}></div>
            <nav className="fixed top-0 left-0 bottom-0 flex flex-col w-5/6 max-w-sm py-6 px-6 bg-white border-r overflow-y-auto">
                <div className="flex items-center mb-8">
                    <button className="navbar-close" onClick={toggleMenu}>
                        <svg className="h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
                <div>
                    <ul className='gap-4'>
                        {categories && categories.map((category,idx) => (
                        <li className="py-4 border-b border-gray-200" key={idx}>
                            <CategoryListItem categoryName ={category.name} subCategories = {category.subcategories} />
                        </li>
                    ))}
                    </ul>
                </div>
                <div className="mt-auto">
                    <div className="pt-6 flex justify-center items-center">
                        {localStorage.getItem("userId") ==null ? 
                        <button className= "w-full py-2 px-6 bg-gray-50 text-sm text-gray-900 font-bold hover:underline" onClick={() =>{setModal(true)}}>Sign In/Register</button>
                        : <button className="w-full py-2 px-6 bg-gray-50 text-sm text-gray-900 font-bold hover:underline" onClick={logOut}>Logout</button>}
                    </div>
                    <p className="my-4 text-xs text-center text-gray-400">
                        <span>Copyright © 2021</span>
                    </p>
                </div>
            </nav>
        </div>
        <RegisterModal setModal = {setModal} modal={modal} />
        
    </div>
  )
}

export default Navbar
