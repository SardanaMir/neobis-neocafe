import React, { useEffect, useState } from 'react';
import { Pagination, Space, Table, Tag } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux'
import { getBranches } from '../../redux/slices/branchesSlice';
import { getProducts } from '../../redux/slices/storageSlice';
import { openModal } from '../../redux/slices/modalSlice';
import CategoriesPopUp from '../PopUp/CategoriesPopUp';
import EditDeletePopUp from '../PopUp/EditDeletePopUp';
import vertical from '../../assets/img/vertical.svg'
import styles from './storehouse.module.scss'



const FinishingProducts = () => {
  const [isPopUpOpen, setPopUpOpen] = useState(false);
  const [isActionsPopUpOpen, setActionsPopUpOpen] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
  const [id, setId] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 5
  
  const dispatch = useDispatch()
  
  const storhouseOne = useSelector(state => state.items.search)
  const { data_storage } = useSelector(state => state.storage)
  const { data } = useSelector(state => state.branches.data_branches)
  
  const runningLow = data_storage.filter(product => product.is_running_out === true)
  const result = runningLow?.filter(storhouse => storhouse.name.toLowerCase().includes(storhouseOne.toLowerCase())) 

  
  const handleCategoryClick = () => {
    setPopUpOpen(!isPopUpOpen);
  };

  const handlePopUpClose = () => {
    setActionsPopUpOpen(false);
  };


  const handleActionClick = (e, id) => {
    setId(id)
    setPopupPosition({ x: e.clientX, y: e.clientY });
    setActionsPopUpOpen(!isActionsPopUpOpen);
  };
  
  useEffect(() => {
    dispatch(getBranches())
  }, []);
  
  const handleDeleteModalOpen = () => {
    dispatch(
      openModal({
        modalType: "deleteCategory",
        modalProps: {
          title: "Удаление продукта",
          subtitle: `Вы действительно хотите удалить этот продукт?`,
          action: "deleteProductInStorhouse",
          id: id,
        },
      })
      );
    };
    
    
  const handleEditModalOpen = () => {
    dispatch(
      openModal({
        modalType: "editStorhouseProduct",
        modalProps: {
          id: id
        },
      })
      );
      setActionsPopUpOpen(false);
    };
      
    const handleOpenModal = () => {
      dispatch(
        openModal({
          modalType: "addAffiliateModal",
          modalProps: {},
        })
        );
      };

      
    useEffect(() => {
      dispatch(getProducts())
    }, []);
        
    const handlePageChange = (page) => {
      setCurrentPage(page);
    };
  
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
  
    const currentPageData = result.slice(startIndex, endIndex);

  return (
    <div className={styles.con}>
      <table className={styles.table}>
        <thead>
          <tr className={styles.first_tr}>
            <th><span>№</span>Наименование</th>
            <th>Количество</th>
            <th>Лимит</th>
            <th>Дата прихода</th>
            <th>Филиал</th>
          </tr>
        </thead>
        <tbody>
          {
            currentPageData?.map((product, index) => 
              <tr key={product.id} className={styles.list_product}>
                <td><span>№{index+1}</span>{product.name}</td>
                <td>{product.quantity} {product.quantity_unit}</td>
                <td>{product.limit} {product.limit_unit}</td>
                <td>{product.arrival_date}</td>
                <td>
                {
                  data.map(branch => {
                    if (branch.id === product.branch) {
                      return branch.name
                    }
                  })
                } 
                  <img src={vertical} alt="Error :(" className={styles.tableIcon} onClick={(e) => handleActionClick(e, product.id)} />
                </td>
              </tr>
            )
          }
        </tbody>
      </table>
      <Pagination
        showSizeChanger
        current={currentPage}
        pageSize={pageSize}
        total={result.length}
        onChange={handlePageChange}
        className={styles.pagination}
      />
      {isPopUpOpen && (
        <CategoriesPopUp
          setPopUpOpen={setPopUpOpen}
          handleOpenModal={handleOpenModal}
        />
      )}
      {isActionsPopUpOpen && (
        <EditDeletePopUp
          x={popupPosition.x}
          y={popupPosition.y}
          closePopUp={handlePopUpClose}
          handleEditModalOpen={handleEditModalOpen}
          handleDeleteModalOpen={handleDeleteModalOpen}
        />
      )}
    </div>
  )
};

export default FinishingProducts;
