import React, {useContext, useEffect, useState, useRef} from 'react';
import Slider from 'react-slick';
import {
    FaFacebook,
    FaTwitter,
    FaInstagram,
    FaLinkedin,
    FaShareAlt,
    FaEnvelope,
    FaPhone,
    FaMapMarkerAlt,
} from 'react-icons/fa';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {Link, useParams} from 'react-router-dom';
import {AuthContext} from "../../components/AuthContext";
import {useFetchCharityDetails} from "../../../core/Charity/usecase/useFetchCharityDetails";

const CharityDetails = () => {
    const { id } = useParams();
    const { auth } = useContext(AuthContext);
    const {fetchCharityData, charity, events, feedbacks, loading, error } = useFetchCharityDetails();
    const [user, setUser] = useState(null);

    const eventsRef = useRef(null);

    useEffect(() => {
        fetchCharityData();
    }, [id]);

    useEffect(() => {
        if (auth.isAuthenticated) {
            setUser(auth.user);
        }
    }, [auth.isAuthenticated, id, user]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-black text-white">
                <p>Loading profile...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-black text-red-500">
                <p>Error loading profile: {error}</p>
            </div>
        );
    }

    if (!charity) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-black text-white">
                <p>No user data available.</p>
            </div>
        );
    }

    const sliderSettings = {
        dots: true,
        infinite: events.length > 1,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: events.length > 1,
        arrows: false,
    };

    // ✅ Updated renderCTA to scroll to events
    const renderCTA = () => {
        const baseClass =
            'w-full md:w-auto px-6 py-3 rounded-full shadow-md font-semibold transition-all hover:scale-105';
        if (user && user.roles.some(role => role.name === 'Volunteer')) {
            return (
                <div className="flex flex-col items-center gap-4">
                    <button
                        onClick={() => eventsRef.current?.scrollIntoView({ behavior: 'smooth' })}
                        className={`${baseClass} bg-[#e2f0ff] text-[#24527a]`}
                    >
                        Volunteer Now
                    </button>
                </div>
            );
        } else if (user && user.roles.some(role => role.name === 'Beneficiary')) {
            return (
                <div className="flex flex-col items-center gap-4">
                    <Link to={`/beneficiary/apply/${id}`} className={`${baseClass} bg-[#e2f0ff] text-[#24527a]`}>
                        Apply for Support
                    </Link>
                </div>
            );
        }
        return (
            <div className="flex justify-center">
                <Link to={`/donate/${charity.id}`} className={`${baseClass} bg-[#24527a] text-white`}>
                    Donate Now
                </Link>
            </div>
        );
    };

    const upcomingEvents = events.filter(e => e.status === 'upcoming').slice(0, 3);
    const topFeedbacks = feedbacks.slice(0, 3);

    console.log(feedbacks);

    return (
        <div className="min-h-screen bg-[#f9fafb] text-[#2c3e50] font-sans">
            {/* Cover Section */}
            <div
                className="relative h-72 bg-cover bg-center"
                style={{ backgroundImage: `url(${charity.images})` }}
            >
                <div className="absolute inset-0 bg-gradient-to-t from-[#24527a] via-[#24527a]/60 to-transparent opacity-90" />
                <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center p-4">
                    <img
                        src={charity.images}
                        alt="Charity Logo"
                        className="w-28 h-28 rounded-full border-4 border-white shadow-lg mb-4 object-cover"
                    />
                    <h1 className="text-4xl font-bold drop-shadow-lg">{charity.name}</h1>
                    <div className="flex space-x-4 mt-3 text-xl">
                        <a href="#"><FaFacebook /></a>
                        <a href="#"><FaTwitter /></a>
                        <a href="#"><FaInstagram /></a>
                        <a href="#"><FaLinkedin /></a>
                        <button><FaShareAlt /></button>
                    </div>
                </div>
            </div>

            {/* About + CTA Section */}
            <section className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-5 gap-8">
                {/* About */}
                <div className="md:col-span-3 bg-white p-8 rounded-lg shadow-md space-y-6">
                    <h2 className="text-3xl font-bold text-[#24527a] border-b-2 pb-3 border-[#e1e1e1]">About {charity.name}</h2>
                    <p className="text-lg leading-relaxed whitespace-pre-line text-[#2c3e50]">{charity.description}</p>
                    <div className="space-y-2 text-base text-[#555e6d]">
                        <p className="flex items-center gap-2"><FaMapMarkerAlt /> {charity.address}</p>
                        <p className="flex items-center gap-2"><FaPhone /> {charity.phonenumber}</p>
                        <p className="flex items-center gap-2"><FaEnvelope /> {charity.email}</p>
                    </div>
                </div>

                {/* CTA + Events */}
                <div className="md:col-span-2 flex flex-col gap-8">
                    <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
                        <h3 className="text-2xl font-bold text-[#24527a] text-center">Get Involved</h3>
                        {renderCTA()}
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-bold text-[#24527a] mb-4 border-b border-gray-200 pb-2">Upcoming Events</h3>
                        <ul className="space-y-3 text-sm text-[#555e6d]">
                            {upcomingEvents.map((event) => (
                                <li key={event.id}>
                                    <strong className="block text-[#24527a]">{event.title}</strong>
                                    <span>{event.location} — {event.categoryName}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* Events Slider */}
            <section ref={eventsRef} className="max-w-7xl mx-auto px-6 mb-12">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold text-center text-[#24527a] mb-6">Our Events</h2>
                    <Slider {...sliderSettings}>
                        {events.map((event) => (
                            <div key={event.id} className="p-4">
                                <div className="border rounded-lg shadow h-full flex flex-col overflow-hidden">
                                    <div className="h-56 w-full overflow-hidden">
                                        <img src={event.images[0]} alt="" className="w-full h-full object-cover object-center" />
                                    </div>
                                    <div className="p-6 flex flex-col justify-between flex-grow">
                                        <div>
                                            <h3 className="text-lg font-bold mb-2">{event.title}</h3>
                                            <p className="mb-2 text-sm text-[#4a5568]">{event.description}</p>
                                            <p className="text-xs">📍 {event.location}</p>
                                            <p className="text-xs">👥 Capacity: {event.capacity}</p>
                                            <p className="text-xs">📅 Status: {event.status}</p>
                                        </div>
                                        <div className="mt-4">
                                            <Link
                                                to={`/campaign/${event.id}`}
                                                className="inline-block px-4 py-2 bg-[#24527a] text-white rounded-full hover:bg-[#183d5a] transition"
                                            >
                                                Learn More
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </section>

            {/* Feedback Section */}
            <section className="max-w-7xl mx-auto px-6 mb-20">
                <div className="bg-white p-8 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold text-center text-[#24527a] mb-8">User Feedback</h2>
                    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        {topFeedbacks.map((feedback) => (
                            <div key={feedback.id} className="bg-[#f0f4f8] p-6 rounded-lg text-center">
                                <p className="italic mb-4 text-[#4a5568]">"{feedback.description}"</p>
                                <p className="font-semibold text-[#24527a]">{feedback.title}</p>
                                <p className="text-xs text-gray-500">{new Date(feedback.created_at).toLocaleDateString()}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default CharityDetails;
