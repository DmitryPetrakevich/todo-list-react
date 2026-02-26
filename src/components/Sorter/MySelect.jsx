import React from "react";
import sl from "./MySelect.module.css"

const MySelect = ({ value, onChange, options, defaultValue }) => {
  return (
    <select style={{marginLeft: '10px'}} className={sl.select} value={value} onChange={onChange}>
      <option value="" disabled>
        {defaultValue}
      </option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.name}
        </option>
      ))}
    </select>
  );
};

export default MySelect;
