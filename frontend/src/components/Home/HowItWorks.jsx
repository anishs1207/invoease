const HowItWorks = () => {
 const steps = [
    { id: "#1", title: "Create & Customize Invoices", description: "Build professional invoices with your branding, items, and taxes." },
    { id: "#2", title: "Download, Edit & Share", description: "Easily save, edit, download PDFs, or share invoices via email or link." },
    { id: "#3", title: "Track & Get Paid", description: "Track invoice status and receive payments through Stripe or PayPal." }
];

    return (
        <section className="bg-gray-900 text-white py-16 px-6">
            <div className="max-w-screen-lg mx-auto text-center">
                <h3 className="text-3xl font-bold mb-6">How It Works</h3>
                <p className="text-lg text-gray-400 mb-10">Follow these simple steps to get started.</p>

                <div className="flex flex-col lg:flex-row items-center justify-center space-y-10 lg:space-y-0 lg:space-x-8 relative">
                    {steps.map((step, index) => (
                        <div key={step.id} className="cursor-pointer flex flex-col items-center text-center relative">
                          
                            <div className="p-6 w-64 rounded-xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg transition-transform duration-300 hover:scale-105 hover:border-blue-500">
                                <p className="text-blue-400 font-bold text-lg">{step.id}</p>
                                <h3 className="text-xl font-semibold">{step.title}</h3>
                                <p className="text-gray-300 mt-2">{step.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <a
                    href="/register"
                    className="relative mt-10 inline-block bg-blue-700 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-600 transition-all duration-300 transform hover:scale-110"
                >
                    Get Started
                    <span className="absolute inset-0 bg-blue-500 opacity-50 blur-md scale-95 transition-all duration-300"></span>
                </a>
            </div>
        </section>
    );
};

export default HowItWorks;
