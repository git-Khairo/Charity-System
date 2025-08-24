import { useEffect, useState } from "react";
import useGet from '../../../services/API/useGet';
import { Link, useParams } from "react-router-dom";
import useFilter from "../../../services/Hooks/useFilter";

const DonationRequests = () => {
  const { get, loading, error } = useGet();
  const [donations, setDonations] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all donations'); // State for selected status
  const { id } = useParams();

  const options = [
    'all donations',
    'pending',
    'accepted',
    'rejected'
  ];

  // Use the useFilter hook
  const { filteredData, isFilterActive } = useFilter({
    data: donations || [], // Pass donations data (ensure it's an array)
    selectedCategory: 'all', // Not filtering by category, so set to 'all'
    statusFilter: statusFilter === 'all donations' ? 'All' : statusFilter // Map 'all donations' to 'All' for the hook
  });

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const donationData = await get("/api/donations");
        setDonations(donationData.donations);
      } catch (err) {
        console.error("Error fetching donations:", err);
      }
    };

    fetchDonations();
  }, []);

  if (loading) return <p className="p-6">Loading donation details...</p>;
  if (error) return <p className="p-6 text-red-600">Error: {error}</p>;
  if (!donations) return <p className="p-6">Donation not found.</p>;

  return (
    <div className="p-6 space-y-4">
      <div className="flex justify-between">
        <h2 className="text-xl font-semibold mb-4">Donation Requests</h2>

        <select
          className="inline px-3 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md cursor-pointer"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)} // Update statusFilter on change
        >
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      {filteredData.length === 0 && isFilterActive ? (
        <p className="p-6">No donations match the selected status.</p>
      ) : (
        filteredData.map((donation) => (
          <div
            key={donation.id}
            className="flex justify-between items-center p-4 border rounded-lg shadow-sm bg-white"
          >
            <div>
              <p className="font-medium">{donation.name}</p>
              <p className="text-sm text-gray-600">
                Amount: ${donation.amount} | Method:{" "}
                <span className="capitalize">{donation.image ? 'bank invoice' : 'online payment'}</span>
              </p>
              <p className="text-xs mt-1">
                Status:{" "}
                <span className="font-semibold">
                  {donation.status}
                </span>
              </p>
            </div>

            <div className="flex gap-2">
              <Link
                to={`/dashboard/${id}/donation/details/${donation.id}`}
                className="inline-block mt-2 px-3 py-1.5 text-sm font-medium text-white bg-[#002366] rounded-lg shadow-md hover:bg-[#001a4d] hover:shadow-lg transition duration-200"
              >
                View Donation
              </Link>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default DonationRequests;