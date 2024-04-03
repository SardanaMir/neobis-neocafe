import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { components } from "../../Buttons";
import { useFormik } from "formik";
import { createNewCategory, getAllCategories } from "../../../api";
import { closeModal } from "../../../redux/slices/modalSlice";
import { basicSchema } from "../../../schema";
import { addCategory, setCategories } from "../../../redux/slices/categoriesSlice";
import styles from "./styles.module.scss";

const AddNewCategory = ({ title, subtitle, placeholder }) => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categories);

  const onSubmit = async () => {
    const isCategoryExists = categories.some(
      (category) => category.name.toLowerCase() === values.newCategory.toLowerCase()
    );
    if (isCategoryExists) {
      errors.newCategory = `Категория '${values.newCategory}' уже существует`;
    } else {
      try {
        const res = await createNewCategory({ name: values.newCategory });
        // console.log("createNewCategory res", res);
        const allCategoriesData = await getAllCategories()
        console.log('updated', allCategoriesData)
        dispatch(setCategories(allCategoriesData.data));
        dispatch(closeModal());
      } catch (err) {
        console.log(err);
      }
    }
  };

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      newCategory: "",
    },
    // validationSchema: basicSchema,
    onSubmit: onSubmit,
  });

  const handleClose = () => {
    dispatch(closeModal());
  };
  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        <div className={styles.titleWrapper}>
          <h2 className={styles.title}>{title}</h2>
          <div className={styles.close} onClick={handleClose}>
            &times;
          </div>
        </div>
        <h3 className={styles.subtitle}>{subtitle}</h3>
        <form onSubmit={handleSubmit}>
          <input
            className={styles.input}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.newCategory}
            type="text"
            id="newCategory"
            placeholder={placeholder}
            name="newCategory"
            minLength={3}
            maxLength={150}
          />
          {errors?.newCategory && touched?.newCategory && (
            <h5 className={styles.errorMsg}>{errors?.newCategory}</h5>
          )}
          <div className={styles.btnGroup}>
            <button
              className={styles.cancelBtn}
              disabled={isSubmitting}
              onClick={handleClose}
            >
              Отмена
            </button>
            <button
              className={styles.addBtn}
              type="submit"
              disabled={isSubmitting}
            >
              Сохранить
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewCategory;
