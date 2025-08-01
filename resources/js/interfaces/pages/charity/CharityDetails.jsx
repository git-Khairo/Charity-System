import React from 'react';
import Slider from 'react-slick';
import {
    FaFacebook,
    FaTwitter,
    FaInstagram,
    FaLinkedin,
    FaShareAlt,
    FaStar,
} from 'react-icons/fa';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const COVER_IMAGE = 'https://images.unsplash.com/photo-1593113598332-520e024b172a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTc2NXwwfDF8c2VhcmNofDEzfHxjaGFyaXR5JTIwb3JnYW5pemF0aW9uJTIwYnVpbGRpbmclMjB3aXRoJTIwcGVvcGxlfGVufDB8fHx8fDE2NzYwNDczNjl8MA&ixlib=rb-4.0.3&q=80&w=1080';
const ORGANIZATION_LOGO = 'https://via.placeholder.com/150x150?text=Your+Logo';
const PROJECT_IMAGE_1 ="https://readdy.ai/api/search-image?query=Clean%20water%20initiative%20showing%20water%20wells%20being%20installed%20in%20rural%20villages%2C%20people%20collecting%20clean%20water%20from%20taps%2C%20community%20members%20celebrating%20access%20to%20clean%20water%2C%20natural%20lighting%20with%20simple%20village%20background&width=600&height=500&seq=4&orientation=landscape"
const PROJECT_IMAGE_2 = "https://readdy.ai/api/search-image?query=School%20supplies%20drive%20showing%20colorful%20backpacks%2C%20notebooks%20and%20educational%20materials%20being%20distributed%20to%20happy%20children%20in%20classroom%20setting%2C%20volunteers%20helping%20organize%20supplies%2C%20warm%20lighting%20with%20simple%20school%20background&width=600&height=500&seq=5&orientation=landscape"

const GALLERY_IMAGE_1 = 'https://images.unsplash.com/photo-1522204523234-8729aa6e3d5f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTc2NXwwfDF8c2VhcmNofDJ8fGNvbW11bml0eSUyMHNlcnZpY2V8ZW5ufDB8fHx8fDE2NzYwNDc1MTZ8MA&ixlib=rb-4.0.3&q=80&w=1080';
const GALLERY_IMAGE_2 = 'https://images.unsplash.com/photo-1522204523234-8729aa6e3d5f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTc2NXwwfDF8c2VhcmNofDJ8fGNvbW11bml0eSUyMHNlcnZpY2V8ZW5ufDB8fHx8fDE2NzYwNDc1MTZ8MA&ixlib=rb-4.0.3&q=80&w=1080';
const GALLERY_IMAGE_3 = 'https://images.unsplash.com/photo-1522204523234-8729aa6e3d5f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTc2NXwwfDF8c2VhcmNofDJ8fGNvbW11bml0eSUyMHNlcnZpY2V8ZW5ufDB8fHx8fDE2NzYwNDc1MTZ8MA&ixlib=rb-4.0.3&q=80&w=1080';
const GALLERY_IMAGE_4 = 'https://images.unsplash.com/photo-1522204523234-8729aa6e3d5f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTc2NXwwfDF8c2VhcmNofDJ8fGNvbW11bml0eSUyMHNlcnZpY2V8ZW5ufDB8fHx8fDE2NzYwNDc1MTZ8MA&ixlib=rb-4.0.3&q=80&w=1080';

const CharityDetails = () => {
    const charityData = {
        name: "Hope & Giving Foundation",
        rating: 4.9,
        shortDescription: "We empower underprivileged communities through sustainable projects.",
        vision: "A world where everyone thrives.",
        mission: "Provide access to education, water, and healthcare.",
        projects: [
            {
                id: 1,
                name: "Water for Life Initiative",
                description: "Providing clean and safe drinking water.",
                progress: 90,
                image: PROJECT_IMAGE_1,
                stats: [
                    { label: "Wells Dug", value: "210" },
                    { label: "Beneficiaries", value: "75,000" },
                ],
            },
            {
                id: 2,
                name: "Education Program",
                description: "Building and equipping schools.",
                progress: 75,
                image: PROJECT_IMAGE_2,
                stats: [
                    { label: "Schools Built", value: "45" },
                    { label: "Students Enrolled", value: "18,000" },
                ],
            },
        ],
        testimonials: [
            { quote: "The Hope & Giving Foundation transformed our village. We now have access to clean water, which has greatly improved our health.",
                author: "Aisha K., Community Leader" },
            { quote: "Thanks to their education program, my children can now attend a proper school. This has opened up a world of opportunities for them.",
                author: "Omar S., Beneficiary Parent" },
            {
                quote: "They changed our village's future with water.",
                author: "Aisha K.",
            },
        ],
        contact: {
            social: {
                facebook: "#",
                twitter: "#",
                instagram: "#",
                linkedin: "#",
            },
        },
        latestNews: [
            { title: "New School Opens in Rural Area", date: "July 5, 2025" },
            { title: "Annual Fundraising Gala Success", date: "June 28, 2025" },
            { title: "New Partnership to Support Healthcare", date: "June 15, 2025" },
        ],
        financialReports: [
            { title: "2024 Annual Financial Report", link: "#" },
            { title: "Q1 2025 Impact Report", link: "#" },
            { title: "Audited Statements 2023", link: "#" },
        ],
        certificates: [
            { title: "Registered Non-Profit Certificate", link: "#" },
            { title: "Charity Commission License", link: "#" },
            { title: "ISO 9001:2015 Certification", link: "#" },
        ],
        keyAchievements: [
            "Built 100 wells in rural areas",
            "Educated over 20,000 children",
            "Provided healthcare to 10,000 people",
        ],
        galleryImages:
            [GALLERY_IMAGE_1, GALLERY_IMAGE_2, GALLERY_IMAGE_3, GALLERY_IMAGE_4], // Images defined above
    };

    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= Math.floor(rating)) {
                stars.push(<FaStar key={i} className="text-yellow-400" />);
            } else {
                stars.push(<FaStar key={i} className="text-gray-300" />);
            }
        }
        return stars;
    };

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        arrows: false,
    };

    return (
        <div className="min-h-screen bg-background text-text font-sans">
            {/* 1. Main Structure - Cover Image & Main Info Bar */}
            <div
                className="relative h-70 bg-cover bg-center"
                style={{ backgroundImage: `url(${COVER_IMAGE})` }}
            >
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent opacity-80"></div>
                <div className="relative z-10 flex flex-col items-center justify-center h-full text-white p-4">
                    <img src={ORGANIZATION_LOGO} alt="Organization Logo" className="w-32 h-32 rounded-full border-4 border-white shadow-lg mb-4 object-contain" />
                    <h1 className="text-5xl font-extrabold mb-2 text-center drop-shadow-lg">{charityData.name}</h1>
                    <div className="flex items-center space-x-2 text-xl mb-4">
            <span className="flex space-x-1">
              {renderStars(charityData.rating)}
            </span>
                        <span>({charityData.rating} Rating)</span>
                    </div>
                    <div className="flex space-x-3 text-2xl">
                        <a href={charityData.contact.social.facebook} className="hover:text-accent transition-colors duration-200"><FaFacebook /></a>
                        <a href={charityData.contact.social.twitter} className="hover:text-accent transition-colors duration-200"><FaTwitter /></a>
                        <a href={charityData.contact.social.instagram} className="hover:text-accent transition-colors duration-200"><FaInstagram /></a>
                        <a href={charityData.contact.social.linkedin} className="hover:text-accent transition-colors duration-200"><FaLinkedin /></a>
                        <button className="hover:text-accent transition-colors duration-200"><FaShareAlt /></button>
                    </div>
                </div>
            </div>
            <section className="max-w-7xl mx-auto px-6 py-12 space-y-10">
                {/* Row 1: About + (CTA & Latest News) */}
                <div className="grid md:grid-cols-5 gap-8">
                    {/* About */}
                    <div className="md:col-span-3 bg-white p-8 rounded-lg shadow-xl">
                        <h2 className="text-3xl font-bold text-primary mb-6 border-b-2 border-accent pb-3">
                            About {charityData.name}
                        </h2>
                        <p className="text-lg leading-relaxed mb-6">{charityData.shortDescription}</p>
                        <div className="grid md:grid-cols-2 gap-6 text-lg">
                            <div>
                                <h3 className="font-semibold text-primary mb-2">Our Vision</h3>
                                <p>{charityData.vision}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-primary mb-2">Our Mission</h3>
                                <p>{charityData.mission}</p>
                            </div>
                            {charityData.keyAchievements && (
                                <div className="col-span-2 mt-4">
                                    <h3 className="font-semibold text-primary mb-2">Key Achievements</h3>
                                    <ul className="list-disc list-inside space-y-1 text-text">
                                        {charityData.keyAchievements.map((achievement, index) => (
                                            <li key={index}>{achievement}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* CTA + Latest News */}
                    <div className="md:col-span-2 flex flex-col gap-8">
                        {/* CTA */}
                        <div className="bg-white p-6 rounded-lg shadow-xl flex flex-col justify-center space-y-4">
                            <h3 className="text-2xl font-bold text-primary mb-4 text-center">Make a Difference</h3>
                            <button className="w-full px-6 py-3 bg-primary text-white font-semibold rounded-full shadow-md hover:bg-[#001133] transition-transform transform hover:scale-105">
                                Donate Now
                            </button>
                            <button className="w-full px-6 py-3 bg-accent text-primary font-semibold rounded-full shadow-md hover:bg-[#72b0e0] transition-transform transform hover:scale-105">
                                Volunteer With Us
                            </button>
                            <button className="w-full px-6 py-3 border border-primary text-primary font-semibold rounded-full shadow-md hover:bg-primary hover:text-white transition-transform transform hover:scale-105">
                                Contact Us
                            </button>
                        </div>

                        {/* Latest News */}
                        <div className="bg-white p-6 rounded-lg shadow-xl">
                            <h3 className="text-2xl font-bold text-primary mb-4 border-b border-secondary/30 pb-3">Latest News</h3>
                            <ul className="space-y-3">
                                {charityData.latestNews.map((news, index) => (
                                    <li key={index}>
                                        <a href="#" className="block text-primary hover:underline">{news.title}</a>
                                        <span className="block text-sm text-secondary">{news.date}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Row 2: Reports + Certificates | Gallery */}
                <div className="grid md:grid-cols-5 gap-8">
                    {/* Reports + Certificates - يسار */}
                    <div className="md:col-span-2 flex flex-col gap-6 h-full">
                        <div className="bg-white p-6 rounded-lg shadow-xl flex-1 h-full">
                            <h3 className="text-2xl font-bold text-primary mb-4 border-b border-secondary/30 pb-3">Transparency & Reports</h3>
                            <ul className="space-y-3">
                                {charityData.financialReports.map((report, index) => (
                                    <li key={index}>
                                        <a href={report.link} className="block text-primary hover:underline flex items-center">
                                            {report.title}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-xl flex-1 h-full">
                            <h3 className="text-2xl font-bold text-primary mb-4 border-b border-secondary/30 pb-3">Certificates & Licenses</h3>
                            <ul className="space-y-3">
                                {charityData.certificates.map((cert, index) => (
                                    <li key={index}>
                                        <a href={cert.link} className="block text-primary hover:underline flex items-center">
                                            {cert.title}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Gallery - يمين */}
                    <div className="md:col-span-3 bg-white p-8 rounded-lg shadow-xl h-full flex flex-col">
                        <h2 className="text-3xl font-bold text-primary mb-6 border-b-2 border-accent pb-3">
                            Our Work in Pictures
                        </h2>

                        {/* Images grid takes full remaining height */}
                        <div className="flex-grow grid grid-cols-2 md:grid-cols-4 gap-4">
                            {charityData.galleryImages.map((image, index) => (
                                <div
                                    key={index}
                                    className="relative w-full h-48 md:h-full rounded-lg overflow-hidden shadow group"
                                >
                                    <img
                                        src={image}
                                        alt={`Gallery Image ${index + 1}`}
                                        className="absolute inset-0 w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-105"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Projects Slider */}
            <section className="max-w-7xl mx-auto grid grid-cols-3 gap-6 px-6 mt-2">
                <div className="col-span-3 bg-white p-6 rounded-lg shadow-xl w-full">
                    <h2 className="text-2xl font-bold mb-6 text-center text-primary">Our Projects</h2>
                    <Slider {...sliderSettings}>
                        {charityData.projects.map((project) => (
                            <div key={project.id} className="p-4">
                                <div className="rounded-lg overflow-hidden border shadow">
                                    <img src={project.image} alt={project.name} className="w-full h-64 object-cover" />
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold mb-2">{project.name}</h3>
                                        <p className="mb-3">{project.description}</p>
                                        <div className="mb-4">
                                            <div className="flex justify-between text-sm mb-1">
                                                <span>Progress</span>
                                                <span>{project.progress}%</span>
                                            </div>
                                            <div className="w-full bg-gray-200 h-2 rounded-full">
                                                <div
                                                    className="h-2 bg-blue-600 rounded-full"
                                                    style={{ width: `${project.progress}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4 mt-4">
                                            {project.stats.map((stat, idx) => (
                                                <div key={idx} className="text-center">
                                                    <p className="text-xl font-bold text-primary">{stat.value}</p>
                                                    <p className="text-sm text-gray-500">{stat.label}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </section>

            {/* Testimonials1 */}
            <section className="max-w-7xl mx-auto grid grid-cols-3 gap-6 px-6 mt-6 mb-12">
                <div className="col-span-3 bg-white p-8 rounded-lg shadow-xl w-full">
                    <h2 className="text-2xl font-bold mb-8 text-center text-primary">What They Say</h2>
                    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        {charityData.testimonials.map((testimonial, index) => (
                            <div key={index} className="bg-gray-100 p-6 rounded-lg shadow-inner text-center">
                                <p className="italic mb-4 text-lg">"{testimonial.quote}"</p>
                                <p className="font-semibold text-primary">– {testimonial.author}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>

    );
};

export default CharityDetails;
