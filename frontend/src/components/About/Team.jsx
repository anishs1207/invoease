
const teamMembers = [
    {
        name: "Anish Sabharwal",
        role: "CEO",
        image: "https://media.licdn.com/dms/image/v2/D5603AQFP1lRtG5OEaw/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1723999777332?e=1754524800&v=beta&t=66qAXmic5SMhkLqhXBg_sO8NZVZFW7Gkc0_cMuGYy_Y",
    },
    {
        name: "Jane Doe",
        role: "CTO",
        image: "https://randomuser.me/api/portraits/women/2.jpg",
    },
    {
        name: "John Smith",
        role: "Lead Developer",
        image: "https://randomuser.me/api/portraits/men/3.jpg",
    },
];

function MeetTheTeam() {
    return (
        <section className="bg-gray-900 text-white py-16 px-6">
            <h2 className="text-3xl font-semibold text-center mb-12">Meet the Team</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 justify-center max-w-5xl mx-auto">
                {teamMembers.map((member, index) => (
                    <div
                        key={index}
                        className="bg-gray-800 shadow-lg rounded-2xl p-6 flex flex-col items-center 
                        transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                    >
                        <img
                            src={member.image}
                            alt={member.name}
                            className="w-40 h-40 rounded-full border-4 border-blue-500 shadow-md mb-4 object-cover"
                            onError={(e) => (e.target.src = "https://via.placeholder.com/150")}
                        />
                        <p className="text-xl font-semibold">{member.name}</p>
                        <p className="text-blue-300 text-sm uppercase tracking-wide">
                            {member.role}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default MeetTheTeam;

