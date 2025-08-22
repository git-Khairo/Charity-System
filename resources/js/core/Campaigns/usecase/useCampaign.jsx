import { useState, useMemo } from "react";
import useFilter from "../../../services/Hooks/useFilter"
import useSort from "../../../services/Hooks/useSort"

export function useCampaign(initialCampaignsData = []) {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("All");
  const [locationFilter, setLocationFilter] = useState("All");
  const [sortOption, setSortOption] = useState("Newest");
  const [currentPage, setCurrentPage] = useState(1);
  const campaignsPerPage = 6;

  console.log(initialCampaignsData);
  // Use useFilter for filtering campaigns
  const { filteredData: filteredCampaigns, isFilterActive } = useFilter({
    data: initialCampaignsData,
    selectedCategory: categoryFilter,
    searchTerm,
  });

  
  // Use useSort for sorting campaigns
  const { sortedData: sortedCampaigns } = useSort({
      data: filteredCampaigns,
      sortBy: sortOption,
    });
    
    // Calculate pagination
    const totalPages = Math.ceil(sortedCampaigns.length / campaignsPerPage);
    const indexOfLastCampaign = currentPage * campaignsPerPage;
    const indexOfFirstCampaign = indexOfLastCampaign - campaignsPerPage;
    const currentCampaigns = sortedCampaigns.slice(
        indexOfFirstCampaign,
        indexOfLastCampaign
    );

  // Pagination controls
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  return {
    searchTerm,
    setSearchTerm,
    categoryFilter,
    setCategoryFilter,
    statusFilter,
    setStatusFilter,
    locationFilter,
    setLocationFilter,
    sortOption,
    setSortOption,
    filteredCampaigns,
    sortedCampaigns,
    currentCampaigns,
    currentPage,
    setCurrentPage,
    totalPages,
    paginate,
    nextPage,
    prevPage,
    isFilterActive,
  };
}