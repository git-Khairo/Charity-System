// hooks/useCharitiesLogic.js
import { useState, useMemo } from 'react';
import useFilter from "../../../services/Hooks/useFilter"
import useSort from "../../../services/Hooks/useSort"

const useCharity = (initialCharitiesData) => {
    // State for filters and pagination
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [sortBy, setSortBy] = useState("newest");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(8);
    const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
    const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
    const [isPerPageDropdownOpen, setIsPerPageDropdownOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");


    // Use the useFilter hook for filtering charities
    const { filteredData: filteredCharities, isFilterActive } = useFilter({
        data: initialCharitiesData || [], // Fallback to empty array if undefined
        selectedCategory,
        searchTerm,
    });

    // Use the useSort hook for sorting filtered charities
    const { sortedData: sortedCharities } = useSort({
        data: filteredCharities,
        sortBy,
    });


    // Calculate pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentCharities = sortedCharities.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(sortedCharities.length / itemsPerPage);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Clear all filters
    const clearFilters = () => {
        setSelectedCategory("all");
        setSortBy("newest");
        setSearchTerm("");
        setCurrentPage(1);
    };

    // Generate page numbers for pagination
    const pageNumbers = useMemo(() => {
        const numbers = [];
        for (let i = 1; i <= totalPages; i++) {
            numbers.push(i);
        }
        return numbers;
    }, [totalPages]);

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

    return {
        selectedCategory,
        setSelectedCategory,
        sortBy,
        setSortBy,
        currentPage,
        setCurrentPage,
        itemsPerPage,
        setItemsPerPage,
        isCategoryDropdownOpen,
        setIsCategoryDropdownOpen,
        isSortDropdownOpen,
        setIsSortDropdownOpen,
        isPerPageDropdownOpen,
        setIsPerPageDropdownOpen,
        searchTerm,
        setSearchTerm,
        filteredCharities,
        sortedCharities,
        currentCharities,
        totalPages,
        paginate,
        clearFilters,
        isFilterActive,
        getVisiblePageNumbers,
        indexOfFirstItem,
        indexOfLastItem,
    };
};

export default useCharity;