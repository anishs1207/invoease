import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
            <h1 className="text-6xl font-bold text-blue-500 mb-4 animate-pulse">404</h1>
            <h2 className="text-2xl font-semibold mb-2">Oops! Page Not Found</h2>
            <p className="text-gray-400 mb-6 text-center">
                The page you're looking for doesn't exist or has been moved.
            </p>
            <Link to="/" className="bg-blue-500 hover:bg-blue-600 transition-all text-white font-semibold py-2 px-6 rounded-lg">
                Go Home
            </Link>
        </div>
    );
}
