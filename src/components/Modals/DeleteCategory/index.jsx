import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../../redux/slices/modalSlice";
import { deleteCategory } from "../../../api";
import { components } from "../../Buttons";
import styles from "./style.module.scss";
import { removeCategory } from "../../../redux/slices/categoriesSlice";
import { setItems } from "../../../redux/slices/itemsSlice";

const DeleteCategory = (props) => {
  console.log("remove category", props);
  const dispatch = useDispatch();
  const items = useSelector((state) => state.items.items);

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  const handleDeleteCategory = async (id) => {
    console.log("удалить категорию");
    console.log(props.id);
    try {
      const res = await deleteCategory(props.id); //!!!
      console.log("удаление катег", res);
      dispatch(removeCategory(props.id));
      dispatch(closeModal());
    } catch (err) {
      console.log(err);
    }
  };
  const deleteItem = () => {
    console.log("удалить позицию");
    const updatedItems = items.filter((item) => item.id !== props.id);
    dispatch(setItems(updatedItems))
    dispatch(closeModal());
  };

  const deleteProductInStorhouse = () => {
      const id = props.id
      dispatch(deleteProduct({ id, handleCloseModal }));
  }
        
  const actions = {
        deleteCategory: deleteCategory,
        deleteItem: deleteItem,
        deleteProductInStorhouse: deleteProductInStorhouse,
        handleDeleteBranch: handleDeleteBranch,
    };

  const handleClick = actions[props.action];

  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        <h2 className={styles.title}>{props.title}</h2>
        <div onClick={handleCloseModal} className={styles.close}>
          &times;
        </div>
        <h3 className={styles.subtitle}>{props.subtitle}</h3>
        <div className={styles.flex}>
          <components.WhiteButton title={"Да"} handleClick={handleClick} />
          <components.BlueButton
            title={"Нет"}
            handleCloseModal={handleCloseModal}
          />
        </div>
      </div>
    </div>
  );
};

export default DeleteCategory;
