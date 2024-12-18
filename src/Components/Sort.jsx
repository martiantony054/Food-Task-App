import React from 'react';
import {Select ,Option } from "@material-tailwind/react";

function Sort({ sortCriteria, sortOrder, onCriteriaChange, onToggleOrder}) {
  return (
    <>
     <div className="mt-4 flex flex-col md:flex-row items-center gap-4">
      <Select
        value={sortCriteria}
        onChange={(value) => onCriteriaChange(value)} // Call the parent's handler
        className="neu-brutal bg-yellow-100 w-full"
      >
        <Option value="product_name">Product Name</Option>
        <Option value="nutriscore_score">Nutrition Score</Option>
        <Option value="nutrition_grades">Nutrition Grades</Option>
      </Select>
      <button
        onClick={onToggleOrder}
        className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all w-full md:w-auto"
      >
        Toggle Sort Order{" "}
        <span className="font-bold">
          ({sortOrder === "asc" ? "Ascending" : "Descending"})
        </span>
      </button>
    </div>
    </>
   
  );
}

export default Sort;
