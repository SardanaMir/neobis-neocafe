import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AddCategoryModal from "./Modals/AddCategoryModal";

const Modals = () => {
    const {currentModal, props} = useSelector()

    const ModalsMap = {
        addCategory: AddCategoryModal
    }
    return ModalsMap[currentModal](props)
}

export default Modals