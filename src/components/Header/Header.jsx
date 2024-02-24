import { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import searchIcon from '../../assets/img/Vector.svg'
import styles from './header.module.scss'
import { Layout } from 'antd';
import { openModal } from '../../redux/slices/modalSlice';
import bell from '../../assets/img/Bell.svg'
import MenuHeader from './MenuHeader';
import StorehouseHeader from './StorehouseHeader';
import AffiliatesHeader from './AffiliatesHeader';


const Header = () => {
  const [handleChangeHeader, setHandleChangeHeader] = useState('');

  const dispatch = useDispatch()
  const location = useLocation()  


  const handleOpenProductModal = () => {
    dispatch(openModal({
      modalType: 'addProductModal'
    }))
  }

  useEffect(() => {
    if(location.pathname === '/menu') {
      setHandleChangeHeader('menu')
    }else if (location.pathname === '/storehouse') {
      setHandleChangeHeader('storehouse')
    }else if (location.pathname === '/affiliates') {
      setHandleChangeHeader('affiliates')
    }
    
  }, [location, ]);
  


  if(location.pathname === '/menu') {
    return <MenuHeader />
  }else if (location.pathname === '/storehouse') {
    return <StorehouseHeader />
  }else if (location.pathname === '/affiliates') {
    return <AffiliatesHeader />
  }
};

export default Header;
