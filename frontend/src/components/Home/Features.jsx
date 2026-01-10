import f1 from "../../assets/feature.png";
import FeatureCard from "./FeatureCard.jsx";
import f2 from "../../assets/f2.png"

function Features() {
    return (
        <div id="feature" className="bg-gray-900 text-white py-16 px-6 mb-0">
            <h2 className="text-3xl font-semibold text-center mb-12">Features</h2>
            <div className="max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

                <FeatureCard
    index={1}
    heading="Effortless Invoice Creation"
    desc="Quickly generate professional invoices with all essential details — no design or technical skills required."
    image_url={f1}
/>

<FeatureCard
    index={2}
    heading="Download Invoices Instantly"
    desc="Save invoices as PDFs and download them anytime for printing or sharing with clients on the go."
    image_url={f2}
/>

<FeatureCard
    index={3}
    heading="Edit & Manage with Ease"
    desc="Update invoice details, duplicate existing ones, and keep everything organized in your dashboard."
    image_url={f1}
/>
            </div>
        </div>
    );
}

export default Features;
