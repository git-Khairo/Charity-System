import { useState, useEffect } from 'react';
import useGet from '../../../services/API/useGet';
import useDelete from '../../../services/API/useDelete';

const DeleteCharity = () => {
  const { get, data, error: getError, loading: getLoading } = useGet();
  const { remove, error: deleteError, loading: deleteLoading } = useDelete();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCharity, setSelectedCharity] = useState(null);

  useEffect(() => {
    get('/api/charities');
  }, []);

  const handleDeleteClick = (charity) => {
    setSelectedCharity(charity);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedCharity) {
      try {
        await remove(`/api/charity/delete/${selectedCharity.id}`);
        // Refetch the charity list to update the UI
        await get('/api/charities');
      } catch (err) {
        console.error('Deletion failed:', err);
      }
      setIsModalOpen(false);
      setSelectedCharity(null);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCharity(null);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Charity List</h1>

      {getLoading && <p className="text-gray-500">Loading charities...</p>}
      {getError && <p className="text-red-500">{getError}</p>}
      {deleteError && <p className="text-red-500">{deleteError}</p>}

      {data && data.charities.length > 0 ? (
        <ul className="space-y-4">
          {data.charities.map((charity) => (
            <li
              key={charity.id}
              className="flex items-center justify-between p-4 bg-gray-100 rounded-md"
            >
              <span>{charity.name}</span>
              <button
                onClick={() => handleDeleteClick(charity)}
                disabled={deleteLoading}
                className={`px-4 py-2 text-white rounded-md ${
                  deleteLoading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-red-500 hover:bg-red-600'
                }`}
              >
                {deleteLoading ? 'Deleting...' : 'Delete'}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        !getLoading && (
          <p className="text-gray-500">
            {data && !Array.isArray(data)
              ? 'Unexpected data format from API'
              : 'No charities found.'}
          </p>
        )
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md shadow-lg max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4">Confirm Deletion</h2>
            <p className="mb-4">
              Are you sure you want to delete "{selectedCharity?.name}"?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={closeModal}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={deleteLoading}
                className={`px-4 py-2 text-white rounded-md ${
                  deleteLoading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-red-500 hover:bg-red-600'
                }`}
              >
                {deleteLoading ? 'Deleting...' : 'Confirm Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteCharity;