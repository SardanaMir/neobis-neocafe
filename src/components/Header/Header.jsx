import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import MenuHeader from './MenuHeader';
import StorehouseHeader from './StorehouseHeader';
import AffiliatesHeader from './AffiliatesHeader';
import StaffHeader from './StaffHeader';
import { openModal } from '../../redux/slices/modalSlice'


const Header = () => {
  const location = useLocation() 
  const dispatch = useDispatch()

  const handleOpenNotificationComponent = () => {
    dispatch(
      openModal({
        modalType: "notification",
        modalProps: {},
      })
    );
  };

  if(location.pathname === '/menu') {
    return <MenuHeader handleOpenNotificationComponent={handleOpenNotificationComponent} />
  }else if (location.pathname === '/storehouse') {
    return <StorehouseHeader handleOpenNotificationComponent={handleOpenNotificationComponent} />
  }else if (location.pathname === '/affiliates') {
    return <AffiliatesHeader handleOpenNotificationComponent={handleOpenNotificationComponent} />
  }else if (location.pathname === '/staff') {
    return <StaffHeader handleOpenNotificationComponent={handleOpenNotificationComponent} />
  }
};

export default Header;
