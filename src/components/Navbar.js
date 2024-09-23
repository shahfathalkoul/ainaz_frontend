import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const {loginState, setLoginState} = useAuth()
    const navigate = useNavigate()
    // const { isAuthenticated, login, logout } = useAuth();
    function handleit()   {
        navigate("/SignUp")
    }
    const handleLogout = () =>{
        setLoginState(false)
    }
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    const handlecart = () => {
        if (loginState){
        navigate("/cart")
        } else {
        alert("You are not logged in !")
            navigate("/SignUp")
        }
    }

    return (
        <nav className="bg-white text-black p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-lg font-bold"><Link to={"/"}><button className='cursor-pointer'>Ai<span className='text-red-500'>NaZ</span></button></Link>
                </div>
                <div className="hidden md:flex items-center space-x-6">
                    {/* <a href="/" >Sale</a>
                    <a href="/" >New<span className='text-red-500'>Arrivals</span></a>
                    <a href="/">Contact</a>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search Products..."
                            className="px-10 py-1 rounded  bg-black text-white focus:outline-none " */}
                        {/* /> */}
                        {/* <button className="absolute right-0 top-0 mt-1 mr-1 text-black"> */}
                            {/* {if doesnt work paste svg} */}
                            {/* Sign In
                        </button> */}
                    {/* </div> */}
                    {/* <button className="bg-black hover:bg-red-500 text-white  py-2 px-4 rounded flex items-center"> */}
                    {/* {if doesnt work paste svg} */}

                        {/* Wishlist
                    </button> */}
                    <button onClick={handlecart} className="bg-black hover:bg-red-500 text-white  py-2 px-4 rounded flex items-center">
                    
                {/* {if doesnt work paste svg} */}

                        Cart
                    </button>
                    {/* <Link to={"/SignUp"}><button className="bg-black hover:bg-red-500 text-white  py-2 px-4 rounded">Sign In</button></Link> */}
                    {!loginState ? 
                        <button onClick={handleit} className="bg-black hover:bg-red-500 text-white  py-2 px-4 rounded">Sign In</button>
                        :
                        <button onClick={handleLogout} className="bg-black hover:bg-red-500 text-white  py-2 px-4 rounded">Sign out</button>
                    }
                </div>
                <div className="md:hidden">
                    <button onClick={toggleMenu} className="focus:outline-none">
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    </button>
                </div>
            </div>
            {isOpen && (
                <div className="md:hidden">
                    <div className="flex flex-col space-y-2">
                        
                    {!loginState ?  <button onClick={handleit} className="block w-full text-left px-4 py-2  bg-black  text-white font-bold rounded">
                        Sign In
                        </button>
                        :
                        <button  onClick={handleLogout} className="block w-full text-left px-4 py-2  bg-black  text-white font-bold rounded">
                        Sign Out
                        </button>}
                        {/* <button className="block w-full text-left px-4 py-2 bg-black  text-white font-bold rounded">
                            Wishlist
                        </button> */}
                        <button onClick={handlecart}  className="block w-full text-left px-4 py-2 bg-black  text-white font-bold rounded">
                            Cart
                        </button>
                    </div>
                    <a href="/Sale" className="hover:bg-white block px-4 py-2 ">Sale</a>
                    <a href="/NewArivals" className="hover:bg-white block px-4 py-2 ">New Arrivals</a>
                    <a href="/Contact" className="hover:bg-white block px-4 py-2 ">Contact</a>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
