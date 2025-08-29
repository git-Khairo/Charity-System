import React, { useState, useEffect, useRef } from 'react';
import { Link, useOutletContext, useParams } from 'react-router-dom';
import Chart from 'chart.js/auto';
import { useFetchCharityDashboardData } from "../../../core/Admin/usecase/useFetchCharityDashboardData";
import ParticipationCard from "../../components/Admin/ParticipationCard";
import {useFetchParticipationRequests} from "../../../core/Admin/usecase/useFetchParticipationRequests";

const DashboardContent = () => {
    const { authUser } = useOutletContext();
    const { id } = useParams();
    console.log(authUser);

    const currentYear = new Date().getFullYear();
    const availableYears = Array.from({ length: 5 }, (_, i) => `${currentYear - i}`);
    const [selectedYear, setSelectedYear] = useState(`${currentYear}`);

    const { fetchParticipationRequests, participationData } = useFetchParticipationRequests({ id });
    console.log(participationData);
    const [selectedParticipationRequest, setSelectedParticipationRequest] = useState(null);

    useEffect(() => {
        fetchParticipationRequests();
    }, [id]);

    const openParticipationCard = (request) => setSelectedParticipationRequest(request);
    const closeParticipationCard = () => setSelectedParticipationRequest(null);

    const { setChartData, chartData, metrics, checkboxes, setCheckboxes, loading, error } =
        useFetchCharityDashboardData(selectedYear);

    const chartRef = useRef(null);
    const chartInstanceRef = useRef(null);

    // Initialize or update Chart.js
    useEffect(() => {
        if (!chartData || !chartData.Volunteers) return;
        const canvas = chartRef.current;
        if (!canvas || !canvas.isConnected) return; // Make sure it's in the DOM

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const gradientBg1 = ctx.createLinearGradient(0, 0, 0, 350);
        gradientBg1.addColorStop(0, 'rgba(79, 70, 229, 0.3)');
        gradientBg1.addColorStop(1, 'rgba(79, 70, 229, 0)');

        const gradientBg2 = ctx.createLinearGradient(0, 0, 0, 350);
        gradientBg2.addColorStop(0, 'rgba(34, 197, 94, 0.3)');
        gradientBg2.addColorStop(1, 'rgba(34, 197, 94, 0)');

        const gradientBg3 = ctx.createLinearGradient(0, 0, 0, 350);
        gradientBg3.addColorStop(0, 'rgba(239, 68, 68, 0.3)');
        gradientBg3.addColorStop(1, 'rgba(239, 68, 68, 0)');

        const datasets = [
            { ...chartData.Volunteers, backgroundColor: gradientBg1, hidden: !checkboxes.Volunteers },
            { ...chartData.Donors, backgroundColor: gradientBg2, hidden: !checkboxes.Donors },
            { ...chartData.Beneficiaries, backgroundColor: gradientBg3, hidden: !checkboxes.Beneficiaries },
        ];

        if (chartInstanceRef.current) {
            chartInstanceRef.current.data.datasets = datasets;
            chartInstanceRef.current.update();
        } else {
            chartInstanceRef.current = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    datasets,
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: { y: { beginAtZero: true }, x: {} },
                    plugins: { legend: { display: false } },
                },
            });
        }

        return () => {
            chartInstanceRef.current?.destroy();
            chartInstanceRef.current = null;
        };
    }, [chartData, checkboxes]);

    const handleCheckboxChange = (label) => {
        const newCheckedValue = !checkboxes[label];
        setCheckboxes((prev) => ({ ...prev, [label]: newCheckedValue }));
    };

    const handleYearChange = (e) => setSelectedYear(e.target.value);

    const handleRequestAction = (id, action) => {
        setRequests((prev) =>
            prev.map((request) =>
                request.id === id ? { ...request, status: action.toLowerCase() } : request
            )
        );
    };

    // Auth check
    if (authUser.id !== parseInt(id) || authUser.roles.every(role => role.name !== 'Admin')) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-black text-white">
                <p>Access Denied</p>
            </div>
        );
    }

    if (loading) return <div className="flex items-center justify-center min-h-screen bg-black text-white">Loading profile...</div>;
    if (error) return <div className="flex items-center justify-center min-h-screen bg-black text-red-500">Error: {error}</div>;

    return (
        <main>
            <header className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            </header>

            {/* Metrics Cards */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {Object.entries(metrics).map(([key, { value }]) => (
                    <div key={key} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-lg transition-shadow duration-300">
                        <h3 className="text-base font-medium text-gray-500">{key.replace(/([A-Z])/g, ' $1').trim()}</h3>
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
                                {Object.keys(checkboxes).map(label => (
                                    <label key={label} className="flex items-center text-sm text-gray-500">
                                        <input
                                            type="checkbox"
                                            className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-200 focus:ring-opacity-50"
                                            checked={checkboxes[label]}
                                            onChange={() => handleCheckboxChange(label)}
                                        />
                                        <span className="ml-2">{label}</span>
                                    </label>
                                ))}
                            </div>
                            <select
                                className="appearance-none w-full sm:w-32 bg-white border border-gray-200 hover:border-gray-400 px-4 py-2.5 pr-8 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 transition-all duration-200"
                                value={selectedYear}
                                onChange={handleYearChange}
                            >
                                {availableYears.map(year => <option key={year} value={year}>{year}</option>)}
                            </select>
                        </div>
                    </div>
                    <div className="h-96">
                        <canvas ref={chartRef}></canvas>
                    </div>
                </div>

                {/* Recent Requests Card */}{/* Participation Requests Card */}
                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-lg transition-shadow duration-300">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Participation Requests</h2>
                    <div className="space-y-4">
                        {participationData.slice(0, 4).map((request) => (
                            <div key={request.id} className="flex items-start justify-between">
                                <div>
                                    <p className="font-semibold text-sm text-gray-900">{request.full_name}</p>
                                    <p className="text-xs text-gray-500 mt-1">Study: {request.study}</p>
                                    <p className="text-xs text-gray-500">Email: {request.email}</p>
                                    <p className="text-xs text-gray-400 mt-1">
                                        {new Date(request.created_at).toLocaleDateString()}
                                    </p>
                                </div>
                                <button
                                    onClick={() => openParticipationCard(request)}
                                    className="bg-blue-600 text-white py-1.5 px-4 rounded-md text-sm font-semibold hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
                                >
                                    View
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Participation Card Modal */}
                {selectedParticipationRequest && (
                    <ParticipationCard
                        isOpen={!!selectedParticipationRequest}
                        onClose={closeParticipationCard}
                        request={selectedParticipationRequest}
                        onRefresh={fetchParticipationRequests}
                    />
                )}
            </div>
        </main>
    );
};

export default DashboardContent;
