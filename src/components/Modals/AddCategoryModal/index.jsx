import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
// import { basicSchema } from "../../../schema";
import { closeModal } from "../../../redux/slices/modalSlice";
import * as yup from "yup";
import styles from "./style.module.scss";
import {components} from "../../Buttons";

const AddCategoryModal = (props) => {
  const dispatch = useDispatch();

  const basicSchema = yup.object().shape({
    newCategory: yup
      .string()
      .min(5, "Минимум 5 букв")
      .max(100, "Максимум 100 букв")
      .required("Введите категорию"),
  });

  const {
    values,
    isSubmitting,
    handleBlur,
    handleChange,
    errors,
    touched,
  } = useFormik({
    initialValues: {
      newCategory: "",
    },
    validationSchema: basicSchema,
  });
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(values.newCategory);

    basicSchema
      .validate(values, { abortEarly: false })
      .then(() => {
        console.log("Валидация успешна");
        dispatch(closeModal());
        //добавить новую категорию
      })
      .catch((errors) => {
        console.log("Ошибки валидации:", errors);
      });
  };

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        <h2 className={styles.title}>{props.title}</h2>
        <div onClick={handleCloseModal} className={styles.close}>
          &times;
        </div>
        <h3 className={styles.subtitle}>{props.subtitle}</h3>
        <form onSubmit={handleSubmit}>
          <input
            className={styles.input}
            type="text"
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder={props.placeholder}
            value={values.newCategory}
            id="single-input"
            autoComplete="off"
          />
          <div className={styles.flex}>
            <components.WhiteButton title={'Отмена'} onClick={handleCloseModal}/>
            <components.BlueButton title={'Добавить'} type="submit"/>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategoryModal;
