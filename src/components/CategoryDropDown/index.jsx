import React, { useState } from 'react';
import styles from './style.module.scss'

const CategoryDropDown = ({options, values, onSelect, title}) => {
  const [selectedOption, setSelectedOption] = useState();
  const handleSelect = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    onSelect(selectedValue);
  };
  return (
    <div>
      <select value={values.category} onChange={handleSelect}>
        <option value="" disabled hidden>{title}</option>
        {options.map((option, index) => (
          <option key={index} value={option.name}>{option.name}</option>
        ))}
      </select>
    </div>
  );
};

export default CategoryDropDown
