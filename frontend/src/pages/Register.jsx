import { useState, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import VerifyCode from "./VerifyCode.jsx";

export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [verifying, setVerifying] = useState(false);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        const checkSession = async () => {
            try {
                const { data } = await axios.get("/api/v1/user/session", {
                    withCredentials: true,
                });
                if (data) {
                    navigate("/invoice");
                }
            } catch (error) {
                console.log("User not Registered in");
            }
        };

        checkSession();
    }, [navigate]);

    const handleSubmitRegister = async (e) => {
        e.preventDefault();
        setErrorMsg("");
        setLoading(true);

        try {
            const { data } = await axios.post(
                "/api/v1/user/register",
                { email, fullName: name, username, password },
                { withCredentials: true }
            );

            if (data.success) {
                setVerifying(true)
            } else if (data.message === "User with Email Already Exists") {
                setErrorMsg("Email is already registered. Please log in.");
                setTimeout(() => {
                    console.log("test2")
                    navigate("/login");
                }, 2000);
            } else {
                setErrorMsg(data.message || "An error occurred during registration.");
                setVerifying(true);
            }

        } catch (err) {
            console.log(err);
            setErrorMsg(err.response?.data?.message || "Registration failed");
            setTimeout(() => {
                console.log("1")
                navigate("/login");
            }, 2000);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = () => {
        window.open(`${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/google`, "_self");
    };


    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
            {!verifying ? (
                <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md">
                    <h2 className="text-2xl font-bold text-center mb-4">Register</h2>
                    {errorMsg && <p className="text-red-500 text-center mb-4">{errorMsg}</p>}
                    <p className="text-center text-gray-400 mb-6">Join us and start your journey!</p>

                    <form onSubmit={handleSubmitRegister}>
                        <div className="mb-4">
                            <label className="block text-gray-300 mb-1">Name</label>
                            <input
                                type="text"
                                className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white focus:ring-2 focus:ring-blue-500"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Your Name"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-300 mb-1">Email</label>
                            <input
                                type="email"
                                className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white focus:ring-2 focus:ring-blue-500"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="name@example.com"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-300 mb-1">Username</label>
                            <input
                                type="text"
                                className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white focus:ring-2 focus:ring-blue-500"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Your Username"
                                required
                            />
                        </div>
                        <div className="mb-4 relative">
                            <label className="block text-gray-300 mb-1">Set Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 pr-10"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200"
                                >
                                    {showPassword ? <FiEyeOff size={22} /> : <FiEye size={22} />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full bg-blue-500 hover:bg-blue-600 transition-all text-white font-semibold py-2 rounded ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                        >
                            {loading ? "Registering" : "Register"}
                        </button>
                    </form>

                    <div className="flex items-center my-4">
                        <hr className="w-full border-gray-600" />
                        <span className="px-2 text-gray-400">OR</span>
                        <hr className="w-full border-gray-600" />
                    </div>

                    <button
                        onClick={handleGoogleLogin}
                        className="w-full flex items-center justify-center gap-3 bg-white text-gray-700 font-medium py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition-all"
                    >
                        <FcGoogle className="text-xl" />
                        <span>Continue with Google</span>
                    </button>

                    <p className="text-center text-gray-400 mt-4">
                        Already have an account?{" "}
                        <Link className="text-blue-400" to="/login">
                            Login
                        </Link>
                    </p>
                </div>
            ) : (
                <VerifyCode email={email} />
            )
            }
        </div >
    );
}
