import { FaCheckCircle } from "react-icons/fa";

const principles = [
    { title: "Simplicity", description: "Managing money should be effortless and intuitive." },
    { title: "Transparency", description: "No hidden fees—just clear, actionable insights." },
    { title: "User First", description: "Built by students, for students—your needs come first." },
    { title: "Security", description: "Your data is protected with industry-leading security measures." },
    { title: "Innovation", description: "We constantly evolve to make finance smarter for you." },
    { title: "Innovation", description: "We constantly evolve to make finance smarter for you." },
];

const KeyPrinciples = () => {
    return (
        <section className="bg-gray-900 text-white py-20 px-6 shadow-lg">
            <div className="max-w-6xl mx-auto text-center">
                <h2 className="text-3xl font-semibold text-center">Our Core Values</h2>
                <p className="text-lg text-gray-400 mb-12">
                    The values that shape everything we create.
                </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
                {principles.map((principle, index) => (
                    <div
                        key={index}
                        className="group relative bg-gray-800 p-6 rounded-lg shadow-lg transition-all duration-300 
                                    hover:shadow-2xl hover:scale-105 hover:-rotate-1"
                    >
                      
                        <div className="flex items-center justify-center mb-4">
                            <FaCheckCircle className="text-blue-500 text-4xl transition-transform duration-300 group-hover:rotate-[360deg]" />
                        </div>

                        <div className="relative overflow-hidden rounded-lg">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 
                                            group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>

                        <h3 className="text-2xl m-3 font-semibold mb-2 transition-colors group-hover:text-blue-400">
                            {principle.title}
                        </h3>
                        <p className="text-gray-400">{principle.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default KeyPrinciples;
