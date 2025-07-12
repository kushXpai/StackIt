// src/components/user/browse/FilterControls.tsx

import React, { useState } from 'react';
import { Search, Filter, ChevronDown } from 'lucide-react';

interface FilterControlsProps {
  onSearch: (query: string) => void;
  onSortChange: (sort: string) => void;
  onFilterChange: (filter: string) => void;
}

export const FilterControls: React.FC<FilterControlsProps> = ({
  onSearch,
  onSortChange,
  onFilterChange,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('Newest');
  const [filterBy, setFilterBy] = useState('All Questions');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
    onSortChange(e.target.value);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterBy(e.target.value);
    onFilterChange(e.target.value);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search questions, tags, or users..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Sort By */}
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-500" />
          <div className="relative">
            <select
              value={sortBy}
              onChange={handleSortChange}
              className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="Newest">Newest</option>
              <option value="Oldest">Oldest</option>
              <option value="Most Voted">Most Voted</option>
              <option value="Most Answered">Most Answered</option>
              <option value="Most Viewed">Most Viewed</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
          </div>
        </div>

        {/* Filter By */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <select
              value={filterBy}
              onChange={handleFilterChange}
              className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="All Questions">All Questions</option>
              <option value="Unanswered">Unanswered</option>
              <option value="Answered">Answered</option>
              <option value="Accepted">Accepted</option>
              <option value="My Questions">My Questions</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
};