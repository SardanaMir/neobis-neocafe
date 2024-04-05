import React, { useEffect, useState } from 'react';
import { Pagination, Space, Table, Tag } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../../redux/slices/modalSlice';
import vertical from '../../assets/img/vertical.svg'
import CategoriesPopUp from '../PopUp/CategoriesPopUp';
import EditDeletePopUp from '../PopUp/EditDeletePopUp';
import DropDown from '../DropDown';
import DropdownStoreHouse from '../Dropdown/Dropdown';
import { getBranches } from '../../redux/slices/branchesSlice'; 
import styles from './affiliate.module.scss'


const Affiliate = () => {
  const [isPopUpOpen, setPopUpOpen] = useState(false);
  const [isActionsPopUpOpen, setActionsPopUpOpen] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
  const [id, setId] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 5

  const { data } = useSelector(state => state.branches.data_branches)
  const affiliate = useSelector(state => state.items.search)
  const dispatch = useDispatch()

  const results = data?.filter(branch => branch.name.toLowerCase().includes(affiliate.toLowerCase()))    

  const handleCategoryClick = () => {
    setPopUpOpen(!isPopUpOpen);
  };
  const handleActionClick = (e, id) => {
    setId(id)
    setPopupPosition({ x: e.clientX, y: e.clientY });
    setActionsPopUpOpen(!isActionsPopUpOpen);
  };

  const handlePopUpClose = () => {
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

    const handleEditModalOpen = () => {
      dispatch(
        openModal({
          modalType: "editAffiliateModal",
          modalProps: {
            id: id
          },
        })
      );
      setActionsPopUpOpen(false);
    };

    const handleDeleteModalOpen = () => {
      dispatch(
        openModal({
          modalType: "deleteCategory",
          modalProps: {
            title: "Удаление продукта",
            subtitle: `Вы действительно хотите удалить этот продукт?`,
            action: "handleDeleteBranch",
            id: id,
          },
        })
      );
    };

    const onShowSizeChange = (current, pageSize) => {
      console.log(current, pageSize);
    };

    useEffect(() => {
      dispatch(getBranches())
    }, []);

    const handlePageChange = (page) => {
      setCurrentPage(page);
    };
  
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
  
    const currentPageData = results?.slice(startIndex, endIndex);  
  
    return (
      <div className={styles.container}>
      <table className={styles.table}>
          <thead>
            <tr className={styles.affiliate_tr}>
            <span>№</span>
              <th className={styles.name_cafe} onClick={handleOpenModal}>Название кофейни</th>
              <th className={styles.address_th}>Адрес</th>
              <th className={styles.time_work_th}>Время работы</th>
            </tr>
          </thead>
          <tbody>
            {
              currentPageData?.map((branch, index) => 
                <tr className={styles.tr} key={branch.id}>
                  <span>№{index+1}</span>
                    <td className={styles.name_cafe}>{branch.name}</td>
                    <td className={styles.address}>{branch.address}</td>
                    <td className={styles.time_work}>Каждый день с 11:00 до 22:00 </td>
                  <img src={vertical} alt="Error :(" className={styles.listIcon} onClick={(e) => handleActionClick(e, branch.id)} />
              </tr>
              )
            }
          </tbody>
        </table>
        <Pagination
          showSizeChanger
          current={currentPage}
          pageSize={pageSize}
          total={results?.length}
          onChange={handlePageChange}
          className={styles.affiliate_pagination}
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

export default Affiliate;
