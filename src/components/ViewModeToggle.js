import React from 'react';

const ViewModeToggle = ({ isGridView, toggleViewMode }) => {
  return (
    <button onClick={toggleViewMode} className="m-6 p-2 bg-blue-500 text-white rounded-lg">
      {isGridView ? "Switch to List View" : "Switch to Grid View"}
    </button>
  );
};

export default ViewModeToggle;