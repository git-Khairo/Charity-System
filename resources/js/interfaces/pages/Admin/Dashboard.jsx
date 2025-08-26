import {useState, useEffect, useContext} from 'react';
import {Link, useLocation, Outlet, useParams} from 'react-router-dom';
import {AuthContext} from "../../components/AuthContext";
import UpdateCharity from "../../components/Admin/UpdateCharity";

const Dashboard = () => {
    // State for sidebar visibility
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [openMenus, setOpenMenus] = useState({});
    const location = useLocation();
    const [authUser, setAuthUser] = useState({});
    const [charity, setCharity] = useState(null);
    const { auth } = useContext(AuthContext);
    const { id } = useParams();
    const [showCharityModal, setShowCharityModal] = useState(false); // modal state


    useEffect(() => {

        if (auth.isAuthenticated) {
            setAuthUser( auth.user);
        }

    }, [auth.isAuthenticated,authUser]);


    useEffect(() => {

        if (authUser) {
            setCharity( authUser.charity);
        }

    }, [authUser]);


    // Navigation array
    const navItems = [
        {
            label: 'Dashboard',
            path: `/dashboard/${authUser.id}`,
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
            ),
        },
        {
            label: 'Events',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
            ),
            subItems: [
                { label: 'Create an Event', path: `/dashboard/${id}/events/Create` },
                { label: 'Update an Event', path: `/dashboard/${id}/events/Update` },
                { label: 'Delete an Event', path: `/dashboard/${id}/events/delete` },
            ],
        },
        {
            label: 'Charity Info',
            action: () => setShowCharityModal(true), // open modal
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
            ),
        },
        {
            label: 'Requests',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
            ),
            subItems: [
                { label: 'Volunteer Requests', path: `/dashboard/${id}/requests/volunteers` },
                { label: 'Beneficiary Requests', path: `/dashboard/${id}/requests/beneficiaries` },
                { label: 'Accept Donations', path: `/dashboard/${id}/requests/donations` },
            ],
        },
        {
            label: 'Reports',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
            ),
            subItems: [
                { label: 'Activity Report', path: `/dashboard/${id}/reports/activity`},
                { label: 'Financial Report', path: `/dashboard/${id}/reports/financial` },
            ],
        },
    ];

    // Handle sidebar toggle
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    // Handle menu toggle
    const handleMenuToggle = (label) => {
        setOpenMenus((prev) => ({
            ...prev,
            [label]: !prev[label],
        }));
    };

    if (!authUser || !charity) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-black text-white">
                <p>No user data available.</p>
            </div>
        );
    }

    if(!authUser){
        return (
            <div className="flex items-center justify-center min-h-screen bg-black text-white">
                <p>Access Denied</p>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-gray-100 font-sans text-gray-900">
            {/* Sidebar */}
            <aside
                className={`fixed left-0 top-0 z-50 h-full w-64 bg-white border-r border-gray-200 flex flex-col transition-transform duration-300 ease-in-out transform lg:translate-x-0 ${
                    isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <div className="flex items-center gap-3 p-6 border-b border-gray-200">
                    <div className="p-2 bg-indigo-100 rounded-lg">
                        <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                            <path d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" strokeLinecap="round" strokeLinejoin="round"></path>
                        </svg>
                    </div>
                    <div className="flex flex-col">
                        <h1 className="text-lg font-bold text-gray-900">{charity.name.en}</h1>
                        <p className="text-xs text-gray-500">Admin Panel</p>
                    </div>
                </div>
                <nav className="flex flex-col gap-2 p-4">
                    {navItems.map((item) => (
                        <div key={item.label}>
                            {item.subItems ? (
                                <button
                                    onClick={() => handleMenuToggle(item.label)}
                                    className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-500 font-medium hover:bg-indigo-50 hover:text-indigo-600 transition-colors duration-200 w-full text-left ${
                                        openMenus[item.label] ? 'bg-indigo-50 text-indigo-600' : ''
                                    }`}
                                >
                                    {item.icon}
                                    <span>{item.label}</span>
                                    <svg
                                        className={`w-4 h-4 ml-auto transition-transform ${
                                            openMenus[item.label] ? 'rotate-180' : ''
                                        }`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                                    </svg>
                                </button>
                            ) : item.action ? (
                                <button
                                    onClick={item.action}
                                    className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-500 font-medium hover:bg-indigo-50 hover:text-indigo-600 transition-colors duration-200 w-full text-left`}
                                >
                                    {item.icon}
                                    <span>{item.label}</span>
                                </button>
                            ) : (
                                <Link
                                    to={item.path}
                                    className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-500 font-medium hover:bg-indigo-50 hover:text-indigo-600 transition-colors duration-200 ${
                                        location.pathname === item.path ? 'bg-indigo-50 text-indigo-600' : ''
                                    }`}
                                >
                                    {item.icon}
                                    <span>{item.label}</span>
                                </Link>
                            )}

                            {item.subItems && openMenus[item.label] && (
                                <div className="flex flex-col gap-1 ml-6 mt-1">
                                    {item.subItems.map((sub) => (
                                        <Link
                                            key={sub.label}
                                            to={sub.path}
                                            className={`flex items-center gap-3 px-4 py-2 text-sm text-gray-500 font-medium hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-colors duration-200 ${
                                                location.pathname === sub.path ? 'bg-indigo-50 text-indigo-600' : ''
                                            }`}
                                        >
                                            {sub.label}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </nav>
            </aside>

            {/* Main Content */}
            <main className="lg:ml-64 p-8 w-full transition-all duration-300">
                <Outlet context={{authUser,charity}} />
            </main>

            {/* Update Charity Modal */}
            {showCharityModal && (
                <UpdateCharity
                    onClose={() => setShowCharityModal(false)}
                    charityId={charity.id}
                    show={showCharityModal}
                />
            )}
        </div>


    );
};

export default Dashboard;
