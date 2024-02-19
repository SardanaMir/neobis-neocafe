import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import LoginContainer from "./pages/Login/LoginContainer";
import CodeVerification from "./pages/CodeVerification";
import EditItem from "./components/Modals/EditItem";
import DropDown from "./components/DropDown";
import LoginPage from "./pages/Login/LoginPage";
import Menu from "./pages/Menu";
import "./App.css";
import AddNewItem from "./components/Modals/AddNewItem";
import AddNewEmployee from "./components/Modals/AddNewEmployee";
import AddNewCategory from "./components/Modals/AddNewCategory";
import CategoriesPopUp from "./components/PopUp/CategoriesPopUp";
// import AddCategoryModal from './components/Modals/AddCategoryModal'
import Header from "./components/Header/Header";
import Storehouse from "./components/Storehouse/Storehouse";
import Staff from "./pages/Staff";

function App() {
  const navigate = useNavigate();
  const isAuth = useSelector((state) => state.user.isAuth);

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, [isAuth]);

  return (
    <Routes>
      {isAuth ? (
        <>
          {/* <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              gap: "25px",
            }}
          >

          </div> */}
          <Route path="/menu" element={<Menu />} />
          <Route path="/storehouse" element={<Storehouse />} />
          <Route path="/" element={<AddNewEmployee />} />

        </>
      ) : (
        <>
        <Route path="/login" element={<LoginContainer />} />

        </>
      )}
    </Routes>
  );
}

export default App;
