import React from "react";
import { closeModal } from "../../../redux/slices/modalSlice";
import styles from "./style.module.scss";
import { useDispatch } from "react-redux";

const WarningMessage = (props) => {
  const dispatch = useDispatch();

  const handleCloseModal = () => {
    dispatch(closeModal());
  };
  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        <h2 className={styles.title}>{props.title}</h2>
        <div onClick={handleCloseModal} className={styles.close}>
          &times;
        </div>
        <h3 className={styles.subtitle}>{props.subtitle}</h3>
      </div>
    </div>
  );
};

export default WarningMessage;
