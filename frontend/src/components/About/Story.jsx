import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaLightbulb, FaRocket, FaEye, FaUsers } from "react-icons/fa";

const steps = [
    { id: 1, icon: <FaLightbulb />, title: "Why did we start?", bgColor: "bg-blue-500" },
    { id: 2, icon: <FaRocket />, title: "How did we solve it?", bgColor: "bg-green-500" },
    { id: 3, icon: <FaEye />, title: "Our Vision", bgColor: "bg-yellow-500" },
    { id: 4, icon: <FaUsers />, title: "Join Our Journey", bgColor: "bg-red-500" },
];

const StorySection = () => {
    const [rotation, setRotation] = useState(0);
    const [orbitRadius, setOrbitRadius] = useState(260);

    useEffect(() => {
        const interval = setInterval(() => setRotation((prev) => prev + 1), 50);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const updateRadius = () => setOrbitRadius(window.innerWidth < 768 ? 170 : 260);
        updateRadius();
        window.addEventListener("resize", updateRadius);
        return () => window.removeEventListener("resize", updateRadius);
    }, []);

    return (
        <div className="relative flex flex-col items-center justify-center bg-gray-900 text-white py-16 px-6 md:px-12 overflow-hidden">
            <h2 className="text-3xl md:text-3xl font-semibold text-center mb-20">
                Our Journey in a Cycle
            </h2>

            <div className="relative w-full max-w-lg md:max-w-3xl h-[400px] md:h-[600px] flex items-center justify-center">
                <div className="absolute flex items-center justify-center p-4 w-32 h-32 md:w-48 md:h-48 bg-gray-700/80 rounded-full shadow-lg border border-gray-600 text-center">
                    <p className="text-sm md:text-lg font-bold text-white">Journey Starts Here</p>
                </div>

                <motion.div
                    animate={{ rotate: rotation }}
                    transition={{ ease: "linear", duration: 0.1, repeat: Infinity }}
                    className="absolute w-full h-full flex items-center justify-center"
                >
                    {steps.map((step, index) => {
                        const angle = (index / steps.length) * 360;
                        const x = Math.cos((angle * Math.PI) / 180) * orbitRadius;
                        const y = Math.sin((angle * Math.PI) / 180) * orbitRadius;

                        return (
                            <div key={step.id} className="absolute" style={{ transform: `translate(${x}px, ${y}px)` }}>
                                <div
                                    className={`flex flex-col items-center text-center p-5 md:p-8 w-40 h-40 md:w-50 md:h-50 bg-gray-800/90 rounded-full shadow-xl border border-gray-700`}
                                    style={{ transform: `rotate(${-rotation}deg)` }}
                                >
                                    <div className={`p-4 md:p-6 rounded-full ${step.bgColor} shadow-lg text-white text-3xl md:text-4xl`}>
                                        {step.icon}
                                    </div>
                                    <h3 className="text-sm md:text-lg font-semibold mt-2">{step.title}</h3>
                                </div>
                            </div>
                        );
                    })}
                </motion.div>
            </div>
        </div>
    );
};

export default StorySection;
