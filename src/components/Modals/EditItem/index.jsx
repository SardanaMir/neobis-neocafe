import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DropDown from "../../DropDown";
import { useFormik } from "formik";
import List from "../../List";
import { closeModal } from "../../../redux/slices/modalSlice";
import { components } from "../../Buttons";
import images from "../../../assets/images";
import styles from "./style.module.scss";

const EditItem = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categories);
  const MEASURE = ["мл", "гр", "л", "кг"];
  const [image, setImage] = useState(null);
  // const [ingredients, setIngredients] = useState([{ name: "", quantity: "" }]);

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    setFieldValue,
  } = useFormik({
    initialValues: {
      itemName: "",
      description: "",
      category: "",
      price: "",
      ingredients: [{ name: "", quantity: "" }],
      currency: "сом",
      image: null,
    },
    // validationSchema: basicSchema,
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
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const addIngredient = () => {
    setFieldValue("ingredients", [
      ...values.ingredients,
      { name: "", quantity: "" },
    ]);
  };
  const removeIngredient = () => {
    if (values.ingredients.length > 0) {
        const newIngredients = [...values.ingredients];
        newIngredients.pop();
        setFieldValue('ingredients', newIngredients);
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

        <div className={styles.imagePickerWrapper}>
          <div class={styles.imagePicker}>
            <input
              type="file"
              id="file-upload"
              onChange={handleImageChange}
              className={styles.upload}
            />
            <label htmlFor="file-upload" class={styles.uploadArea}>
              {!image ? (
                <>
                  <div class={styles.uploadIconWrapper}>
                    <img src={images.uploadIcon} alt="Upload Icon" />
                  </div>
                  <p>Перетащите изображение для изменения или обзор</p>
                </>
              ) : (
                <>
                  <img src={image} alt="Preview" style={{ maxWidth: "100%" }} />
                </>
              )}
            </label>
          </div>
        </div>

        <h3 className={styles.subtitle}>Наименование, категория и стоимость</h3>
        <form onSubmit={handleSubmit}>
          <p>Наименование</p>
          <input
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.itemName}
            id="itemName"
            type="text"
          />
          <p>Описание</p>
          <textarea
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.description}
            className={styles.textarea}
            id="description"
            type="textarea"
          />
          <div className={styles.flex}>
            <div>
              <p>Категория</p>
              <div className={styles.categoryWrapper}>
                <List
                  options={categories}
                  values={"Выберите категорию"}
                  value={values.category}
                />
              </div>
            </div>
            <div>
              <p>Стоимость</p>
              <div className={styles.flex}>
                <input
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.price}
                  className={styles.priceInput}
                  type="text"
                  id="price"
                />
                <div className={styles.measureWrapper}>
                  <input
                    type="text"
                    value={values.currency}
                    placeholder="сом"
                    disabled
                  />
                </div>
              </div>
            </div>
          </div>
          <h3 className={styles.subtitle}>Состав блюда и граммовка</h3>
          {values.ingredients.map((ingredient, index) => (
            <div key={index} className={styles.flex}>
              <div>
                <p>Наименование</p>
                <input
                  value={ingredient.name}
                  onChange={(e) => {
                    const newIngredients = [...values.ingredients];
                    newIngredients[index].name = e.target.value;
                    setFieldValue("ingredients", newIngredients);
                  }}
                  onBlur={handleBlur}
                  className={styles.priceInput}
                  type="text"
                  id="ingredients"
                />
              </div>
              <div>
                <p>Кол-во (в гр, мл, л, кг)</p>
                <div className={styles.flex}>
                  <input
                    value={ingredient.quantity}
                    onChange={(e) => {
                      const newIngredients = [...values.ingredients];
                      newIngredients[index].quantity = e.target.value;
                      setFieldValue("ingredients", newIngredients);
                    }}
                    onBlur={handleBlur}
                    className={styles.priceInput}
                    type="text"
                    id="quantity"
                  />
                  <div className={styles.measureWrapper}>
                    <List options={MEASURE} values={"мл"} />
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className={styles.btnGroup}>
            <button onClick={addIngredient} className={styles.addBtn}>
              Добавить еще
            </button>
            <button onClick={removeIngredient} className={styles.minusBtn}>-</button>
          </div>
          <div className={styles.btnWrapper}>
            <components.WhiteButton title={"Отмена"} />
            <components.BlueButton
              disabled={isSubmitting}
              title={"Сохранить"}
              type="submit"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditItem;
