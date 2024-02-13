import React from "react";
import { useDispatch, useSelector } from "react-redux";
import DeleteCategory from "./Modals/DeleteCategory";
import AddNewEmployee from "./Modals/AddNewEmployee";
import AddNewCategory from "./Modals/AddNewCategory";
const Modals = () => {

  const { isOpen, modalType, modalProps } = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  console.log('modals', modalProps)

  const ModalsMap = {
    deleteCategory: DeleteCategory,
    addNewEmployee: AddNewEmployee,
    addCategory: AddNewCategory,
  };
  const CurrentModal = modalType ? ModalsMap[modalType] : null;

  return isOpen && CurrentModal ? <CurrentModal {...modalProps} /> : null;
};

export default Modals;