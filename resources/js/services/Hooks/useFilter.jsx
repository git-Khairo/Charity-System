const useFilter = ({ data, selectedCategory, searchTerm }) => {
  const filterData = () => {
    return data.filter((item) => {
      return (
        (selectedCategory === "all" || item.category === selectedCategory) &&
        (searchTerm === "" ||
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    });
  };

  return {
    filteredData: filterData(),
    isFilterActive: selectedCategory !== "all" || searchTerm !== "",
  };
};

export default useFilter;