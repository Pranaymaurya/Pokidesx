import React from 'react';

function SortControls({ sortBy, sortOrder, onSortChange }) {
  return (
    <div className="flex items-center gap-2">
      <select
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value, sortOrder)}
        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
      >
        <option value="id">ID</option>
        <option value="name">Name</option>
      </select>
      <select
        value={sortOrder}
        onChange={(e) => onSortChange(sortBy, e.target.value)}
        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
      >
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
    </div>
  );
}

export default SortControls; 