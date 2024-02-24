import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRouter = () => {
    const isAuth = true
  return (
    isAuth ? <Outlet /> : <Navigate to='/login' />
  )
};

export default PrivateRouter;
