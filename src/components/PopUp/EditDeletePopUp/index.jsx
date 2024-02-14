import React, { useRef, useEffect } from "react";
import images from "../../../assets/images";
import styles from "./styles.module.scss";

const EditDeletePopUp = ({ x, y, closePopUp, handleDeleteModalOpen, handleEditModalOpen }) => {
  const popupStyles = {
    position: "absolute",
    top: y,
    left: x - 180,
  };
  const popupRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        closePopUp();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closePopUp]);

  return (
    <div ref={popupRef} className={styles.root} style={popupStyles}>
      <div onClick={handleEditModalOpen} className={styles.actionWrapper}>
        <img src={images.pen} alt="pen" />
        <p>Редактировать</p>
      </div>
      <div onClick={handleDeleteModalOpen} className={styles.actionWrapper}>
        <img src={images.blackTrash} alt="trash" />
        <p>Удалить</p>
      </div>
    </div>
  );
};

export default EditDeletePopUp;
