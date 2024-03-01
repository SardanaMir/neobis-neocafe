import React, { useState } from "react";
import styles from "./styles.module.scss";

const MeasureDropDown = ({ options, values, onSelect, index }) => {
  return (
    <select
      value={values.ingredients[index].measure}
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

export default MeasureDropDown;
