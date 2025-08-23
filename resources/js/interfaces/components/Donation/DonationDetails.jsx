import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import useGet from "../../../services/API/useGet";

const DonationDetails = () => {
  const { id, don } = useParams();
  const { get, loading, error } = useGet();
  const [donation, setDonation] = useState(null);

  useEffect(() => {
    const fetchDonation = async () => {
      try {
        const data = await get(`/api/donation/${don}`);
        console.log(data);
        setDonation(data.donations);
      } catch (err) {
        console.error("Error fetching donation details:", err);
      }
    };

    fetchDonation();
  }, [don]);

  if (loading) return <p className="p-6">Loading donation details...</p>;
  if (error) return <p className="p-6 text-red-600">Error: {error}</p>;
  if (!donation) return <p className="p-6">Donation not found.</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold text-[#002366] mb-4">Donation Details</h2>

      <div className="p-4 border rounded-lg bg-white shadow-sm space-y-3">
        <p><span className="font-semibold">Donor:</span> {donation.name}</p>
        <p><span className="font-semibold">Email:</span> {donation.email}</p>
        <p><span className="font-semibold">Amount:</span> ${donation.amount}</p>
        <p>
          <span className="font-semibold">Method:</span>{" "}
          <span className="capitalize">{donation.image ? 'bank invoice' : 'online payment'}</span>
        </p>
        <p>
          <span className="font-semibold">Status:</span>{" "}
          <span
            className={`font-semibold ${
              donation.status === "accepted"
                ? "text-green-600"
                : donation.status === "rejected"
                ? "text-red-600"
                : "text-yellow-600"
            }`}
          >
            {donation.status}
          </span>
        </p>

        {donation.image && (
          <div>
            <span className="font-semibold">Proof:</span>
            <img
              src={donation.image}
              alt="Donation proof"
              className="mt-2 max-h-64 rounded-lg border"
            />
          </div>
        )}
      </div>

    <div className="flex justify-between gap-2">
        {donation.image && (
            <div className="space-x-3">
              <button
                onClick={() => handleDecision(donation.id, "accepted")}
                className="px-3 py-1 rounded bg-green-500 text-white hover:bg-green-600"
              >
                Accept
              </button>
              <button
                onClick={() => handleDecision(donation.id, "rejected")}
                className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600"
              >
                Reject
              </button>
              </div>
        )}
                <Link
                    to={`/dashboard/${id}/requests/donations`}
                    className="inline-block px-4 py-2 text-sm font-medium text-white bg-[#002366] rounded-lg shadow hover:bg-[#001a4d] transition duration-200"
                >
                    ← Back to Donations
                </Link>
    </div>

    </div>
  );
};

export default DonationDetails;
