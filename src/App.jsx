import { useState } from 'react'
import { Route, Router, Routes } from 'react-router-dom'
import { Layout } from 'antd'
import Sider from './components/Sider/Sider';
import Header from './components/Header/Header';
import Content from './components/Content/Content';
import LoginPage from './pages/Login/LoginPage';
import './App.css'
import PrivateRouter from './router/PrivateRouter';
import Menu from './pages/Menu';
import MainPage from './pages/Main/MainPage';
import CodeVerification from './pages/CodeVerification';

function App() {
  return (
      <div className='app'>
        <Routes>
          <Route element={<PrivateRouter />} >
            <Route path='/*' element={<MainPage />} />
          </Route>
          <Route path='/login' element={<LoginPage />} />
        </Routes>
      </div>
  )
}
// import React, { useState, useEffect } from "react";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   useNavigate,
// } from "react-router-dom";
// import { useSelector } from "react-redux";
// import LoginContainer from "./pages/Login/LoginContainer";
// import CodeVerification from "./pages/CodeVerification";
// import EditItem from "./components/Modals/EditItem";
// import DropDown from "./components/DropDown";
// import LoginPage from "./pages/Login/LoginPage";
// import Menu from "./pages/Menu";
// import "./App.css";
// import AddNewItem from "./components/Modals/AddNewItem";
// import AddNewEmployee from "./components/Modals/AddNewEmployee";
// import AddNewCategory from "./components/Modals/AddNewCategory";
// import CategoriesPopUp from "./components/PopUp/CategoriesPopUp";
// // import AddCategoryModal from './components/Modals/AddCategoryModal'
// import Header from "./components/Header/Header";
// import Storehouse from "./components/Storehouse/Storehouse";

// function App() {
//   const navigate = useNavigate();
//   const isAuth = useSelector((state) => state.user.isAuth);

//   useEffect(() => {
//     if (!isAuth) {
//       navigate("/login");
//     }
//   }, [isAuth]);

//   return (
//     <Routes>
//       {isAuth ? (
//         <>
//           {/* <div
//             style={{
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//               flexDirection: "column",
//               gap: "25px",
//             }}
//           >

//           </div> */}
//           <Route path="/" element={<Menu />} />
//           <Route path="/storehouse" element={<Storehouse />} />

//         </>
//       ) : (
//         <>
//         <Route path="/login" element={<LoginContainer />} />

//         </>
//       )}
//     </Routes>
//   );
// }

export default App;
