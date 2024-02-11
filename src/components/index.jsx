import React from "react";
import { useDispatch, useSelector } from "react-redux";
import AddCategoryModal from "./Modals/AddCategoryModal";
import DeleteCategory from "./Modals/DeleteCategory";

const Modals = () => {
  const { isOpen, modalType, modalProps } = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  const ModalsMap = {
    addCategory: AddCategoryModal,
    deleteCategory: DeleteCategory,
  };
  const CurrentModal = modalType ? ModalsMap[modalType] : null;

  return isOpen && CurrentModal ? <CurrentModal {...modalProps} /> : null;
};

export default Modals; // Необходим экспорт компонента Modals
