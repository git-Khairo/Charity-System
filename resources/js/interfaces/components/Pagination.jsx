import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Pagination = ({
  currentPage,
  totalPages,
  itemsPerPage,
  setCurrentPage,
  setItemsPerPage,
  filteredData,
}) => {
  const [isPerPageDropdownOpen, setIsPerPageDropdownOpen] = useState(false);

  // Generate page numbers for pagination
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  // Get visible page numbers (show 5 at a time)
  const getVisiblePageNumbers = () => {
    if (totalPages <= 5) {
      return pageNumbers;
    }
    if (currentPage <= 3) {
      return pageNumbers.slice(0, 5);
    }
    if (currentPage >= totalPages - 2) {
      return pageNumbers.slice(totalPages - 5);
    }
    return pageNumbers.slice(currentPage - 3, currentPage + 2);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  return (
    <div className="mt-12 flex flex-col md:flex-row items-center justify-between">
      <div className="mb-4 md:mb-0">
        <p className="text-[#000111]">
          Showing {indexOfFirstItem + 1}-
          {Math.min(indexOfLastItem, filteredData.length)} of{" "}
          {filteredData.length} results
        </p>
      </div>
      <div className="flex items-center">
        <nav className="flex items-center">
          <button
            onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className={`!rounded-button whitespace-nowrap mr-2 px-3 py-2 rounded-lg ${
              currentPage === 1
                ? "bg-[#a7a7a7] text-white cursor-not-allowed"
                : "bg-white border border-[#97c9ea] text-[#000111] hover:bg-[#f9f9f9] cursor-pointer"
            }`}
          >
            <FaChevronLeft />
          </button>
          <div className="hidden md:flex">
            {getVisiblePageNumbers().map((number) => (
              <button
                key={number}
                onClick={() => setCurrentPage(number)}
                className={`!rounded-button whitespace-nowrap mx-1 px-4 py-2 rounded-lg ${
                  currentPage === number
                    ? "bg-[#002366] text-white"
                    : "bg-white border border-[#97c9ea] text-[#000111] hover:bg-[#f9f9f9]"
                } cursor-pointer`}
              >
                {number}
              </button>
            ))}
          </div>
          <div className="md:hidden">
            <span className="mx-2 text-gray-600">
              Page {currentPage} of {totalPages}
            </span>
          </div>
          <button
            onClick={() =>
              currentPage < totalPages && setCurrentPage(currentPage + 1)
            }
            disabled={currentPage === totalPages}
            className={`!rounded-button whitespace-nowrap ml-2 px-3 py-2 rounded-lg ${
              currentPage === totalPages
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 cursor-pointer"
            }`}
          >
          <FaChevronRight />
          </button>
        </nav>
        <div className="relative ml-4">
          <button
            onClick={() => setIsPerPageDropdownOpen(!isPerPageDropdownOpen)}
            className="!rounded-button whitespace-nowrap flex items-center gap-2 bg-white border border-gray-300 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-50 cursor-pointer"
          >
            <span>{itemsPerPage} per page</span>
            <i className="fas fa-chevron-down text-gray-500 text-xs"></i>
          </button>
          {isPerPageDropdownOpen && (
            <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
              <ul className="py-2">
                {[8, 12, 16, 24].map((number) => (
                  <li
                    key={number}
                    onClick={() => {
                      setItemsPerPage(number);
                      setIsPerPageDropdownOpen(false);
                      setCurrentPage(1);
                    }}
                    className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                      itemsPerPage === number ? "bg-blue-50 text-blue-600" : ""
                    }`}
                  >
                    {number} per page
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Pagination;