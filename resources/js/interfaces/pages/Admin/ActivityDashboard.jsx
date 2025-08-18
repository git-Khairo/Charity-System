import React, { useState, useEffect, useRef, useMemo } from "react";
import Chart from "chart.js/auto";
import {useGetActivity} from "../../../core/Admin/usecase/useGetActivity";



const ActivityDashboard = () => {
    const currentYear = new Date().getFullYear();
    const availableYears = Array.from({ length: 5 }, (_, i) => `${currentYear - i}`);
    const [selectedYear, setSelectedYear] = useState(`${currentYear}`);
    const { fetchActivity, activityData, loading } = useGetActivity();

    useEffect(() => {
        fetchActivity(selectedYear);
    }, [selectedYear]);


    const chartRef = useRef(null);
    const chartInstanceRef = useRef(null);

    const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const dataForYear = activityData;
    const totalEvents = useMemo(
        () => dataForYear.reduce((sum, val) => sum + val, 0),
        [dataForYear]
    );

    // Counter animation state
    const [displayedTotal, setDisplayedTotal] = useState(totalEvents);

    useEffect(() => {
        let start = 0;
        let startTime = null;

        const duration = 800; // animation duration (ms)

        const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const value = Math.floor(progress * totalEvents);
            setDisplayedTotal(value);

            if (progress < 1) requestAnimationFrame(animate);
        };

        requestAnimationFrame(animate);
    }, [totalEvents]);

    // Chart.js setup
    useEffect(() => {
        if (!chartRef.current) return;

        const ctx = chartRef.current.getContext("2d");
        const gradient = ctx.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, "rgba(59,130,246,0.4)");
        gradient.addColorStop(1, "rgba(59,130,246,0)");

        if (chartInstanceRef.current) {
            chartInstanceRef.current.data.datasets[0].data = dataForYear;
            chartInstanceRef.current.update();
        } else {
            chartInstanceRef.current = new Chart(ctx, {
                type: "line",
                data: {
                    labels,
                    datasets: [
                        {
                            label: "Events",
                            data: dataForYear,
                            fill: true,
                            borderColor: "rgba(59,130,246,1)",
                            backgroundColor: gradient,
                            tension: 0.4,
                            pointBackgroundColor: "rgba(59,130,246,1)",
                            pointRadius: 5,
                            pointHoverRadius: 7,
                        },
                    ],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    interaction: { mode: "index", intersect: false },
                    plugins: {
                        legend: { display: false },
                        tooltip: {
                            backgroundColor: "#111827",
                            titleColor: "#fff",
                            bodyColor: "#d1d5db",
                            padding: 12,
                            borderWidth: 1,
                            borderColor: "#374151",
                        },
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            grid: { color: "rgba(229,231,235,0.5)" },
                            ticks: { color: "#6b7280" },
                        },
                        x: {
                            grid: { display: false },
                            ticks: { color: "#6b7280" },
                        },
                    },
                },
            });
        }

        return () => {
            chartInstanceRef.current?.destroy();
            chartInstanceRef.current = null;
        };
    }, [dataForYear, selectedYear]);

    return (
        <div className="p-6 bg-white rounded-2xl shadow-lg">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">📊 Events Activity</h2>
                <div className="relative">
                    <select
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(e.target.value)}
                        className="appearance-none px-4 py-2 pr-8 border border-gray-200 rounded-lg shadow-sm
                       bg-gray-50 text-gray-700 font-medium hover:border-gray-400
                       focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                    >
                        {availableYears.map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
            ▼
          </span>
                </div>
            </div>

            {/* Total Events */}
            <div className="mb-6 flex items-center gap-3">
                <div className="p-3 bg-blue-100 rounded-lg">
                    <span className="text-blue-600 text-lg">📅</span>
                </div>
                <div>
                    <p className="text-sm text-gray-500">Total Events in {selectedYear}</p>
                    <p className="text-3xl font-extrabold text-gray-900 transition-all">
                        {displayedTotal}
                    </p>
                </div>
            </div>

            {/* Chart */}
            <div className="h-96">
                <canvas ref={chartRef}></canvas>
            </div>
        </div>
    );
};

export default ActivityDashboard;
