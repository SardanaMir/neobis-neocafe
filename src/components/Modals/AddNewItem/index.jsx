import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import CategoryDropDown from "../../CategoryDropDown";
import MeasureDropDown from "../../MeasureDropDown";
import { basicSchema } from "../../../schema";
import { closeModal } from "../../../redux/slices/modalSlice";
import { components } from "../../Buttons";
import images from "../../../assets/images";
import styles from "./style.module.scss";
import { addItem } from "../../../redux/slices/itemsSlice";

const AddNewItem = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categories);
  const MEASURE = ["мл", "гр", "л", "кг"];
  const [image, setImage] = useState(null);
  const onSubmit = async (e) => {
    console.log("values", values);
    // const formData = convertValuesToFormData(values);
    // console.log("formData", formData);
    try{
      dispatch(addItem(values))
      dispatch(closeModal());

    }catch(err){
      console.log(err)
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
    setFieldValue,
  } = useFormik({
    initialValues: {
      name: "",
      description: "",
      category: "",
      price: "",
      ingredients: [{ name: "", quantity: "", measure: "" }],
      currency: "сом",
      image: null,
      id: 'item100'
    },
    // validationSchema: basicSchema,
    onSubmit: onSubmit,
  });

  const handleClose = () => {
    dispatch(closeModal());
  };
  const convertValuesToFormData = (values) => {
    const formData = new FormData();

    for (let key in values) {
      if (key === "ingredients") {
        // Обработка массива ingredients
        values[key].forEach((ingredient, index) => {
          for (let ingredientKey in ingredient) {
            formData.append(
              `${key}[${index}][${ingredientKey}]`,
              ingredient[ingredientKey]
            );
          }
        });
      } else {
        formData.append(key, values[key]);
      }
    }
    return formData;
  };
  const handleImageChange = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          handleChange({ target: { id: "image", value: reader.result } });
          setImage(reader.result);
        };
        reader.readAsDataURL(file);
      }
    } else {
      console.log("Файл не выбран");
    }
  };
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.items[0].getAsFile();

    if (file) {
      handleImageChange({ target: { files: [file] } });
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  const addIngredient = () => {
    setFieldValue("ingredients", [
      ...values.ingredients,
      { name: "", quantity: "", measure: "" },
    ]);
  };
  const removeIngredient = () => {
    if (values.ingredients.length > 0) {
      const newIngredients = [...values.ingredients];
      newIngredients.pop();
      setFieldValue("ingredients", newIngredients);
    }
  };
  const handleSelect = (selectedValue) => {
    console.log("Выбранная опция:", selectedValue);
    values.category = selectedValue;
  };
  const handleMeasureSelect = (selectedMeasure, index) => {
    const updatedIngredients = [...values.ingredients];
    updatedIngredients[index] = {
      ...updatedIngredients[index],
      measure: selectedMeasure,
    };
    setFieldValue("ingredients", updatedIngredients);
  };

  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        <div>
          <h2 className={styles.title}>Новая позиция</h2>
          <div className={styles.close} onClick={handleClose}>
            &times;
          </div>
        </div>
        <h3 className={styles.subtitle}>Добавьте фото к позиции</h3>
        <div className={styles.imagePickerBorder}>
          <div className={styles.imagePickerWrapper}>
            <div
              className={styles.imagePicker}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <input
                type="file"
                id="file-upload"
                onChange={handleImageChange}
                className={styles.upload}
                style={{ display: "none" }}
              />
              <label
                className={styles.uploadArea}
                onClick={() => document.getElementById("file-upload").click()}
              >
                {!image ? (
                  <div className={styles.imgWrapper}>
                    <div className={styles.uploadIconWrapper}>
                      <img src={images.uploadIcon} alt="Upload Icon" />
                    </div>
                    <p>
                      Перетащите изображение для изменения или{" "}
                      <span>обзор</span>
                    </p>
                  </div>
                ) : (
                  <>
                    <img
                      src={image}
                      alt="Preview"
                      style={{ maxWidth: "100%" }}
                    />
                    <div className={styles.imgWrapper}>
                      <p>
                        Перетащите изображение для изменения или{" "}
                        <span>обзор</span>
                      </p>
                    </div>
                  </>
                )}
              </label>
            </div>
          </div>
        </div>

        <h3 className={styles.subtitle}>Наименование, категория и стоимость</h3>
        <form onSubmit={handleSubmit}>
          <p>Наименование</p>
          <input
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.name}
            id="name"
            type="text"
            name="name"
          />
          {errors?.name && touched?.name && (
            <h5 className={styles.errorMsg}>{errors?.name}</h5>
          )}
          <p>Описание</p>
          <textarea
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.description}
            className={styles.textarea}
            id="description"
            type="textarea"
            name="description"
          />
          <div className={styles.flex}>
            <div>
              <p>Категория</p>
              <div className={styles.categoryWrapper}>
                <CategoryDropDown
                  options={categories}
                  title={"Выберите категорию"}
                  values={values}
                  onSelect={handleSelect}
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
                  type="number"
                  id="price"
                  name="price"
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
          {errors?.price && touched?.price && (
            <h5 className={styles.errorMsg}>{errors?.price}</h5>
          )}
          <h3 className={styles.subtitle}>Состав блюда и граммовка</h3>
          {values.ingredients.map((ingredient, index) => (
            <>
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
                    id={`ingredients${index}`}
                    name={`ingredientName${index}`}
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
                      type="number"
                      id={`quantity${index}`}
                      name={`quantity${index}`}
                    />
                    <div className={styles.measureWrapper}>
                      <MeasureDropDown
                        options={MEASURE}
                        values={values}
                        onSelect={handleMeasureSelect}
                        index={index}
                      />
                    </div>
                  </div>
                </div>
              </div>
              {errors?.ingredients &&
                errors?.ingredients[index]?.name &&
                touched?.ingredients &&
                touched?.ingredients[index] && (
                  <h5 className={styles.errorMsg}>
                    {errors.ingredients[index].name}
                  </h5>
                )}
              {errors?.ingredients &&
                errors?.ingredients[index]?.quantity &&
                touched?.ingredients &&
                touched?.ingredients[index] && (
                  <h5 className={styles.errorMsg}>
                    {errors.ingredients[index].quantity}
                  </h5>
                )}
              {errors?.ingredients &&
                errors?.ingredients[index]?.measure &&
                touched?.ingredients &&
                touched?.ingredients[index] && (
                  <h5 className={styles.errorMsg}>
                    {errors.ingredients[index].measure}
                  </h5>
                )}
            </>
          ))}

          <div className={styles.btnGroup}>
            <button onClick={addIngredient} className={styles.addBtn}>
              Добавить еще
            </button>
            <button onClick={removeIngredient} className={styles.minusBtn}>
              -
            </button>
          </div>
          <div className={styles.btnWrapper}>
            <components.WhiteButton title={"Отмена"} />
            <button
              className={styles.confirmBtn}
              disabled={isSubmitting}
              type="submit"
            >
              Сохранить
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewItem;
