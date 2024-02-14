import React from "react";
import styles from "./style.module.scss";
const BlueButton = (props) => {
  const handleClick = () => {
    if (props.handleCloseModal) {
      props.handleCloseModal();
    }
  };
  return <button className={styles.root} onClick={handleClick}>{props.title}</button>;
};

export default BlueButton;
