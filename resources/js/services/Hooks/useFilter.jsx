import { useMemo } from 'react';

const useFilter = ({ data = [], selectedCategory = 'all', searchTerm = '', statusFilter = 'All' }) => {
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const categoryMatch = selectedCategory === 'all' || item.category === selectedCategory;
      const statusMatch = statusFilter === 'All' || item.status === statusFilter;
      const searchMatch =
        searchTerm === '' ||
        (item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
         item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
         item.description?.toLowerCase().includes(searchTerm.toLowerCase()));
      return categoryMatch && statusMatch && searchMatch;
    });
  }, [data, selectedCategory, searchTerm, statusFilter]);

  const isFilterActive = useMemo(() => {
    return selectedCategory !== 'all' || searchTerm !== '' || statusFilter !== 'All';
  }, [selectedCategory, searchTerm, statusFilter]);

  return {
    filteredData,
    isFilterActive,
  };
};

export default useFilter;