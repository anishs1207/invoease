import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function VerifyCode({ email }) {
    const [code, setCode] = useState(["", "", "", "", "", ""]);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const inputRefs = useRef([]);
    const navigate = useNavigate();

    useEffect(() => {
        const storedCode = localStorage.getItem("verificationCode");
        if (!storedCode) {
            setMessage("No verification code found. Please register again.");
        }
    }, []);

    const handleChange = (index, value) => {
        if (/^\d?$/.test(value)) {
            const newCode = [...code];
            newCode[index] = value;
            setCode(newCode);

            if (value !== "" && index < 5) {
                inputRefs.current[index + 1]?.focus();
            }
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === "Backspace") {
            const newCode = [...code];
            if (code[index] !== "") {
                newCode[index] = "";
            } else if (index > 0) {
                newCode[index - 1] = "";
                inputRefs.current[index - 1]?.focus();
            }
            setCode(newCode);
        }
    };

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        const enteredCode = code.join("");

        if (enteredCode.length === 6) {
            try {
                const response = await axios.post("/api/v1/user/verify", { email, code: enteredCode });
                if (response.data.success) {
                    setMessage("Code verified successfully! Redirecting...");
                    setTimeout(() => navigate("/invoice"), 2000);
                } else {
                    setMessage("Invalid verification code. Please try again.");
                }
            } catch (error) {
                setMessage("Verification failed. Please try again later.");
            } finally {
                setLoading(false);
            }
        } else {
            setMessage("Please enter a valid 6-digit code.");
            setLoading(false)
        }
    };

    const handleResend = async () => {
        try {
            setMessage("Resending code...");
            const response = await axios.post("/api/v1/user/resend-code", { email });
            if (response.data.success) {
                localStorage.setItem("verificationCode", response.data.newCode);
                setMessage("A new verification code has been sent to your email.");
            } else {
                setMessage("Failed to resend the code. Please try again later.");
            }
        } catch (error) {
            setMessage("Error sending code. Please check your connection.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white m-5">
            <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-2">Verify Your Email</h2>
                <p className="text-gray-400 text-center mb-6">
                    Enter the 6-digit code sent to your email.
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col items-center">
                    <div className="flex gap-2 mb-4">
                        {code.map((num, index) => (
                            <input
                                key={index}
                                ref={(el) => (inputRefs.current[index] = el)}
                                type="text"
                                maxLength="1"
                                className="w-10 h-12 text-center text-xl font-bold border border-gray-600 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={num}
                                onChange={(e) => handleChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                            />
                        ))}
                    </div>

                    <button
                        type="submit"
                        className={`w-full bg-blue-500 hover:bg-blue-600 transition-all text-white font-semibold py-2 rounded ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                        disabled={code.includes("")}
                    >
                        {loading ? "Verifying Code" : "Verify Code"}
                    </button>

                    {message && <p className="text-center text-gray-400 mt-4">{message}</p>}
                </form>

                <p className="text-center text-gray-400 mt-4">
                    Didn't receive a code?{" "}
                    <button onClick={handleResend} className="text-blue-400 hover:underline">
                        Resend Code
                    </button>
                </p>
            </div>
        </div>
    );
}
