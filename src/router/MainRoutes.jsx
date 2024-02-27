import { Routes, Route } from 'react-router-dom'
import Storehouse from '../components/Storehouse/Storehouse'
import Affiliate from '../components/Affiliate/Affiliate'
import Menu from '../pages/Menu'
import LoginPage from '../pages/Login/LoginPage'
import CodeVerification from '../pages/CodeVerification'

const MainRoutes = () => {
  const PUBLIC_ROUTES = [
    {
      link: 'menu',
      element: <Menu />,
      id: 1,
    },
    {
      link: 'storehouse',
      element: <Storehouse />,
      id: 2,
    },
    {
      link: 'affiliates',
      element: <Affiliate />,
      id: 3,
    },
  ]

  return (
    <Routes>
      {PUBLIC_ROUTES.map((item) => (
        <Route path={item.link} element={item.element} key={item.id} />
      ))}
    </Routes>
  )
}

export default MainRoutes
