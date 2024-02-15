import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";

const EditItem = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categories);
  const MEASURE = ["мл", "гр", "л", "кг"];

  const { values, errors, touched, isSubmitting, handleBlur, handleChange } =
    useFormik({
      initialValues: {
        itemName: "",
        description: "",
        category: "",
        price: "",
        ingredients: "",
        quantity: "",
        image: null,
      },
    });

  const handleClose = () => {
    dispatch(closeModal());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(values);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        handleChange({ target: { id: "image", value: reader.result } });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        <div>
          <h2 className={styles.title}>Редактирование</h2>
          <div className={styles.close} onClick={handleClose}>
            &times;
          </div>
        </div>
        <h3 className={styles.subtitle}>Добавьте фото к позиции</h3>
        <div className={styles.imagePicker}>
          <input
            type="file"
            id="file-upload"
            className={styles.upload}
            onChange={handleImageChange}
          />
          <label htmlFor="file-upload" className={styles.uploadArea}>
            <div className={styles.uploadIconWrapper}>
              <img src={images.uploadIcon} alt="Upload Icon" />
            </div>
            <p>Перетащите изображение для изменения или обзор</p>
          </label>
        </div>
        <h3 className={styles.subtitle}>Наименование, категория и стоимость</h3>
        <form onSubmit={handleSubmit}>{/* остальной ваш код формы */}</form>
      </div>
    </div>
  );
};

export default EditItem;
