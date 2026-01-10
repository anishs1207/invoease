import Footer from "../components/Footer.jsx";
import FAQ from "../components/FAQ.jsx";
import Header from "../components/Header.jsx"
import Testimonials from '../components/Testimonials.jsx';
import Features from '../components/Home/Features.jsx';
import HowItWorks from "../components/Home/HowItWorks.jsx"
import Intro from '../components/Home/Intro.jsx';

function Home() {
    return (
        <div>
            <Header />
            <Intro />
            <Features />
            <Testimonials />
            <HowItWorks />
            <FAQ />
            <Footer />
        </div>
    )
}

export default Home;