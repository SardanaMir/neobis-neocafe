import React from "react";
import { useDispatch } from "react-redux";
import { components } from "../../Buttons";
import { useFormik } from "formik";
import { closeModal } from "../../../redux/slices/modalSlice";
import { basicSchema } from "../../../schema";
import styles from "./styles.module.scss";
import { addCategory } from "../../../redux/slices/categoriesSlice";

const AddNewCategory = ({ title, subtitle, placeholder }) => {
  const dispatch = useDispatch();
  const { values, errors, touched, isSubmitting, handleBlur, handleChange } =
    useFormik({
      initialValues: {
        newCategory: "",
      },
      validationSchema: basicSchema,
    });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values.newCategory);
    dispatch(addCategory(values.newCategory))
    dispatch(closeModal());
  };
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
          />
          <div className={styles.btnGroup}>
            <components.WhiteButton
              title={"Отмена"}
              handleClose={handleClose}
            />
            <components.BlueButton
              type="submit"
              disbled={isSubmitting}
              title={"Сохранить"}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewCategory;
