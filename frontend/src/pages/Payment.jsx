import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import HeaderDashboard from "../components/Dashboard/HeaderDashboard";

function PaymentComponent() {
    const [loading, setLoading] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState("basic");

    useEffect(() => {
        const loadRazorpay = () => {
            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.async = true;
            document.body.appendChild(script);
        };

        loadRazorpay();
    }, []);

    const handlePayment = () => {
        setLoading(true);

        const amount = selectedPlan === "basic" ? 50000 : selectedPlan === "standard" ? 100000 : 150000;

        const options = {
            key: "YOUR_RAZORPAY_KEY", // Replace with your Razorpay Key ID
            amount, // Dynamic amount based on selected plan
            currency: "INR",
            name: "InvoEase",
            description: `Payment for ${selectedPlan.charAt(0).toUpperCase() + selectedPlan.slice(1)} Plan`,
            image: "/logo.png", // Replace with your logo
            handler: function (response) {
                setLoading(false);
                alert(`✅ Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
            },
            prefill: {
                name: "Anish Sabharwal",
                email: "anish@example.com",
                contact: "9999999999",
            },
            theme: {
                color: "#1F2937", // Dark Gray (matches theme)
            },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
    };

    return (
        <>
            <HeaderDashboard />

            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white px-6">
                <h1 className="text-3xl font-bold mb-6">Choose Your Plan</h1>
                <h2 className="text-lg text-gray-500 mb-6">Demo Mode (Coming Soon)</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Pricing Plans */}
                    {[
                        { name: "Basic", price: "₹500", key: "basic" },
                        { name: "Standard", price: "₹1000", key: "standard" },
                        { name: "Premium", price: "₹1500", key: "premium" },
                    ].map((plan) => (
                        <div
                            key={plan.key}
                            onClick={() => setSelectedPlan(plan.key)}
                            className={`cursor-pointer bg-gray-800 p-6 rounded-lg shadow-lg transition-all hover:scale-105 border-2 ${selectedPlan === plan.key ? "border-blue-500" : "border-transparent"
                                }`}
                        >
                            <h2 className="text-xl font-semibold mb-2">{plan.name} Plan</h2>
                            <p className="text-gray-400">{plan.key === "basic" ? "Best for individuals" : plan.key === "standard" ? "Great for startups" : "Perfect for businesses"}</p>
                            <div className="my-4 text-2xl font-bold">{plan.price}</div>
                        </div>
                    ))}
                </div>

                {/* Pay Now Button */}
                <button
                    onClick={handlePayment}
                    disabled={loading}
                    className="mt-6 bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-lg text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? "Processing..." : `Pay ${selectedPlan === "basic" ? "₹500" : selectedPlan === "standard" ? "₹1000" : "₹1500"} Now`}
                </button>
            </div>
            <Footer />
        </>
    );

}

export default PaymentComponent;
