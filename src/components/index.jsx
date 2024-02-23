import React from 'react'; // Необходим импорт React
import { useDispatch, useSelector } from 'react-redux';
import AddCategoryModal from "./Modals/AddCategoryModal";
import AddAffiliateModal from './Modals/AddAffiliateModal';
import AddProductModal from './Modals/AddProductModal';

const Modals = () => {
    const { isOpen, modalType, modalProps } = useSelector((state) => state.modal);
    const dispatch = useDispatch();

    const ModalsMap = {
        addCategory: AddCategoryModal,
        addAffiliateModal: AddAffiliateModal,
        addProductModal: AddProductModal,
    }
    const CurrentModal = modalType ? ModalsMap[modalType] : null;

    return (
        isOpen && CurrentModal ? (
            <CurrentModal {...modalProps} />
        ) : null
    );
}

export default Modals; // Необходим экспорт компонента Modals
