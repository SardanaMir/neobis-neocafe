import React from "react";
import styles from "./style.module.scss";
const BlueButton = (props) => {
  return <button className={styles.root}>{props.title}</button>;
};

export default BlueButton;
