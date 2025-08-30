// components/CharityFilters.js
import React from 'react';

const CharityFilters = ({
    categories,
    sortOptions,
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
    searchTerm,
    setSearchTerm,
    isCategoryDropdownOpen,
    setIsCategoryDropdownOpen,
    isSortDropdownOpen,
    setIsSortDropdownOpen,
    clearFilters,
    isFilterActive,
    setCurrentPage, // لتغيير الصفحة إلى 1 عند تطبيق فلتر جديد
}) => {
    return (
        <div className="sticky top-0 z-10 bg-white rounded-lg shadow-md p-4 mb-8 dark:bg-dark-background2">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                {/* Search Bar */}
                <div className="relative w-full md:w-1/3">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <i className="fas fa-search text-gray-400"></i>
                    </div>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setCurrentPage(1); // Reset page on search
                        }}
                        placeholder="Search charities..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                    {searchTerm && (
                        <button
                            onClick={() => {
                                setSearchTerm("");
                                setCurrentPage(1); // Reset page when clearing search
                            }}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                        >
                            <i className="fas fa-times text-gray-400 hover:text-gray-600"></i>
                        </button>
                    )}
                </div>
                <div className="flex flex-wrap gap-2 items-center">
                    {/* Category Filter */}
                    <div className="relative">
                        <button
                            onClick={() => {
                                setIsCategoryDropdownOpen(!isCategoryDropdownOpen);
                                setIsSortDropdownOpen(false);
                            }}
                            className="!rounded-button whitespace-nowrap flex items-center gap-2 bg-white border border-gray-300 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-50 cursor-pointer"
                        >
                            <i className="fas fa-tag text-blue-500"></i>
                            <span>
                                Category:{" "}
                                {categories.find((cat) => cat.id === selectedCategory)?.name}
                            </span>
                            <i className="fas fa-chevron-down text-gray-500 text-xs"></i>
                        </button>
                        {isCategoryDropdownOpen && (
                            <div className="absolute left-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
                                <ul className="py-2 max-h-60 overflow-y-auto">
                                    {categories.map((category) => (
                                        <li
                                            key={category.id}
                                            onClick={() => {
                                                setSelectedCategory(category.id);
                                                setIsCategoryDropdownOpen(false);
                                                setCurrentPage(1); // Reset page on category change
                                            }}
                                            className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${selectedCategory === category.id ? "bg-blue-50 text-blue-600" : ""}`}
                                        >
                                            {category.name}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                    {/* Clear Filters Button */}
                    {isFilterActive && (
                        <button
                            onClick={clearFilters}
                            className="!rounded-button whitespace-nowrap flex items-center gap-2 bg-[#f9f9f9] px-4 py-2 rounded-lg text-[#000111] hover:bg-[#a7a7a7] cursor-pointer"
                        >
                            <i className="fas fa-times text-gray-500"></i>
                            <span>Clear Filters</span>
                        </button>
                    )}
                </div>
                {/* Sort Controls */}
                <div className="relative ml-auto">
                    <button
                        onClick={() => {
                            setIsSortDropdownOpen(!isSortDropdownOpen);
                            setIsCategoryDropdownOpen(false);
                        }}
                        className="!rounded-button whitespace-nowrap flex items-center gap-2 bg-white border border-gray-300 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-50 cursor-pointer"
                    >
                        <i className="fas fa-sort text-blue-500"></i>
                        <span>
                            Sort:{" "}
                            {sortOptions.find((option) => option.id === sortBy)?.name}
                        </span>
                        <i className="fas fa-chevron-down text-gray-500 text-xs"></i>
                    </button>
                    {isSortDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
                            <ul className="py-2">
                                {sortOptions.map((option) => (
                                    <li
                                        key={option.id}
                                        onClick={() => {
                                            setSortBy(option.id);
                                            setIsSortDropdownOpen(false);
                                        }}
                                        className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${sortBy === option.id ? "bg-blue-50 text-blue-600" : ""}`}
                                    >
                                        {option.name}
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

export default CharityFilters;