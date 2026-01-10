import { useState, useEffect } from "react";
import { FcGoogle } from "react-icons/fc"; 
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import VerifyCode from "./VerifyCode.jsx";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const checkSession = async () => {
            try {
                const { data } = await axios.get("/api/v1/user/session", {
                    withCredentials: true,
                });
                console.log(data);
                if (data) {
                    navigate("/invoice");
                }
            } catch (error) {
                console.log("User not logged in");
            }
        };

        checkSession();
    }, [navigate]);

    // useEffect(() => {
    //     const token = document.cookie.split(";").find(row => row.startsWith("accessToken"));
    //     if (token) navigate('/invoice');
    // }, [navigate])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const { data } = await axios.post("/api/v1/user/login", {
                email,
                password,
            }, { withCredentials: true });

            console.log("Hello", data)

            if (data.message == "Email not verified. A new verification code has been sent.") {
                setLoading(true);
            } else {
                navigate("/invoice");
            }

        } catch (err) {
            console.log(err)
            setError(err.response?.data?.message || "Something went wrong. Please try again.");
        }
    };

    const handleGoogleLogin = async () => {
       window.location.href = `${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/google`
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
            {!loading ?
                < div className="bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md" >
                    <h2 className="text-2xl font-bold text-center mb-4">Log in to your account</h2>
                    {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                    <p className="text-center text-gray-400 mb-6">Welcome back! We hope you're having a great day.</p>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-300 mb-1">Email</label>
                            <input
                                type="email"
                                className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="name@example.com"
                                required
                            />
                        </div>
                        <div className="mb-4 relative">
                            <label className="block text-gray-300 mb-1">Password</label>
                            <input
                                type={showPassword ? "text" : "password"}
                                className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 cursor-pointer top-12 transform -translate-y-1/2 text-gray-400 hover:text-gray-200"
                            >
                                {showPassword ? <FiEyeOff size={22} /> : <FiEye size={22} />}
                            </button>
                        </div>

                        <button type="submit" className="cursor-pointer w-full bg-blue-500 hover:bg-blue-600 transition-all text-white font-semibold py-2 rounded mt-3">
                            Login
                        </button>
                    </form>

                    <div className="flex items-center my-4">
                        <hr className="w-full border-gray-600" />
                        <span className="px-2 text-gray-400">OR</span>
                        <hr className="w-full border-gray-600" />
                    </div>

                    <button
                        onClick={handleGoogleLogin}
                        className="cursor-pointer w-full flex items-center justify-center gap-3 bg-white text-gray-700 font-medium py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition-all"
                    >
                        <FcGoogle className="text-xl" />
                        <span>Continue with Google</span>
                    </button>

                    <p className="text-center text-gray-400 mt-4">
                        Don't have an account? <Link className="text-blue-400" to="/register">Register</Link>
                    </p>
                </div >
                :
                <VerifyCode email={email} />}
        </div >

    )


}

