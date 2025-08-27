import { useEffect, useState } from 'react';
import useGet from '../../../services/API/useGet';

const SuperDashboardContent = () => {
    const { get, loading, error } = useGet();
    const [beneStats, setBeneStats] = useState([]);
    const [volunStats, setVolunStats] = useState([]);
    const [charitiesStats, setCharitiesStats] = useState([]);

    // Compute max values and corresponding charity names
    const maxBene = beneStats.length > 0 
        ? beneStats.reduce((max, item) => item.volunteer_count > max.volunteer_count ? item : max, beneStats[0])
        : null;
    const maxBeneCharity = maxBene && charitiesStats.find(charity => charity.id === maxBene.charity_id)?.name || 'N/A';

    const maxVolun = volunStats.length > 0 
        ? volunStats.reduce((max, item) => item.volunteer_count > max.volunteer_count ? item : max, volunStats[0])
        : null;
    const maxVolunCharity = maxVolun && charitiesStats.find(charity => charity.id === maxVolun.charity_id)?.name || 'N/A';

    const maxCharity = charitiesStats.length > 0 
        ? charitiesStats.reduce((max, item) => (item.report?.total_donation_amount || 0) > (max.report?.total_donation_amount || 0) ? item : max, charitiesStats[0])
        : null;
    const maxCharityName = maxCharity?.name || 'N/A';
    const maxCharityNumber = maxCharity?.report?.total_donation_amount;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const bene = await get('/api/super_admin/charity/beneficiary-in-charity');
                const volun = await get('/api/super_admin/charity/volunteer-in-events');
                const charities = await get('/api/super_admin/charity/charity_stat');
                
                if (!bene || !volun || !charities) {
                    alert('Something went wrong');
                    return;
                }
                
                // Ensure report is an array before setting state
                setBeneStats(Array.isArray(bene.report) ? bene.report : []);
                setVolunStats(Array.isArray(volun.report) ? volun.report : []);
                setCharitiesStats(Array.isArray(charities.report) ? charities.report : []);

            } catch (err) {
                alert("Error: " + err.message);
            }
        };

        fetchData();
    }, []);

    return ( 
        <main>
            <header className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            </header>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-lg transition-shadow duration-300">
                    <h3 className="text-base font-medium text-gray-500">Top Request</h3>
                    <p className="text-3xl font-bold text-gray-900 mt-2">
                        {loading ? 'Loading...' : maxBene ? maxBene.accepted_count : 'N/A'}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">{loading ? 'Loading...' : maxBeneCharity}</p>
                </div>
                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-lg transition-shadow duration-300">
                    <h3 className="text-base font-medium text-gray-500">Top Participation</h3>
                    <p className="text-3xl font-bold text-gray-900 mt-2">
                        {loading ? 'Loading...' : maxVolun ? maxVolun.volunteer_count : 'N/A'}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">{loading ? 'Loading...' : maxVolunCharity}</p>
                </div>
                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-lg transition-shadow duration-300">
                    <h3 className="text-base font-medium text-gray-500">Top Performing Charity</h3>
                    <p className="text-3xl font-bold text-gray-900 mt-2">
                        {loading ? 'Loading...' : maxCharityNumber >= 0 ? maxCharityNumber + '$' : 'N/A'}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">{loading ? 'Loading...' : maxCharityName}</p>
                </div>
            </div>

            <div className="mt-8 bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Charity Statistics</h2>
                {loading ? (
                    <p className="text-gray-600">Loading charity stats...</p>
                ) : charitiesStats.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Charity Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Volunteers</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Beneficiaries</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Donation Amount</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {charitiesStats.map((charity) => (
                                    <tr key={charity.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{charity.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{charity.report?.total_volunteers || 0}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{charity.report?.total_beneficiaries || 0}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{charity.report?.total_donation_amount ? `$${charity.report.total_donation_amount}` : '$0'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="text-gray-600">No charity stats available.</p>
                )}
            </div>
        </main>
    );
};

export default SuperDashboardContent;