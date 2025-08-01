import React, {useContext, useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {AuthContext} from "../../components/AuthContext";
import {useFetchEventById} from "../../../core/Campaigns/usecase/useFetchEventById";
import {useFetchCharityById} from "../../../core/Charity/usecase/useFetchCharityById";

const CampaignDetails = () => {

    const [user, setUser] = useState(null);
    const { auth } = useContext(AuthContext);
    const { id } = useParams(); // assuming route is like /campaign/:id

    const {
        fetchEvent,
        event,
         eventLoading,
         eventError
    } = useFetchEventById();
   console.log(!eventLoading);
    const {
        fetchCharity,
        charity,
         charityLoading,
         charityError
    } = useFetchCharityById();


    useEffect(() => {
        fetchEvent(id);
    }, []);

    useEffect(() => {

        if (auth.isAuthenticated) {
            setUser(auth.user.valid.user);

        }
    }, [auth.isAuthenticated,id,user]);

    useEffect(() => {
        if (event && event.charity_id) {
            fetchCharity(event.charity_id);
        }
    }, [event]);

    const getAction = () => {
        if (!user) return { label: "Donate Now", route: "/donate" };
        if ( user.roles.some(role => role.name === 'Volunteer')) return { label: "Volunteer Now", route: "/volunteer/apply" };
        if ( user.roles.some(role => role.name === 'Beneficiary')) return { label: "Apply Now", route: "/beneficiary/apply" };
        return { label: "Support", route: "/" };
    };

    const { label, route } = getAction();

    // Loading state
    if (eventLoading || charityLoading ) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-black text-white">
                <p>Loading profile...</p>
            </div>
        );
    }

    // Error state
    if (eventError || charityError) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-black text-red-500">
                {(eventError || charityError) && (
                    <p className="text-red-600">Error loading profile: {eventError || charityError}</p>
                )}
            </div>
        );
    }

    if (!event || !charity) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-black text-white">
                <p>No event data available.</p>
            </div>
        );
    }

    return (
        <div className="bg-[#f8fafc] text-[#1e293b] font-sans antialiased">
            {/* Header Section */}
            <div
                className="relative h-[350px] bg-cover bg-center"
                style={{
                    backgroundImage: `url("https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=1600&q=80")`,
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-r from-[#002366]/40 to-[#0044cc]/40 flex flex-col justify-center items-center px-6 text-center">
                    <div className="max-w-4xl">
                        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
                            {event.title}
                        </h1>
                        <p className="text-[#e0f2fe] text-xl md:text-2xl font-light mb-8">
                            {event.location}
                        </p>
                        <div className="inline-flex bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 text-[#e0f2fe] text-lg">
                            Sponsored by {charity.name}
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid lg:grid-cols-3 gap-12">
                {/* Left Column */}
                <section className="lg:col-span-2 space-y-12">
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                        <div className="p-8">
                            <h2 className="text-3xl font-bold text-[#002366] mb-6 pb-4 border-b border-gray-100">
                                Campaign Overview
                            </h2>
                            <div className="prose prose-lg text-gray-700 max-w-none">
                                <p className="whitespace-pre-line">{event.description}</p>

                                <h3 className="text-xl font-semibold text-[#002366] mt-8 mb-4">Event Details</h3>
                                <ul className="space-y-3 list-disc pl-5 marker:text-[#97c9ea]">
                                    <li>Status: <strong>{event.status}</strong></li>
                                    <li>Location: <strong>{event.location}</strong></li>
                                    <li>Capacity: <strong>{event.capacity}</strong></li>
                                    <li>Volunteers Needed: <strong>{event.NumOfVolunteer}</strong></li>
                                </ul>

                                <h3 className="text-xl font-semibold text-[#002366] mt-8 mb-4">Gallery</h3>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                                    <img src="https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?auto=format&fit=crop&w=600&q=80" className="rounded-lg shadow-md object-cover h-48 w-full" />
                                    <img src="https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=600" className="rounded-lg shadow-md object-cover h-48 w-full" />
                                    <img src="https://images.pexels.com/photos/4546135/pexels-photo-4546135.jpeg?auto=compress&cs=tinysrgb&w=600" className="rounded-lg shadow-md object-cover h-48 w-full" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Sidebar */}
                <aside className="space-y-8">
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                        <div className="p-8 text-center">
                            <h3 className="text-2xl font-bold text-[#002366] mb-6">Your Support Makes a Difference</h3>

                            {/* Role-Based Action Button */}
                            <Link
                                to={route}
                                className="block bg-[#002366] hover:bg-[#001a4d] text-white py-3 px-6 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg transform hover:scale-105"
                            >
                                {label}
                            </Link>

                            <div className="mt-8 text-[#161e24]">
                                <p className="text-lg">Have a question?</p>
                                <p className="text-lg">Contact us:</p>
                                <div className="mt-3">
                                    <span>📞 {charity.phonenumber}</span><br />
                                    <span>📧 {charity.email}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </aside>
            </main>
        </div>
    );
};

export default CampaignDetails;
