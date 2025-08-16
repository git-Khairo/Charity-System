import React from "react";

const ParticipationRequests = () => {
    const participationData = [
        {
            id: 1,
            full_name: "John Doe",
            email: "john.doe@example.com",
            study: "Cardiovascular Health Study",
            created_at: "2024-07-29T10:30:00.000Z",
        },
        {
            id: 2,
            full_name: "Jane Smith",
            email: "jane.smith@example.com",
            study: "Diabetes Prevention Program",
            created_at: "2024-07-28T15:45:12.000Z",
        },
        {
            id: 3,
            full_name: "Peter Jones",
            email: "peter.jones@example.com",
            study: "Alzheimer's Disease Research",
            created_at: "2024-07-28T09:00:05.000Z",
        },
        {
            id: 4,
            full_name: "Mary Williams",
            email: "mary.williams@example.com",
            study: "Cancer Genetics Study",
            created_at: "2024-07-27T18:20:30.000Z",
        },
        {
            id: 5,
            full_name: "David Brown",
            email: "david.brown@example.com",
            study: "Mental Health in Young Adults",
            created_at: "2024-07-27T11:10:00.000Z",
        },
    ];

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    return (
        <div className="bg-gray-100 min-h-screen p-4 sm:p-6 md:p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
                    Participation Requests
                </h1>
                <div className="bg-white rounded-lg shadow">
                    <div className="divide-y divide-gray-200">
                        {participationData.map((request) => (
                            <div key={request.id} className="p-6 flex items-start space-x-4">
                                <div className="flex-1">
                                    <p className="text-base font-bold text-gray-900">
                                        {request.full_name}
                                    </p>
                                    <p className="text-sm text-gray-600 mt-1">
                                        Study: {request.study}
                                    </p>
                                    <p className="text-sm text-gray-600">Email: {request.email}</p>
                                    <p className="text-xs text-gray-400 mt-2">
                                        {formatDate(request.created_at)}
                                    </p>
                                </div>
                                <div>
                                    <a
                                        href={`/participation-details?id=${request.id}`}
                                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    >
                                        View Details
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ParticipationRequests;
