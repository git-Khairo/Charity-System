import React, {useContext, useEffect, useState} from 'react';
import { Outlet, Link, useParams } from 'react-router-dom';
import EditProfileModal from './EditProfileModal';
import {
    ProfileIcon,
    NotificationIcon,
    FeedbackIcon,
    EventIcon,
    EditIcon,
    LogoutIcon,
    MenuIcon,
    CloseIcon,
} from './SharedComponents';
import { useProfileVolunteer } from '../../../core/Volunteer/usecase/useProfileVolunteer';
import {AuthContext} from "../AuthContext";

const VolunteerLayout = () => {
    const { id } = useParams();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [navItems, setNavItems] = useState([]);
    const [authUser, setAuthUser] = useState(null);
    const { auth } = useContext(AuthContext);
    const { fetchProfileVolunteer, user, loading, error } = useProfileVolunteer(id);

    console.log( loading);


    useEffect(() => {
        fetchProfileVolunteer();


    }, [id]);

    useEffect(() => {

         if (auth.isAuthenticated) {
     setAuthUser( auth.user);

      }


        if (auth.isAuthenticated && authUser && authUser.id===parseInt(id) && authUser.roles.some(role => role.name === 'Volunteer')) {
            setNavItems([
                { label: 'My Profile', icon: ProfileIcon, path: `/volunteer/${id}/profile` },
                { label: 'Notifications', icon: NotificationIcon, path: `/volunteer/${id}/notifications` },
                { label: 'All My Feedback', icon: FeedbackIcon, path: `/volunteer/${id}/feedback` },
                { label: 'All My Participations', icon: EventIcon, path: `/volunteer/${id}/participations` },
                { label: 'All My Events', icon: EventIcon, path: `/volunteer/${id}/myEvents` },
                { label: 'Edit Profile', icon: EditIcon },
            ]);
            console.log( );
        } else {
            setNavItems([
                { label: 'My Profile', icon: ProfileIcon, path: `/volunteer/${id}/profile` },
            ]);

           // console.log( authUser.id==id);
        }
    }, [auth.isAuthenticated,id,authUser]);

    // Loading state
    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-black text-white">
                <p>Loading profile...</p>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-black text-red-500">
                <p>Error loading profile: {error}</p>
            </div>
        );
    }

    // If user is null (just in case)
    if (!user) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-black text-white">
                <p>No user data available.</p>
            </div>
        );
    }

    /*    const navItems = [
            {label: 'My Profile', icon: ProfileIcon, path: `/volunteer/${id}/profile`},
            {label: 'Notifications', icon: NotificationIcon, path: `/volunteer/${id}/notifications`},
            {label: 'All My Feedback', icon: FeedbackIcon, path: `/volunteer/${id}/feedback`},
            {label: 'All My Participations', icon: EventIcon, path: `/volunteer/${id}/participations`},
            {label: 'Edit Profile', icon: EditIcon},
        ];

*/

    const handleCloseSidebar = () => setSidebarOpen(false);

    return (
        <div className="flex min-h-screen bg-black text-white flex-col lg:flex-row ">
            {/* Toggle Button */}
            <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden fixed top-4 left-4 z-30 bg-blue-600 p-2 rounded-md"
            >
                <MenuIcon className="w-6 h-6" />
            </button>

            {/* Sidebar */}
            <aside
                className={`  fixed top-16 bottom-0 left-0 z-0 w-64 bg-[#111111] p-6 flex flex-col justify-between transform transition-transform duration-300 ease-in-out ${
                    sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                } lg:translate-x-0  lg:overflow-y-auto lg:static lg:flex  `}
            >
                <div >
                    <div className="flex items-center mb-10 ">
                        <img
                            className="w-10 h-10 rounded-full mr-3"
                            src="https://ui-avatars.com/api/?name=Jese+Leos&background=0D8ABC&color=fff"
                            alt="User avatar"
                        />
                        <div>
                            <p className="font-semibold text-white">{user.name}</p>
                            <p className="text-sm text-gray-400">{user.email}</p>
                        </div>
                    </div>

                    {/* Sidebar nav */}
                    <nav className="flex flex-col space-y-2 ">
                        {navItems.map(({ label, icon: Icon, path }) => (
                            <button
                                key={label}
                                onClick={() => {
                                    handleCloseSidebar();
                                    if (label === 'Edit Profile') setEditModalOpen(true);
                                }}
                                className="flex items-center w-full text-left py-2 px-4 rounded-lg text-gray-400 hover:bg-gray-700"
                            >
                                <Icon className="w-5 h-5 mr-3" />
                                {path ? <Link to={path}>{label}</Link> : label}
                            </button>
                        ))}
                    </nav>
                </div>

                <Link
                    to="/logout"
                    onClick={handleCloseSidebar}
                    className="flex items-center py-2 px-4 text-red-500 hover:bg-gray-700 rounded-lg"
                >
                    <LogoutIcon className="w-5 h-5 mr-3" />
                    Log Out
                </Link>

                <button
                    onClick={() => setSidebarOpen(false)}
                    className="absolute top-4 right-4 text-gray-400 hover:text-white lg:hidden"
                >
                    <CloseIcon className="w-6 h-6" />
                </button>
            </aside>

            {sidebarOpen && (
                <div
                    onClick={handleCloseSidebar}
                    className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
                />
            )}

            {/* Main Content */}
            <main className="flex-1 p-6 overflow-y-auto">
                <Outlet context={{user,authUser}} />
            </main>

            {/* Modal */}
            <EditProfileModal
                isOpen={isEditModalOpen}
                onClose={() => setEditModalOpen(false)}
                user={authUser}
                onSave={(data) => {
                    console.log('Saved profile:', data);
                    setEditModalOpen(false);
                    // Optional: Update user data or send to API
                }}
            />
        </div>
    );
};

export default VolunteerLayout;
