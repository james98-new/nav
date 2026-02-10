import React from 'react';

interface SearchBoxProps {
  onSearch: () => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ onSearch }) => {
  return (
    <div className="w-full max-w-2xl">
      <input 
        type="text" 
        placeholder="搜索网址..."
        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={onSearch}
      />
    </div>
  );
};

export default SearchBox;
