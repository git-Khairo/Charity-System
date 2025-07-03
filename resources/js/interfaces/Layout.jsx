import { useEffect, useRef, useState } from "react";
import { FaFacebook, FaInstagram, FaLanguage, FaMapPin, FaMoon, FaSun, FaTwitter, FaYoutube } from "react-icons/fa";
import { Link, Outlet } from "react-router-dom";

const Layout = () => {
    const [darkmode, setDarkmode] = useState(false);
    const [isLanguageDropDownOpen, setIsLanguageDropDownOpen] = useState(false);
    const [language, setLanguage] = useState('en');
    const dropdownRef = useRef(null);

    const toggleDropdown = () => setIsLanguageDropDownOpen((prev) => !prev);

    const changeLanguage = (lang) => {
        setLanguage(lang);
        setIsLanguageDropDownOpen(false);
        localStorage.setItem('lang', lang);
    };

    useEffect(() => {
        if (darkmode) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
        } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
        }
    }, [darkmode]);

    useEffect(() => {
        function handleClickOutside(event) {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsLanguageDropDownOpen(false);
        }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleDarkmode = () => setDarkmode((prev) => !prev); 


    return ( 
    <>
    <nav className="bg-white border-gray-200 dark:bg-dark-background fixed w-full z-20">
    <div className="flex flex-wrap items-center justify-between mx-auto px-10 py-4">
        <Link to={'/'} className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap">Charity</span>
        </Link>
        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-search">
        <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white">
            <li>
            <Link to={'/'} className="block py-2 px-3 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-blue-700 md:p-0" aria-current="page">Home</Link>
            </li>
            <li>
            <Link to={'/charities'} className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0">Charities</Link>
            </li>
            <li>
            <Link to={'/campaigns'} className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0">Campaigns</Link>
            </li>
            <li>
            <Link to={''} className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0">About us</Link>
            </li>
            <li>
            <Link to={''} className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0">Contact us</Link>
            </li>
        </ul>
        </div>
        <div className="items-center space-x-7 md:order-2 hidden md:flex">
  {/* Language Dropdown (wrapped in relative) */}
  <div className="relative">
    <button
      onClick={toggleDropdown}
      className="text-gray-700 hover:text-blue-700 text-3xl transition duration-200 focus:outline-none"
      aria-label="Toggle Language"
    >
      <FaLanguage />
    </button>

    {isLanguageDropDownOpen && (
      <div className="absolute -right-10 mt-2 bg-white border border-gray-200 rounded-md shadow-lg z-50 w-28">
        <button
          onClick={() => changeLanguage('ar')}
          className={`block w-full text-center px-4 py-2 text-sm hover:bg-gray-100 ${
            language === 'ar' ? 'text-blue-600 font-semibold' : 'text-gray-700'
          }`}
        >
          AR
        </button>
        <button
          onClick={() => changeLanguage('en')}
          className={`block w-full text-center px-4 py-2 text-sm hover:bg-gray-100 ${
            language === 'en' ? 'text-blue-600 font-semibold' : 'text-gray-700'
          }`}
        >
          EN
        </button>
      </div>
    )}
        </div>

        {/* Dark mode toggle */}
        {darkmode ? (
            <FaMoon
            onClick={handleDarkmode}
            className="text-gray-600 text-xl hover:text-blue-700 cursor-pointer transition duration-200"
            />
        ) : (
            <FaSun
            onClick={handleDarkmode}
            className="text-gray-600 text-xl hover:text-yellow-500 cursor-pointer transition duration-200"
            />
        )}

        {/* Log in / Sign up */}
        <Link
            to="/login"
            className="text-gray-700 border-2 border-gray-700 rounded-md px-4 py-1.5 hover:border-blue-700 hover:text-blue-700 transition duration-200 font-medium"
        >
            Log in
        </Link>
        <Link
            to="/signup"
            className="bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition duration-200 font-medium"
        >
            Sign up
        </Link>
        </div>
    </div>
    </nav>

    <main className="pt-10">
        <Outlet/>
    </main>




    <div className="bg-gray-100 pt-10">
        <div className="w-full mx-auto px-4 sm:px-10 text-center text-gray-800 sm:grid md:grid-cols-4 sm:grid-cols-2">
        <div className="p-5">
            <h3 className="font-bold text-xl text-indigo-600 mb-5">Charity</h3>
            <h6>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</h6>
        </div>

        <div className="p-5">
            <div className="text-sm uppercase text-indigo-600 font-bold">Quick Links</div>
            <a className="my-3 block" href="/#">Home <span className="text-teal-600 text-xs p-1" /></a>
            <a className="my-3 block" href="/#">Charities <span className="text-teal-600 text-xs p-1" /></a>
            <a className="my-3 block" href="/#">Campiagns</a>
        </div>

        <div className="p-5">
            <div className="text-sm uppercase text-indigo-600 font-bold">Support</div>
            <a className="my-3 block" href="/#">Sign Up <span className="text-teal-600 text-xs p-1" /></a>
            <a className="my-3 block" href="/#">Log In <span className="text-teal-600 text-xs p-1" /></a>
            <a className="my-3 block" href="/#">Donate <span className="text-teal-600 text-xs p-1" /></a>
        </div>

        <div className="p-5">
            <div className="text-sm uppercase text-indigo-600 font-bold">Contact us</div>
            <a className="my-3 block" href="/#">ITE, Damascus, Syria<span className="text-teal-600 text-xs p-1" /></a>
            <a className="my-3 block" href="/#">info@charity.com<span className="text-teal-600 text-xs p-1" /></a>
        </div>
        </div>
    </div>

    <div className="bg-gray-100 pt-2">
        <div className="flex pb-5 px-3 m-auto pt-5 border-t text-gray-800 text-sm flex-col max-w-screen-lg items-center">
        <div className="md:flex-auto md:flex-row mt-2 flex-row flex space-x-5">
            <a href="" className="w-6 mx-1">
                <FaFacebook className="text-xl hover:text-blue-700"/>
            </a>
            <a href="" className="w-6 mx-1">
                <FaYoutube className="text-xl hover:text-blue-700"/>
            </a>
            <a href="" className="w-6 mx-1">
                <FaInstagram className="text-xl hover:text-blue-700"/>
            </a>
            <a href="" className="w-6 mx-1">
                <FaTwitter className="text-xl hover:text-blue-700"/>
            </a>
            <a href="" className="w-6 mx-1">
                <FaMapPin className="text-xl hover:text-blue-700"/>
            </a>
        </div>
        <div className="my-5">© Copyright 2025. All Rights Reserved.</div>
        </div>
    </div>
    </>
     );
}
 
export default Layout;