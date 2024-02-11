import React, { useState } from 'react';
import styles from './style.module.scss'

const List = () => {
  const options = ['Бармен', 'Официант'];
  const [selectedRole, setSelectedRole] = useState('');

  const handleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  return (
    <div>
      <select value={selectedRole} onChange={handleChange}>
        <option value="" disabled hidden>Выберите роль</option>
        {options.map((option, index) => (
          <option key={index} value={option}>{option}</option>
        ))}
      </select>
    </div>
  );
};

export default List
