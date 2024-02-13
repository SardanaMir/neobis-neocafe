import React from "react";
import { components } from "../../Buttons";
import { useFormik } from "formik";
import { basicSchema } from "../../../schema";
import styles from "./styles.module.scss";

const AddNewCategory = ({ title, subtitle, placeholder }) => {
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
  };

  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        <h2 className={styles.title}>{title}</h2>
        <h3 className={styles.subtitle}>{subtitle}</h3>
        <form onSubmit={handleSubmit}>
          <input
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.newCategory}
            type="text"
            id="newCategory"
            placeholder={placeholder}
          />
          <div className={styles.btnGroup}>
            <components.WhiteButton title={"Отмена"} />
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
