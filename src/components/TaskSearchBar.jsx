import React, { useState } from "react";

const TaskSearchBar = () => {
  const [sortOption, setSortOption] = useState("recent");

  // Handle sort change
  const handleSortChange = (e) => {
    setSortOption(e.target.value);

    // Logic
    // console.log("Selected Sort Option:", e.target.value);
  };
  return (
    <div className="flex flex-col justify-between p-2 my-3 border shadow-md sm:flex-row">
      {/* Search bar */}
      <div className="flex items-center gap-2">
        <span>Search:</span>
        <input
          type="text"
          className="p-1 border"
          placeholder="Search tasks..."
        />
      </div>

      {/* Sort filter */}
      <div className="flex items-center gap-2 mt-2 sm:mt-0">
        <span>Sort By:</span>
        <select
          value={sortOption}
          onChange={handleSortChange}
          className="p-1 border"
        >
          <option value="recent">Recent</option>
          <option value="oldest">Oldest</option>
          <option value="alphabetic">Alphabetic</option>
        </select>
      </div>
    </div>
  );
};

export default TaskSearchBar;
