function MissionCard({ index, heading, desc, icon }) {
    return (
        <div className="group relative bg-gray-800 p-6 rounded-lg shadow-lg duration-300 ">
            <div className="bg-blue-600 text-white p-4 rounded-full w-12 h-12 flex items-center 
                            justify-center mb-4 text-xl font-bold">
                {index}
            </div>

            <h3 className="text-2xl font-semibold flex items-center justify-center gap-2 mb-3 
                           transition-colors ">
                {icon} {heading}
            </h3>

            <p className="text-gray-400 text-md leading-relaxed">{desc}</p>
        </div>
    );
}

export default MissionCard;
