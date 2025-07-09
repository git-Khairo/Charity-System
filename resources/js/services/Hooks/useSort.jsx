import { useMemo } from 'react';

const useSort = ({ data = [], sortBy = 'newest' }) => {
  const sortedData = useMemo(() => {
    return [...data].sort((a, b) => {
      switch (sortBy.toLowerCase()) {
        case 'newest':
          return b.id - a.id;
        case 'az':
          return (a.name || a.title || '').localeCompare(b.name || b.title || '');
        case 'za':
          return (b.name || b.title || '').localeCompare(a.name || a.title || '');
        case 'most funded':
          return (b.raised / b.goal || 0) - (a.raised / a.goal || 0);
        case 'ending soon':
          if (a.status === 'Completed' && b.status !== 'Completed') return 1;
          if (a.status !== 'Completed' && b.status === 'Completed') return -1;
          if (a.status === 'Upcoming' && b.status === 'Active') return 1;
          if (a.status === 'Active' && b.status === 'Upcoming') return -1;
          if (a.status === 'Active' && b.status === 'Active') {
            return (a.daysLeft || 0) - (b.daysLeft || 0);
          }
          return 0;
        default:
          return 0;
      }
    });
  }, [data, sortBy]);

  return {
    sortedData,
  };
};

export default useSort;