const useSort = ({ data, sortBy }) => {
  const sortData = () => {
    return [...data].sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return b.id - a.id;
        case "az":
          return a.name.localeCompare(b.name);
        case "za":
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });
  };

  return {
    sortedData: sortData(),
  };
};

export default useSort;