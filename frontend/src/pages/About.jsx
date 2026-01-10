import CoreValues from '../components/About/CoreValues.jsx'
import Achievements from '../components/About/Achievements.jsx'
import Mission from '../components/About/Mission.jsx';
import Team from '../components/About/Team.jsx';
import Story from '../components/About/Story.jsx';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';

function About() {
    return (
        <div>
            <Header />
            <Mission />
            <Story />
            <CoreValues />
            <Achievements />
            <Team />
            <Footer />
        </div >
    )
}

export default About