import { useContext, useEffect, useRef, useState } from "react";
import { FaBars, FaFacebook, FaInstagram, FaLanguage, FaMapPin, FaMoon, FaSun, FaTimes, FaTwitter, FaUser, FaYoutube } from "react-icons/fa";
import { Link, Outlet } from "react-router-dom";
import ScrollToTop from "../../services/Hooks/ScrollToTop";
import { AuthContext } from "./AuthContext";

const Layout = () => {
    const [darkmode, setDarkmode] = useState(false);
    const [isLanguageDropDownOpen, setIsLanguageDropDownOpen] = useState(false);
    const [language, setLanguage] = useState('en');
    const dropdownRef = useRef(null);
    const [showSidebar, setShowSidebar] = useState(false);
    const { auth } = useContext(AuthContext);
    const [ isProfileDropDownOpen, setIsProfileDropDownOpen ] = useState(false);

    console.log(auth);

    const toggleDropdown = () => setIsLanguageDropDownOpen((prev) => !prev);

    const toggleProfileDropdown = () => setIsProfileDropDownOpen((prev) => !prev);;

    const changeLanguage = (lang) => {
        setLanguage(lang);
        setIsLanguageDropDownOpen(false);
        localStorage.setItem('lang', lang);
    };

    const handleClickOutside = (event) => {
    if (!event.target.closest('.dropdown-container')) {
      setIsProfileDropDownOpen(false);
    }
    };

    // Add event listener for outside clicks
    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
        document.removeEventListener('click', handleClickOutside);
        };
    }, []);

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
    <ScrollToTop />
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
            <Link to={'/about us'} className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0">About us</Link>
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
            {auth.isAuthenticated ? (
                <div className="relative dropdown-container">
                <button onClick={toggleProfileDropdown}>
                    <FaUser className="text-3xl border-2 rounded-full p-1 border-light-primary" />
                </button>

                {/* Dropdown Menu */}
                {isProfileDropDownOpen && (
                    <div className="absolute -right-10 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                    <ul className="py-1">
                        <li>
                        <Link
                            to={`/${auth.user.valid.user.roles[0].name}/${auth.user.valid.user.id}/profile`}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => setIsProfileDropDownOpen(false)} // Close dropdown on click
                        >
                            Profile
                        </Link>
                        </li>
                        <li>
                        <Link
                            to={`/${auth.user.valid.user.roles[0].name}/${auth.user.valid.user.id}/notifications`}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => setIsProfileDropDownOpen(false)}
                        >
                            Notifications
                        </Link>
                        </li>
                        <li>
                        <Link
                            to="/logout"
                            className="block border-t-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => setIsProfileDropDownOpen(false)}
                        >
                            Logout
                        </Link>
                        </li>
                    </ul>
                    </div>
                )}
                </div>
            ) : (
            <>
                <Link
                    to={'/login'}
                    className="text-gray-700 border-2 border-gray-700 rounded-md px-4 py-1.5 hover:border-blue-700 hover:text-blue-700 transition duration-200 font-medium"
                >
                    Log in
                </Link>
                <Link
                    to={'/userSelection'}
                    className="bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition duration-200 font-medium"
                >
                    Sign up
                </Link>
            </>
            )}
            </div>
            <button
                className="block md:hidden text-light-secondary2 dark:text-gray-200 mr-4 hover:text-light-primary hover:dark:text-dark-primary transition-colors duration-500"
                onClick={(e) => {
                e.stopPropagation();
                setShowSidebar(true);
                }}
            >
                <FaBars size={22} />
            </button>
        </div>
    </nav>
        {/* navbar */}
    <div
    className={`fixed z-50 left-0 top-0 w-64 h-full bg-light-background dark:bg-dark-background shadow-lg transform transition-transform duration-500 ${
    showSidebar ? "translate-x-0" : "-translate-x-full"
    }`}
    onClick={(e) => e.stopPropagation()}
    >
        <div className="flex justify-between items-center p-4 border-b-2 border-light-secondary dark:border-dark-secondary">
        <h2 className="text-xl font-Montserrat text-light-text dark:text-dark-text">Menu</h2>
        <button
            onClick={() => setShowSidebar(false)}
            className="text-light-text dark:text-dark-text hover:text-light-primary dark:hover:text-dark-primary transition-colors duration-700"
        >
            <FaTimes size={22} />
        </button>
        </div>
        <ul className="mt-4 space-y-4 px-4">
        <li>
            <a
                href={`/`}
                className="block py-2 px-4 font-Montserrat text-light-text dark:text-dark-text hover:bg-light-secondary dark:hover:bg-dark-secondary rounded-md transition-colors"
                onClick={() => setShowSidebar(false)}
            >
                Home
            </a>
            </li>
        {["Products", "Projects", "Categories", "About Us"].map((item) => (
            <li key={item}>
            <a
                href={`/${item}`}
                className="block py-2 px-4 font-Montserrat text-light-text dark:text-dark-text hover:bg-light-secondary dark:hover:bg-dark-secondary rounded-md transition-colors"
                onClick={() => setShowSidebar(false)}
            >
                {item}
            </a>
            </li>
        ))}
        </ul>
    </div>



    <main className="pt-16 min-h-screen">
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
