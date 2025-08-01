

import React from "react";
import {statusColor} from "../../../../core/Beneficiary/usecase/BeneficiaryData";


export default function Applications({ filteredApplications, filterStatus, setFilterStatus, darkMode }) {
    console.log(filteredApplications);
    return (
        <section
            className="bg-white rounded-xl shadow p-6"
            style={{ backgroundColor: darkMode ? "#1e293b" : "white" }}
        >
            <h2 className="text-2xl font-bold mb-4">My Applications</h2>

            {/* Filter Buttons */}
            <div className="mb-4 flex flex-wrap gap-3">
                {["All", "Under Review", "Accepted", "Rejected"].map((status) => (
                    <button
                        key={status}
                        onClick={() => setFilterStatus(status)}
                        className={`px-4 py-1 rounded-full border transition font-semibold ${
                            filterStatus === status
                                ? "bg-blue-600 text-white border-blue-600"
                                : "bg-transparent text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white"
                        }`}
                    >
                        {status}
                    </button>
                ))}
            </div>

            {/* List */}


            {filteredApplications.length === 0 ? (
                <p className="text-center text-gray-500">No applications found</p>
            ) : (
                <ul className="space-y-6">
                    {filteredApplications.map((app) => (
                        <li
                            key={app.id}
                            className={`rounded-2xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center transition duration-300 ease-in-out border shadow-lg hover:shadow-xl ${
                                darkMode
                                    ? "bg-[#1f2937] border-gray-700 text-gray-100"
                                    : "bg-white border-gray-200 text-gray-800"
                            }`}
                        >
                            <div className="mb-4 md:mb-0">
                                <h3 className="text-lg font-bold mb-1">{app.orgName}</h3>
                                <p className="text-sm opacity-80">{app.details}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                                    Date: {app.date}
                                </p>
                                <p className={`text-base font-semibold ${statusColor[app.status]}`}>
                                    Status: {app.status}
                                </p>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </section>

    );
}
