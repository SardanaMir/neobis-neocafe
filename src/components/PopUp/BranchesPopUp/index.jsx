import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../../../redux/slices/modalSlice.js";
import images from "../../../assets/images.js";
import styles from "./styles.module.scss";
import {
  setCategories,
  removeCategory,
} from "../../../redux/slices/categoriesSlice.js";

const BranchesPopUp = ({ setPopUpOpen, handleOpenModal }) => {
  const branches = [
    "NeoCafe Dzerzhinka",
    "NeoCafe Karpinka",
    "NeoCafe Karpinka",
    "NeoCafe Ala-Too  Square",
  ];

  return (
    <div className={styles.popup}>
      <div className={styles.popupWrapper}>
        <div className={styles.categoryWrapper}>
          <p>Выберите филиал</p>
          <img
            className={styles.arrowUp}
            onClick={() => setPopUpOpen(false)}
            src={images.arrowUp}
            alt="стрелка вверх"
          />
        </div>
        {branches.map((branch, index) => (
          <div key={index} className={styles.flex}>
            <p>{branch}</p>
          </div>
        ))}
        {/* <div className={styles.flex} onClick={handleAdd}>
          <div className={styles.add}>Добавить</div>
          <img src={images.plus} alt="плюс" />
        </div> */}
      </div>
    </div>
  );
};
export default BranchesPopUp;
