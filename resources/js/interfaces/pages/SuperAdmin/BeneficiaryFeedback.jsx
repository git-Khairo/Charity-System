import { useEffect, useState } from 'react';
import useGet from '../../../services/API/useGet';
import { usePagination } from '../../../services/Hooks/usePagination';
import useSort from '../../../services/Hooks/useSort';

const BeneficiaryFeedback = () => {
  const { get, loading, error } = useGet();
  const [feedbacks, setFeedbacks] = useState([]);
  const [lang, setLang] = useState(localStorage.getItem('lang'));
  const [sortBy, setSortBy] = useState('newest');
  
  // Flatten feedback for sorting
  const flattenedFeedbacks = feedbacks.flatMap(charity => 
    charity.beneficiary_feedback.map(feedback => ({
      ...feedback,
      charityName: charity.name[lang],
      charityAddress: charity.address[lang]
    }))
  );
  
  const { sortedData } = useSort({ data: flattenedFeedbacks, sortBy });
  
  // Reconstruct the charity structure after sorting
  const sortedFeedbacks = feedbacks.map(charity => ({
    ...charity,
    beneficiary_feedback: sortedData
      .filter(feedback => feedback.charityName === charity.name[lang])
      .map(feedback => ({
        id: feedback.id,
        title: feedback.title,
        rating: feedback.rating,
        description: feedback.description,
        created_at: feedback.created_at
      }))
  })).filter(charity => charity.beneficiary_feedback.length > 0);

  const { currentPage, totalPages, paginatedData, paginate, nextPage, prevPage } = usePagination(sortedFeedbacks, 3);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await get('/api/super_admin/charity/feedbacks');
        if (!response?.feedback) {
          throw new Error('No feedback data received');
        }
        setFeedbacks(response.feedback);
      } catch (err) {
        console.error('Fetch error:', err);
      }
    };

    fetchData();
  }, []);

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  return (
    <div className="p-6 mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Beneficiary Feedback</h1>
        <div className="flex items-center space-x-2">
          <label htmlFor="sort" className="text-gray-600">Sort by:</label>
          <select
            id="sort"
            value={sortBy}
            onChange={handleSortChange}
            className="border rounded-md p-2 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="newest">Newest</option>
            <option value="az">Title A-Z</option>
            <option value="za">Title Z-A</option>
            <option value="highestRating">Highest Rating</option>
            <option value="lowestRating">Lowest Rating</option>
          </select>
        </div>
      </div>

      {loading && <p className="text-gray-500">Loading feedback...</p>}
      {error && <p className="text-red-500 font-medium">Error: {error}</p>}
      {!loading && !error && sortedFeedbacks.length === 0 && (
        <p className="text-gray-500">No feedback available.</p>
      )}

      {!loading && !error && sortedFeedbacks.length > 0 && (
        <div className="space-y-8">
          {paginatedData.map((charity) => (
            <div key={charity.id} className="border rounded-lg p-5 shadow-md bg-white">
              <h2 className="text-xl font-semibold text-gray-700 mb-2">
                {charity.name[lang]} - {charity.address[lang]}
              </h2>
              {charity.beneficiary_feedback && charity.beneficiary_feedback.length > 0 ? (
                <ul className="space-y-4">
                  {charity.beneficiary_feedback.map((feedback) => (
                    <li
                      key={feedback.id}
                      className="border-l-4 border-blue-500 pl-4 py-2"
                    >
                      <h3 className="text-lg font-medium text-gray-800">
                        {feedback.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Rating: {feedback.rating}/5
                      </p>
                      <p className="text-gray-700 mt-1">{feedback.description}</p>
                      <p className="text-sm text-gray-400 mt-1">
                        Posted on: {new Date(feedback.created_at).toLocaleDateString()}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No feedback available for this charity.</p>
              )}
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

export default BeneficiaryFeedback;