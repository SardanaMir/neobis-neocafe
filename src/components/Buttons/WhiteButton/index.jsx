import React from "react";
import styles from "./style.module.scss";

const WhiteButton = (props) => {
  console.log('white button', props)

  return (
    <>
      <button className={styles.root} onClick={props.handleClick}>
        {props.title}
      </button>
    </>
  );
};

export default WhiteButton;
