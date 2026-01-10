import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from "../assets/invoease.jpg";
import '@fortawesome/fontawesome-free/css/all.min.css';

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const location = useLocation();

    const dropdownRef = useRef(null);
    const notificationsRef = useRef(null);

    const handleClickOutside = (e) => {
        if (menuRef.current && !menuRef.current.contains(e.target)) setIsMenuOpen(false);
        if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setIsDropdownOpen(false);
        if (notificationsRef.current && !notificationsRef.current.contains(e.target)) setIsNotificationsOpen(false);
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const getNavLinkClass = (path) => {
        return location.pathname === path ? "bg-blue-600 font-bold text-white" : "text-gray-300 hover:text-white transition";
    };

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <header className="bg-gray-900 text-white flex justify-between items-center h-20 px-6 shadow-lg transition-all">
            <Link to="/">
                <img className="h-14 lg:h-16" src={logo} alt="Logo" />
            </Link>

            <nav className="hidden lg:flex space-x-6 bg-gray-800 py-2 px-4 rounded-lg shadow">
                <Link to="/home" className={`px-4 py-2 rounded-md ${getNavLinkClass("/home")}`}>Home</Link>
                <Link to="/about" className={`px-4 py-2 rounded-md ${getNavLinkClass("/about")}`}>About</Link>
                <Link to="/contact" className={`px-4 py-2 rounded-md ${getNavLinkClass("/contact")}`}>Contact</Link>
            </nav>

            <div className="flex items-center space-x-4">
                <Link to="/register" className="hidden lg:block bg-blue-600 px-5 py-2 rounded-lg hover:bg-blue-700 transition">Register</Link>
                <Link to="/login" className="hidden lg:block bg-blue-600 px-5 py-2 rounded-lg hover:bg-blue-700 transition">Login</Link>

                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="cursor-pointer lg:hidden text-2xl text-white focus:outline-none">
                    <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
                </button>
            </div>

            {isMenuOpen && (
                <div onClick={toggleMenu} className="lg:hidden fixed top-0 left-0 w-full h-full bg-gray-900 opacity-80 z-40">
                    <div ref={menuRef} className="bg-gray-800 text-white text-center py-6 px-8 rounded-lg shadow-xl">
                        <Link to="/home" className={`block py-2 text-lg font-semibold ${getNavLinkClass("/home")}`} onClick={toggleMenu}>Home</Link>
                        <Link to="/about" className={`block py-2 text-lg font-semibold ${getNavLinkClass("/about")}`} onClick={toggleMenu}>About</Link>
                        <Link to="/contact" className={`block py-2 text-lg font-semibold ${getNavLinkClass("/contact")}`} onClick={toggleMenu}>Contact</Link>
                        <Link to="/register" className={`block py-2 text-lg font-semibold ${getNavLinkClass("/register")}`} onClick={toggleMenu}>Register</Link>
                        <Link to="/login" className={`block py-2 text-lg font-semibold ${getNavLinkClass("/login")}`} onClick={toggleMenu}>Login</Link>
                    </div>
                </div>
            )}
        </header>
    );
}

export default Header;

