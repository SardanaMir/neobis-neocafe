import React, { useState } from 'react';
import styles from './style.module.scss'

const List = (props) => {
  // const options = ['Бармен', 'Официант'];
  const [selectedRole, setSelectedRole] = useState('');

  const handleSelect = (event) => {
    props.onSelect(event.target.value);
  };

  return (
    <div>
      <select value={selectedRole} onChange={handleSelect}>
        <option value="" disabled hidden>{props.values}</option>
        {props.options.map((option, index) => (
          <option key={index} value={option}>{option}</option>
        ))}
      </select>
    </div>
  );
};

export default List
