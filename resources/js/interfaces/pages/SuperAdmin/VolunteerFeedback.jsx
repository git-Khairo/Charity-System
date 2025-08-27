import { useEffect, useState } from 'react';
import useGet from '../../../services/API/useGet';
import { usePagination } from '../../../services/Hooks/usePagination';

const VolunteerFeedback = () => {
  const { get, loading, error } = useGet();
  const [feedbacks, setFeedbacks] = useState([]);
  const { currentPage, totalPages, paginatedData, paginate, nextPage, prevPage } = usePagination(feedbacks, 6);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await get('/api/super_admin/volunteer/feedbacks');
        if (!response?.feedback) {
          throw new Error('No feedback data received');
        }

        console.log(response.feedback);
        setFeedbacks(response.feedback);
      } catch (err) {
        console.error('Fetch error:', err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Volunteer Feedback</h1>

      {loading && <p className="text-gray-500">Loading feedback...</p>}
      {error && <p className="text-red-500 font-medium">Error: {error}</p>}
      {!loading && !error && feedbacks.length === 0 && (
        <p className="text-gray-500">No feedback available.</p>
      )}

      {!loading && !error && feedbacks.length > 0 && (
        <div className="space-y-6">
          {paginatedData.map((feedback) => (
            <div
              key={feedback.id}
              className="border rounded-lg p-5 shadow-md bg-white"
            >
              <h2 className="text-lg font-medium text-gray-800">{feedback.title}</h2>
              <p className="text-sm text-gray-600">
                Rating: {feedback.rating}/5
              </p>
              <p className="text-gray-700 mt-1">{feedback.description}</p>
              <p className="text-sm text-gray-500 mt-2">
                Event ID: {feedback.event_name} | Volunteer ID: {feedback.volunteer_name}
              </p>
              <p className="text-sm text-gray-400">
                Posted on: {new Date(feedback.created_at).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-between">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-md ${
              currentPage === 1
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            Previous
          </button>
          <div className="flex space-x-2">
            {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
              <button
                key={page}
                onClick={() => paginate(page)}
                className={`px-3 py-1 rounded-md ${
                  currentPage === page
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {page}
              </button>
            ))}
          </div>
          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-md ${
              currentPage === totalPages
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default VolunteerFeedback;