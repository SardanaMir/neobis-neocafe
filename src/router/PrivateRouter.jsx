import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"

const PrivateRouter = () => {
  const isAuth = useSelector((state) => state.user.isAuth);

  return (
    isAuth ? <Outlet /> : <Navigate to='/login' />
  )
};

export default PrivateRouter;
