import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from "../../assets/invoease.jpg";
import '@fortawesome/fontawesome-free/css/all.min.css';
import axios from "axios";

function HeaderDashboard() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const [showAllNotifications, setShowAllNotifications] = useState(false);
    const [notifications, setNotifications] = useState([]);

    const menuRef = useRef(null);
    const dropdownRef = useRef(null);
    const notificationsRef = useRef(null);
    const location = useLocation();

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
    const toggleNotifications = () => setIsNotificationsOpen(!isNotificationsOpen);

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

    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            await axios.post("/api/v1/user/logout", {}, { withCredentials: true });
            window.location.href = "/"; // Redirect to homepage

        } catch (error) {
            console.error("Logout failed:", error);
        }
    }

    const clearNotifications = async () => {
        try {
            await axios.delete("/api/v1/user/delete-notifications", { withCredentials: true });
            setNotifications([]);
        } catch (error) {
            console.error("Failed to clear notifications:", error);
        }
    };


    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await axios.get("/api/v1/user/get-notifications", { withCredentials: true });
                console.log(response.data)
                setNotifications(response.data.data); // Assuming `data.data` holds notifications
            } catch (error) {
                console.error("Error fetching notifications:", error);
            }
        };

        fetchNotifications();

        // const interval = setInterval(fetchNotifications, 5000);
        // return () => clearInterval(interval);
    }, []);

    return (
        <header className="bg-gray-900 text-white flex justify-between items-center h-20 px-6 shadow-xl transition-all">
            {/* Logo */}
            <div className="flex items-center">
                <Link to="/">
                    <img className="h-16 lg:h-17" src={logo} alt="Logo" />
                </Link>
            </div>

            <nav className="hidden lg:flex space-x-6 bg-gray-800 py-2 px-4 rounded-lg shadow">
                <Link to="/invoice" className={`px-4 py-2 rounded-md ${getNavLinkClass("/invoice")}`}>Invoice</Link>
                <Link to="/history" className={`px-4 py-2 rounded-md ${getNavLinkClass("/history")}`}>History</Link>
                <Link to="/payment" className={`px-4 py-2 rounded-md ${getNavLinkClass("/payment")}`}>Payment</Link>
            </nav>

            {/* Controls */}
            <div className="flex items-center space-x-4">

                {/* Icons Section */}
                <div className="flex items-center space-x-4">

                    {/* 🔔 Notification Bell with Dropdown */}
                    <div className="relative" ref={notificationsRef}>
                        <i className="fas fa-bell text-xl cursor-pointer" onClick={toggleNotifications}></i>
                        {notifications.length > 0 && < span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>}

                        {isNotificationsOpen && (
                            <div className="bg-gray-800 absolute right-0 mt-2 w-64 text-white rounded-lg shadow-lg z-50">
                                <div className="p-4 font-semibold border-b flex justify-between">

                                    {(notifications.length == 0) ? <span className='text-red-500'>No Notifications</span> : (
                                        <>
                                            <span>Notifications</span>
                                            <button onClick={clearNotifications} className="text-sm text-red-500">Clear</button>
                                        </>
                                    )
                                    }


                                </div>
                                {(showAllNotifications ? notifications : notifications.slice(0, 3)).map((notification, index) => (
                                    <div key={index} className="p-3 text-sm hover:bg-gray-700 cursor-pointer">
                                        {notification.icon} {notification.alertText}
                                    </div>
                                ))}
                                {notifications.length > 3 && (
                                    <div className="p-3 text-center text-blue-500 hover:bg-gray-100 cursor-pointer" onClick={() => setShowAllNotifications(!showAllNotifications)}>
                                        {showAllNotifications ? "Show Less" : "View All"}
                                    </div>
                                )}
                            </div>
                        )}

                    </div>

                    {/* 🌙 Dark Mode Toggle */}


                    {/* 👤 User Icon with Dropdown */}
                    <div className="relative" ref={dropdownRef}>
                        <i className="fas fa-user-circle text-3xl cursor-pointer" onClick={toggleDropdown}></i>
                        {isDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-gray-800 text-white rounded-lg shadow-lg z-50">

                                <Link to="/contact" className="block px-4 py-2 hover:bg-gray-700">Customer Support</Link>
                                <Link to="/logout" onClick={handleLogout} className="block px-4 py-2 hover:bg-gray-700">Logout</Link>
                            </div>
                        )}
                    </div>
                </div>

                {/* 🍔 Mobile Hamburger Menu */}
                <button onClick={toggleMenu} aria-label={isMenuOpen ? "Close menu" : "Open menu"} className="lg:hidden cursor-pointer text-2xl transition-all duration-300">
                    <i className={`fas ${isMenuOpen ? 'fa-times transform rotate-90' : 'fa-bars'} text-white`}></i>
                </button>
            </div>

            {/* 📱 Mobile Menu */}
            {
                isMenuOpen && (
                    <div onClick={toggleMenu} className="lg:hidden fixed top-0 left-0 w-full h-full bg-gray-900 opacity-80 z-40">
                        <div ref={menuRef} className="bg-gray-800 text-white text-center py-6 px-8 rounded-lg shadow-xl">
                            <Link to="/invoice" className={`block py-2 text-lg font-semibold ${getNavLinkClass("/invoice")}`} onClick={toggleMenu}>Invoice</Link>
                            <Link to="/history" className={`block py-2 text-lg font-semibold ${getNavLinkClass("/history")}`} onClick={toggleMenu}>History</Link>
                            <Link to="/payment" className={`block py-2 text-lg font-semibold ${getNavLinkClass("/payment")}`} onClick={toggleMenu}>Payment</Link>
                        </div>
                    </div>
                )
            }
        </header >
    );
}

export default HeaderDashboard;
