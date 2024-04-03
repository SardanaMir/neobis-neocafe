import React from "react";
import { useDispatch, useSelector } from "react-redux";
import DeleteCategory from "./DeleteCategory";
import AddNewEmployee from "./AddNewEmployee";
import AddNewCategory from "./AddNewCategory";
import AddNewItem from "./AddNewItem";
import EditItem from "./EditItem";
import WarningMessage from "./WarningMessage";
import AddAffiliateModal from "./AddAffiliateModal/AddAffiliateModal";
import AddProductModal from "./AddProductModal/AddProductModal";
import EditAffiliateModal from "./EditAffiliateModal/EditAffiliateModal";
import EditStorhouseProduct from "./EditStorhouseProduct/EditStorhouseProduct";

const Modals = () => {
  const { isOpen, modalType, modalProps } = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  const ModalsMap = {
    deleteCategory: DeleteCategory,
    addNewEmployee: AddNewEmployee,
    addCategory: AddNewCategory,
    addNewItem: AddNewItem,
    editItem: EditItem,
    warninMsg: WarningMessage,
    addAffiliateModal: AddAffiliateModal,
    addProductModal: AddProductModal,
    editAffiliateModal: EditAffiliateModal,
    editStorhouseProduct: EditStorhouseProduct,
  };
  const CurrentModal = modalType ? ModalsMap[modalType] : null;

  return isOpen && CurrentModal ? <CurrentModal {...modalProps} /> : null;
};

export default Modals;