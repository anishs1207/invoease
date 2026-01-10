import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus, FaMinus } from "react-icons/fa";

export default function FAQ() {
    const faqs = [
    { question: "What is InvoEase?", answer: "InvoEase is an all-in-one invoicing tool that helps individuals and businesses create, edit, save, and download professional invoices easily." },
    { question: "Can I edit an invoice after creating it?", answer: "Absolutely! You can easily access and edit any saved invoice at any time from your dashboard." },
    { question: "Is my invoice data secure?", answer: "Yes, we use industry-grade encryption and secure storage practices to keep your data safe and private." },
    { question: "Do I need to sign up to use InvoEase?", answer: "While basic features are accessible without signing up, creating an account allows you to save, edit, and track invoices more efficiently." },
    { question: "What file formats can I download invoices in?", answer: "Invoices can be downloaded as high-quality PDF files, optimized for both print and digital sharing." }
];

    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section id="faq" className="bg-gray-900 text-white py-16 px-6">
            <div className="max-w-screen-lg mx-auto">
                <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
                <div className="space-y-6">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="bg-gray-800 border border-gray-700 rounded-lg p-4 hover:bg-gray-700 transition duration-300"
                        >
                            <button
                                className="cursor-pointer w-full text-left flex justify-between items-center text-md font-semibold text-gray-300 hover:text-white"
                                onClick={() => toggleFAQ(index)}
                            >
                                {faq.question}
                                <motion.div
                                    initial={{ rotate: 0 }}
                                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {openIndex === index ? <FaMinus className="text-gray-400" /> : <FaPlus className="text-gray-400" />}
                                </motion.div>
                            </button>

                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.p
                                        className="mt-3 text-gray-400"
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                    >
                                        {faq.answer}
                                    </motion.p>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
