import MissionCard from './MissionCard.jsx';

function MissionStatement() {
    return (
        <div id="mission" className="bg-gray-900 text-white py-16 px-6 mb-0">
            <h2 className="text-3xl font-semibold text-center mb-12">Our Mission</h2>

            <div className="max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                <MissionCard
                    index={1}
                    heading="Financial Literacy"
                    desc="We educate and empower users with essential financial knowledge to make smart money decisions."
                    icon="📊"
                />

                <MissionCard
                    index={2}
                    heading="Smarter Budgeting"
                    desc="Our goal is to simplify budgeting with intuitive tools that help track expenses and grow savings effortlessly."
                    icon="💰"
                />

                <MissionCard
                    index={3}
                    heading="Financial Freedom"
                    desc="We strive to make financial independence achievable for everyone, no matter where they are on their journey."
                    icon="🚀"
                />
            </div>
        </div>
    );
}

export default MissionStatement;
