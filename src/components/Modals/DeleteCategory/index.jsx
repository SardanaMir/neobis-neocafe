import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../../redux/slices/modalSlice";
import { deleteCategory, deleteItem, getAllCategories, getMenu } from "../../../api";
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
    // console.log("удалить категорию");
    // console.log(props.id);
    try {
      const res = await deleteCategory(props.id); //!!!
      console.log("удаление катег", res);
      dispatch(removeCategory(props.id));
      dispatch(closeModal());
    } catch (err) {
      console.log(err);
    }
  };
  const removeItem = async () => {
    const updatedItems = items.filter((item) => item.id !== props.id);
    try{
      const res = deleteItem(props.id)
      // console.log("удалить позицию", res);
      const updatedMenuData = await getMenu()
      dispatch(setItems(updatedMenuData))
      dispatch(closeModal());
    }catch(err){
      console.log(err)
    }
  };

  const actions = {
    deleteCategory: handleDeleteCategory,
    deleteItem: removeItem,
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
