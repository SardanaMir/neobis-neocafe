import React from "react";
import styles from "./style.module.scss";

const WhiteButton = (props) => {
  return (
    <>
      <button className={styles.root} onClick={props.handleClick}>
        {props.title}
      </button>
    </>
  );
};

export default WhiteButton;
