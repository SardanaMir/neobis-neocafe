import { useLocation } from 'react-router-dom';
import MenuHeader from './MenuHeader';
import StorehouseHeader from './StorehouseHeader';
import AffiliatesHeader from './AffiliatesHeader';
import StaffHeader from './StaffHeader';


const Header = () => {
  const location = useLocation() 


  if(location.pathname === '/menu') {
    return <MenuHeader />
  }else if (location.pathname === '/storehouse') {
    return <StorehouseHeader />
  }else if (location.pathname === '/affiliates') {
    return <AffiliatesHeader />
  }else if (location.pathname === '/staff') {
    return <StaffHeader />
  }
};

export default Header;
