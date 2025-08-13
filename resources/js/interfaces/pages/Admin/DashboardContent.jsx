
import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import Chart from 'chart.js/auto';

const DashboardContent = () => {
    // State for chart data
    const [chartData, setChartData] = useState({
        Volunteers: {
            label: 'Volunteers',
            data: [120, 150, 180, 220, 200, 250, 280, 300, 280, 320, 350, 400],
            borderColor: 'rgb(79, 70, 229)',
            backgroundColor: null,
            pointBackgroundColor: 'rgb(79, 70, 229)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(79, 70, 229)',
            tension: 0.4,
            fill: true,
            borderWidth: 2,
            hidden: false,
        },
        Donors: {
            label: 'Donors',
            data: [80, 90, 110, 100, 120, 140, 160, 150, 170, 190, 210, 200],
            borderColor: 'rgb(34, 197, 94)',
            backgroundColor: null,
            pointBackgroundColor: 'rgb(34, 197, 94)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(34, 197, 94)',
            tension: 0.4,
            fill: true,
            borderWidth: 2,
            hidden: false,
        },
        Beneficiaries: {
            label: 'Beneficiaries',
            data: [40, 45, 50, 48, 55, 60, 58, 62, 65, 70, 68, 75],
            borderColor: 'rgb(239, 68, 68)',
            backgroundColor: null,
            pointBackgroundColor: 'rgb(239, 68, 68)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(239, 68, 68)',
            tension: 0.4,
            fill: true,
            borderWidth: 2,
            hidden: true,
        },
    });

    // State for checkbox visibility
    const [checkboxes, setCheckboxes] = useState({
        Volunteers: true,
        Donors: true,
        Beneficiaries: false,
    });

    // State for selected year
    const currentYear = new Date().getFullYear();
    const availableYears = Array.from({ length: 5 }, (_, i) => `${currentYear - i}`);
    const [selectedYear, setSelectedYear] = useState(`${currentYear}`);

    // State for dashboard metrics
    const [metrics, setMetrics] = useState({
        totalVolunteers: { value: 1254 },
        totalDonors: { value: 867 },
        totalBeneficiaries: { value: 452 },
        totalDonations: { value: 82340 },
    });

    // State for recent requests
    const [requests, setRequests] = useState([
        { id: 1, type: 'New Volunteer Application', details: 'John Doe - Food Drive', status: 'pending' },
        { id: 2, type: 'Donation Request', details: 'Jane Smith - $100', status: 'pending' },
        { id: 3, type: 'Beneficiary Application', details: 'The Miller Family', status: 'pending' },
        { id: 4, type: 'New Volunteer Application', details: 'Emily White - Community Garden', status: 'pending' },
    ]);

    // Chart.js ref
    const chartRef = useRef(null);
    const chartInstanceRef = useRef(null);

    // Initialize Chart.js
    useEffect(() => {
        const ctx = chartRef.current.getContext('2d');

        // Create gradients
        const gradientBg1 = ctx.createLinearGradient(0, 0, 0, 350);
        gradientBg1.addColorStop(0, 'rgba(79, 70, 229, 0.3)');
        gradientBg1.addColorStop(1, 'rgba(79, 70, 229, 0)');

        const gradientBg2 = ctx.createLinearGradient(0, 0, 0, 350);
        gradientBg2.addColorStop(0, 'rgba(34, 197, 94, 0.3)');
        gradientBg2.addColorStop(1, 'rgba(34, 197, 94, 0)');

        const gradientBg3 = ctx.createLinearGradient(0, 0, 0, 350);
        gradientBg3.addColorStop(0, 'rgba(239, 68, 68, 0.3)');
        gradientBg3.addColorStop(1, 'rgba(239, 68, 68, 0)');

        // Update chartData with gradients
        setChartData((prev) => ({
            ...prev,
            Volunteers: { ...prev.Volunteers, backgroundColor: gradientBg1 },
            Donors: { ...prev.Donors, backgroundColor: gradientBg2 },
            Beneficiaries: { ...prev.Beneficiaries, backgroundColor: gradientBg3 },
        }));

        // Initialize chart
        chartInstanceRef.current = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [
                    chartData.Volunteers,
                    chartData.Donors,
                    chartData.Beneficiaries,
                ].filter((dataset) => !dataset.hidden),
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: { beginAtZero: true, grid: { drawBorder: false } },
                    x: { grid: { display: false } },
                },
                plugins: { legend: { display: false } },
                interaction: { intersect: false, mode: 'index' },
            },
        });

        return () => {
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
            }
        };
    }, []);

    // Update chart when checkboxes or chartData change
    useEffect(() => {
        if (chartInstanceRef.current) {
            chartInstanceRef.current.data.datasets = [
                chartData.Volunteers,
                chartData.Donors,
                chartData.Beneficiaries,
            ].filter((dataset) => !dataset.hidden);
            chartInstanceRef.current.update();
        }
    }, [chartData]);

    // Handle checkbox changes
    const handleCheckboxChange = (label) => {
        const newCheckedValue = !checkboxes[label];
        setCheckboxes((prev) => ({
            ...prev,
            [label]: newCheckedValue,
        }));
        setChartData((prev) => ({
            ...prev,
            [label]: { ...prev[label], hidden: !newCheckedValue },
        }));
    };

    // Handle year selection
    const handleYearChange = (e) => {
        setSelectedYear(e.target.value);
    };

    // Handle button clicks for Accept/Reject
    const handleRequestAction = (id, action) => {
        console.log(`Request ${id} ${action}ed`);
        setRequests((prev) =>
            prev.map((request) =>
                request.id === id ? { ...request, status: action.toLowerCase() } : request
            )
        );
    };

    return (
        <main >
            <header className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            </header>

            {/* Metrics Cards */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {Object.entries(metrics).map(([key, { value }]) => (
                    <div key={key} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-lg transition-shadow duration-300">
                        <h3 className="text-base font-medium text-gray-500">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                        </h3>
                        <p className="text-3xl font-bold text-gray-900 mt-2">
                            {key === 'totalDonations' ? `$${value.toLocaleString()}` : value.toLocaleString()}
                        </p>
                    </div>
                ))}
            </div>

            {/* Statistics Card */}
            <div className="mt-8 grid grid-cols-1 gap-6">
                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-lg transition-shadow duration-300">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                        <h2 className="text-xl font-bold text-gray-900">Statistics</h2>
                        <div className="flex items-center gap-6 mt-4 sm:mt-0">
                            <div className="flex items-center gap-4">
                                {Object.keys(checkboxes).map((label) => (
                                    <label key={label} className="flex items-center text-sm text-gray-500">
                                        <input
                                            type="checkbox"
                                            className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-offset-0 focus:ring-indigo-200 focus:ring-opacity-50"
                                            checked={checkboxes[label]}
                                            onChange={() => handleCheckboxChange(label)}
                                        />
                                        <span className="ml-2">{label}</span>
                                    </label>
                                ))}
                            </div>
                            <select
                                className="appearance-none w-full sm:w-32 bg-white border border-gray-200 hover:border-gray-400 px-4 py-2.5 pr-8 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 transition-all duration-200"
                                value={selectedYear}
                                onChange={handleYearChange}
                            >
                                {availableYears.map((year) => (
                                    <option key={year} value={year}>
                                        {year}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="h-96">
                        <canvas ref={chartRef}></canvas>
                    </div>
                </div>

                {/* Recent Requests Card */}
                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-lg transition-shadow duration-300">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Requests</h2>
                    <div className="space-y-4">
                        {requests.map((request, index) => (
                            <React.Fragment key={request.id}>
                                <div className="flex items-start justify-between">
                                    <div>
                                        <p className="font-semibold text-sm text-gray-900">{request.type}</p>
                                        <p className="text-xs text-gray-500 mt-1">{request.details}</p>
                                        {request.status !== 'pending' && (
                                            <p className="text-xs font-medium text-gray-600 mt-1">
                                                Status: {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                                            </p>
                                        )}
                                    </div>
                                    {request.status === 'pending' ? (
                                        <div className="flex gap-2 flex-shrink-0">
                                            <button
                                                className="bg-green-50 text-green-600 py-1.5 px-4 rounded-md text-sm font-semibold hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-colors duration-200"
                                                onClick={() => handleRequestAction(request.id, 'Accept')}
                                                aria-label={`Accept ${request.type}`}
                                            >
                                                Accept
                                            </button>
                                            <button
                                                className="bg-red-50 text-red-600 py-1.5 px-4 rounded-md text-sm font-semibold hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-colors duration-200"
                                                onClick={() => handleRequestAction(request.id, 'Reject')}
                                                aria-label={`Reject ${request.type}`}
                                            >
                                                Reject
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="text-sm text-gray-500">Processed</div>
                                    )}
                                </div>
                                {index < requests.length - 1 && <div className="border-t border-gray-200"></div>}
                            </React.Fragment>
                        ))}
                        <Link to="/dashboard/requests" className="block text-center text-sm font-semibold text-indigo-600 hover:underline pt-2">
                            View all requests
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
};

const Dashboard = () => {
    // State for sidebar visibility
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [openMenus, setOpenMenus] = useState({});
    const location = useLocation();

    // Navigation array
    const navItems = [
        {
            label: 'Dashboard',
            path: '/dashboard',
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
                { label: 'Create an Event', path: '/dashboard/events/create' },
                { label: 'Update an Event', path: '/dashboard/events/update' },
                { label: 'Delete an Event', path: '/dashboard/events/delete' },
            ],
        },
        {
            label: 'Charity Info',
            path: '/dashboard/charity-info',
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
                { label: 'Volunteer Requests', path: '/dashboard/requests/volunteers' },
                { label: 'Beneficiary Requests', path: '/dashboard/requests/beneficiaries' },
                { label: 'Accept Donations', path: '/dashboard/requests/donations' },
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
                { label: 'Activity Report', path: '/dashboard/reports/activity' },
                { label: 'Financial Report', path: '/dashboard/reports/financial' },
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
                        <h1 className="text-lg font-bold text-gray-900">Helping Hands</h1>
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
                <header className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-gray-900">
                        {navItems.find(item => item.path === location.pathname ||
                            (item.subItems && item.subItems.some(sub => sub.path === location.pathname))
                        )?.label || 'Dashboard'}
                    </h1>
                    <button
                        className="lg:hidden p-2 rounded-md hover:bg-gray-200 transition-colors duration-200"
                        onClick={toggleSidebar}
                        aria-label="Toggle sidebar"
                    >
                        <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" strokeLinejoin="round"></path>
                        </svg>
                    </button>
                </header>
                <Outlet />
            </main>
        </div>
    );
};

export default DashboardContent;
