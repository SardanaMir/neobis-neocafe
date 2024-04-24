import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRouter = () => {
	const isAuth = useSelector(state => state.user.isAuth)
  // Qazwsx1234!

	return isAuth ? <Outlet /> : <Navigate to='/login' />
}

export default PrivateRouter
