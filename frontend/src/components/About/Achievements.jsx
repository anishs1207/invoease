import { motion } from "framer-motion";
import icon from "../../assets/icon.jpg"

const achievements = [
    { year: "2021", title: "FinBud Launched", description: "Started with a mission to simplify student finances." },
    { year: "2022", title: "10,000+ Users", description: "Reached our first milestone with a growing community." },
    { year: "2023", title: "AI-Powered Insights", description: "Introduced smart analytics for better budgeting." },
    { year: "2024", title: "Award-Winning App", description: "Recognized as the top personal finance app for students." },
];

const Achievements = () => {
    return (
        <section className="bg-gray-900 text-white py-20 px-6 relative">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl font-semibold">Our Achievements</h2>
                <p className="text-lg text-gray-400 mb-12">
                    Milestones that shaped FinBud into what it is today.
                </p>
            </div>

            <div className="relative max-w-4xl mx-auto">
                <div className="absolute left-1/2 transform -translate-x-1 bg-blue-500 h-full w-1"></div>

                {achievements.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                        viewport={{ once: false, amount: 0.5 }}
                        className={`relative flex items-center justify-between my-12 ${index % 2 === 0 ? "flex-row-reverse" : "flex-row"
                            }`}
                    >
                       
                        <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-5/12 relative z-10">
                            <h3 className="text-xl font-semibold text-blue-400">{item.year}</h3>
                            <h4 className="text-lg font-bold">{item.title}</h4>
                            <p className="text-gray-400">{item.description}</p>
                        </div>

                        <div className="w-16 h-16 flex items-center justify-center bg-gray-800 rounded-full border-4 border-blue-500 absolute left-1/2 transform -translate-x-1/2">
                            <img src={icon} alt="" />
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Achievements;
