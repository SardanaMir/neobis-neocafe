import React from "react";
import styles from "./style.module.scss";

const WhiteButton = (props) => {
  const handleClick = () => {
    if (props.handleClose) {
      props.handleClose();
    }
    if (props.deleteCategory) {
      props.deleteCategory();
    }
  };
  return (
    <>
      <button className={styles.root} onClick={handleClick}>
        {props.title}
      </button>
    </>
  );
};

export default WhiteButton;
