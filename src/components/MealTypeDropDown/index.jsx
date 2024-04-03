import React, { useState } from "react";
import styles from "./styles.module.scss";

const MealTypeDropDown = ({ options, values, onSelect, index }) => {
    // console.log('props', options, values, onSelect, index)
  return (
    <select
      value={values}
      onChange={(e) => onSelect(e.target.value, index)}
    >
      {options.map((option, idx) => (
        <option key={idx} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default MealTypeDropDown;
