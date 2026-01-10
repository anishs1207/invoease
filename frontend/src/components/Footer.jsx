import { FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { Link} from "react-router-dom";
import logo from "../assets/invoease.jpg";

function Footer2() {

    return (
        <footer className="bg-gray-900 text-white py-12 px-8">
            <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">

                <div>
                    <Link to="/">
                        <img src={logo} alt="FinTrack Logo" className="h-20 mb-4" />
                    </Link>
                    <p className="text-gray-400 text-md">
                        Smart budgeting, effortless expense tracking. Your financial companion.
                    </p>
                    <div className="flex space-x-5 mt-4">
                        <a href="https://www.instagram.com/anishsab1207" target="_blank" rel="noopener noreferrer">
                            <FaInstagram className="text-2xl hover:text-gray-400 transition duration-300" />
                        </a>
                        <a href="https://www.linkedin.com/in/anish-sabharwal-a113a9307" target="_blank" rel="noopener noreferrer">
                            <FaLinkedin className="text-2xl hover:text-gray-400 transition duration-300" />
                        </a>
                        <a href="https://www.twitter.com/anishs1207" target="_blank" rel="noopener noreferrer">
                            <FaTwitter className="text-2xl hover:text-gray-400 transition duration-300" />
                        </a>
                    </div>
                </div>

                {/* Column 2 - Product Links */}
                <div>
                    <h4 className="text-lg font-semibold mb-3">Product</h4>
                    <ul className="text-gray-300 space-y-2 text-md">
                        <li><a href="/features" className="hover:text-gray-400">Features</a></li>
                        <li><a href="/pricing" className="hover:text-gray-400">Pricing</a></li>
                        <li><a href="/docs" className="hover:text-gray-400">API Docs</a></li>
                        <li><a href="/security" className="hover:text-gray-400">Security</a></li>
                    </ul>
                </div>

                {/* Column 3 - Resources & Legal */}
                <div>
                    <h4 className="text-lg font-semibold mb-3">Resources</h4>
                    <ul className="text-gray-300 space-y-2 text-md">
                        <li><a href="/blog" className="hover:text-gray-400">Blog</a></li>
                        <li><a href="/help" className="hover:text-gray-400">Help Center</a></li>
                        <li><a href="/support" className="hover:text-gray-400">Support</a></li>
                        <li><a href="/privacy" className="hover:text-gray-400">Privacy Policy</a></li>
                        <li><a href="/terms" className="hover:text-gray-400">Terms of Service</a></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-lg font-semibold mb-3">Join Our Community</h4>
                    <p className="text-gray-400 mb-3 text-md">Connect with other users and get the latest updates.</p>
                    <Link to="https://www.instagram.com/anishsab1207" className="bg-blue-600 w-full cursor-pointer px-4 py-2 text-md text-white rounded-md hover:bg-blue-700">
                        <a href="https://www.instagram.com/anishsab1207"> Join Now</a>
                    </Link>
                </div>

                <div className="text-center mt-8 text-gray-400 text-md">
                    <p>&copy; {new Date().getFullYear()} FinTrack. All rights reserved.</p>
                </div>

            </div>
        </footer>
    );
}

export default Footer2;
