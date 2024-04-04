import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../../redux/slices/modalSlice";
import {
  deleteCategory,
  deleteItem,
  getAllCategories,
  getAllStaff,
  getMenu,
  deleteStaffInfo,
} from "../../../api";
import { components } from "../../Buttons";
import { removeCategory } from "../../../redux/slices/categoriesSlice";
import { setItems } from "../../../redux/slices/itemsSlice";
import { setStaffInfo } from "../../../redux/slices/staffSlice";
import styles from "./style.module.scss";

const DeleteCategory = (props) => {
  console.log("remove category", props);
  const dispatch = useDispatch();
  const items = useSelector((state) => state.items.items);

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  const handleDeleteCategory = async (id) => {

    try {
      const res = await deleteCategory(props.id);
      console.log("удаление катег", res);
      dispatch(removeCategory(props.id));
      dispatch(closeModal());
    } catch (err) {
      console.log(err);
    }
  };
  const removeItem = async () => {
    // const updatedItems = items.filter((item) => item.id !== props.id);
    try {
      const res = await deleteItem(props.id)
      console.log("удалить позицию", res);
      const updatedMenuData = await getMenu()
      dispatch(setItems(updatedMenuData.data))
      // dispatch(removeItem(props.id));
      dispatch(closeModal());
    } catch (err) {
      console.log(err);
    }
  };

  const deleteProductInStorhouse = () => {
    const id = props.id;
    dispatch(deleteProduct({ id, handleCloseModal }));
  };

  const handleDeleteStaffInfo = async () =>{
    const id = props.id
    try {
      await deleteStaffInfo(id)
      const staffData = await getAllStaff()
      dispatch(setStaffInfo(staffData.data))
      dispatch(closeModal());
    }catch(err){
      console.log(err)
    }
  }
  const handleDeleteBranch = {}
  const actions = {
    deleteCategory: handleDeleteCategory,
    deleteItem: removeItem,
    deleteProductInStorhouse: deleteProductInStorhouse,
    deleteBranch: handleDeleteBranch,
    deleteStaff: handleDeleteStaffInfo
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
