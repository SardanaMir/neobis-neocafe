import React from "react";
import { useDispatch, useSelector } from "react-redux";
import DeleteCategory from "./DeleteCategory";
import AddNewEmployee from "./AddNewEmployee";
import AddNewCategory from "./AddNewCategory";
import AddNewItem from "./AddNewItem";
import EditItem from "./EditItem";
// import AddAffiliateModal from "./AddAffiliateModal/AddAffiliateModal";
// import AddProductModal from "./AddProductModal/AddProductModal";
const Modals = () => {
  const { isOpen, modalType, modalProps } = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  console.log('modals', modalProps)

  const ModalsMap = {
    deleteCategory: DeleteCategory,
    addNewEmployee: AddNewEmployee,
    addCategory: AddNewCategory,
    addNewItem: AddNewItem,
    editItem: EditItem,
    // addAffiliateModal: AddAffiliateModal,
    // addProductModal: AddProductModal,
    
  };
  const CurrentModal = modalType ? ModalsMap[modalType] : null;

  return isOpen && CurrentModal ? <CurrentModal {...modalProps} /> : null;
};

export default Modals;