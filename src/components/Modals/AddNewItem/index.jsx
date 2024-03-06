import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../../../redux/slices/itemsSlice";
import Select from "react-select";
import { useFormik } from "formik";
import { addNewItem, getStock } from "../../../api";
import { basicSchema } from "../../../schema";
import { closeModal } from "../../../redux/slices/modalSlice";
import { components } from "../../Buttons";
import images from "../../../assets/images";
import styles from "./style.module.scss";

const AddNewItem = () => {
  const MEASURE = [
    { value: "мл", label: "мл" },
    { value: "гр", label: "гр" },
    { value: "л", label: "л" },
    { value: "кг", label: "кг" },
  ];
  const MEAL_TYPE = [
    { value: "готовое", label: "Готовое" },
    { value: "сырье", label: "Сырье" },
  ];
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categories);
  const updatedCategories = categories.map((category) => ({
    ...category,
    value: category.name,
    label: category.name,
  }));
  const stock = useSelector((state) => state.categories.stock);
  const updateStock = stock.map((item) => ({
    item,
    value: item.name,
    label: item.name,
  }));
  const [image, setImage] = useState(null);
  const [isStockChosen, setIsStockChosen] = useState(true);
  const [preview, setPreview] = useState(null);

  const onSubmit = async (e) => {
    if (values){
      const selectedCategory = categories.filter(
        (category) => category.name === values.category
      );
      // console.log('id category', selectedCategory)
      values.category = selectedCategory[0].id;
      // console.log("values", values);
      const formData = convertValuesToFormData(values);
      // console.log("formData", formData);
      try {
        const res = await addNewItem(formData);
        console.log(res);
        dispatch(addItem(values));
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
    setFieldValue,
  } = useFormik({
    initialValues: {
      name: "",
      description: "",
      category: "",
      price: "",
      ingredients: [{ name: "", quantity: "", measurement_unit: "" }],
      image: null,
      available: true,
      // branch: 1,
      mealType: "Готовое",
    },
    // validationSchema: basicSchema,
    onSubmit: onSubmit,
  });
  const handleClose = () => {
    dispatch(closeModal());
  };
  const convertValuesToFormData = (values) => {
    console.log("convertValuesToFormData", values);
    const formData = new FormData();
    for (let key in values) {
      if (key === "ingredients") {
        values.ingredients.forEach((ingredient, index) => {
          formData.append(`ingredients[${index}]name`, ingredient.name);
          formData.append(`ingredients[${index}]quantity`, ingredient.quantity);
          formData.append(`ingredients[${index}]measurement_unit`, ingredient.measurement_unit);
        });
        // formData.append(key, JSON.stringify(values.ingredients))
      } else {
        formData.append(key, values[key]);
      }
    }

    return formData;
  };

  const handleImageChange = (e) => {
    const files = e.target.files[0];
    handleChange({ target: { id: "image", value: files } });
    setImage(files)
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setPreview(reader.result); // Устанавливаем base64 строку изображения в состояние
      }
    };
    
    if (files) {
      reader.readAsDataURL(files); // Чтение файла как base64
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
      setPreview(imageUrl);
    }
  };

  const addIngredient = () => {
    setFieldValue("ingredients", [
      ...values.ingredients,
      { name: "", quantity: "", measurement_unit: "" },
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
    values.category = selectedValue.name;
  };
  const handleMeasureSelect = (selectedMeasure, index) => {
    const updatedIngredients = [...values.ingredients];
    updatedIngredients[index] = {
      ...updatedIngredients[index],
      measurement_unit: selectedMeasure,
    };
    setFieldValue("ingredients", updatedIngredients);
  };
  const handleSelectMealType = async (selectedOption) => {
    console.log(selectedOption);
    if (selectedOption.value === "сырье") {
      setIsStockChosen(false);
      values.mealType = selectedOption.value;
    } else if (selectedOption.value === "готовое") {
      setIsStockChosen(true);
      values.mealType = selectedOption.value;
    }
  };
  // Проверка на существование объекта перед доступом к его свойству
  const handleSelectIngredient = (selectedOption, index) => {
    const newIngredients = [...values.ingredients];
    if (newIngredients[index]) {
      // Добавьте проверку на существование объекта
      newIngredients[index] = {
        ...newIngredients[index],
        name: selectedOption.value,
      };
      setFieldValue("ingredients", newIngredients);
    }
  };
  // Проверка на существование объекта перед доступом к его свойству
  const handleSelectMeasure = (selectedOption, index) => {
    const newIngredients = [...values.ingredients];
    if (newIngredients[index]) {
      // Добавьте проверку на существование объекта
      newIngredients[index] = {
        ...newIngredients[index],
        measurement_unit: selectedOption.value,
      };
      setFieldValue("ingredients", newIngredients);
    }
  };

  const handleSelectCategory = (selectedOption) => {
    console.log("category", selectedOption);
    values.category = selectedOption.value;
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
        <form onSubmit={handleSubmit}>
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
                  {!preview ? (
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
                        src={preview}
                        alt="Preview"
                        style={{ maxWidth: "50%" }}
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

          <h3 className={styles.subtitle}>
            Наименование, категория и стоимость
          </h3>

          <p>Тип позиции</p>
          <Select
            defaultValue={MEAL_TYPE[0].value}
            onChange={handleSelectMealType}
            options={MEAL_TYPE}
            placeholder="Выберите тип позиции"
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                background: "rgb(235, 239, 242)",
                width: 530,
                // height: 60,
                boxShadow: state.isFocused
                  ? "0px solid #ccc"
                  : "0px solid #ccc",
                boxShadow: "none !import",
                borderStyle: "none",
                fontSize: 14,
              }),
              menu: (provided) => ({
                ...provided,
                width: 530,
                background: "rgb(235, 239, 242)",
                borderStyle: "none",
                fontSize: 14,
              }),
              option: (provided) => ({
                ...provided,
                // height: 55,
                background: "rgb(235, 239, 242)",
                color: "rgb(42, 52, 64)",
                borderBottom: "1px solid rgb(205, 211, 221)",
                display: "flex",
                alignItems: "center",
                fontSize: 14,
              }),
            }}
            theme={(theme) => ({
              ...theme,
              borderRadius: 10,
              width: 252,
              height: 55,
              colors: {
                ...theme.colors,
                primary25: "rgb(53, 83, 107)",
                primary: "rgb(53, 83, 107)",
              },
            })}
          />
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
                <Select
                  defaultValue={""}
                  onChange={handleSelectCategory}
                  options={updatedCategories}
                  placeholder="Выберите категорию"
                  styles={{
                    control: (baseStyles, state) => ({
                      ...baseStyles,
                      background: "rgb(235, 239, 242)",
                      width: 250,
                      // height: 55,
                      boxShadow: state.isFocused
                        ? "0px solid #ccc"
                        : "0px solid #ccc",
                      boxShadow: "none !import",
                      borderStyle: "none",
                      fontSize: 14,
                    }),
                    menu: (provided) => ({
                      ...provided,
                      width: 250,
                      borderStyle: "none",
                      background: "rgb(235, 239, 242)",
                      fontSize: 14,
                    }),
                    option: (provided) => ({
                      ...provided,
                      // height: 55,
                      background: "rgb(235, 239, 242)",
                      color: "rgb(42, 52, 64)",
                      borderBottom: "1px solid rgb(205, 211, 221)",
                      display: "flex",
                      alignItems: "center",
                      fontSize: 14,
                    }),
                  }}
                  theme={(theme) => ({
                    ...theme,
                    borderRadius: 10,
                    width: 252,
                    height: 60,
                    colors: {
                      ...theme.colors,
                      primary25: "rgb(53, 83, 107)",
                      primary: "rgb(53, 83, 107)",
                    },
                  })}
                />
              </div>
            </div>
            <div>
              <p>Стоимость</p>
              <div className={styles.flex2}>
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
                    style={{ height: "70px", width: "60px" }}
                    disabled
                  />
                </div>
              </div>
            </div>
          </div>
          {errors?.price && touched?.price && (
            <h5 className={styles.errorMsg}>{errors?.price}</h5>
          )}
          {isStockChosen ? (
            <></>
          ) : (
            <>
              <h3 className={styles.subtitle}>Состав блюда и граммовка</h3>
              {values.ingredients.map((ingredient, index) => (
                <>
                  <div key={index} className={styles.flex}>
                    <div>
                      <p>Наименование</p>
                      <Select
                        defaultValue={""}
                        onChange={(selectedOption) =>
                          handleSelectIngredient(selectedOption, index)
                        }
                        options={updateStock}
                        placeholder="Выберите ингредиент"
                        styles={{
                          control: (baseStyles, state) => ({
                            ...baseStyles,
                            background: "rgb(235, 239, 242)",
                            width: 235,
                            // height: 55,
                            boxShadow: state.isFocused
                              ? "0px solid #ccc"
                              : "0px solid #ccc",
                            boxShadow: "none !import",
                            borderStyle: "none",
                            fontSize: 14,
                          }),
                          menu: (provided) => ({
                            ...provided,
                            width: 235,
                            borderStyle: "none",
                            background: "rgb(235, 239, 242)",
                            fontSize: 14,
                          }),
                          option: (provided) => ({
                            ...provided,
                            // height: 55,
                            background: "rgb(235, 239, 242)",
                            color: "rgb(42, 52, 64)",
                            borderBottom: "1px solid rgb(205, 211, 221)",
                            display: "flex",
                            alignItems: "center",
                            fontSize: 14,
                          }),
                        }}
                        theme={(theme) => ({
                          ...theme,
                          borderRadius: 10,
                          width: 252,
                          height: 60,
                          colors: {
                            ...theme.colors,
                            primary25: "rgb(53, 83, 107)",
                            primary: "rgb(53, 83, 107)",
                          },
                        })}
                      />
                    </div>
                    <div>
                      <p>Кол-во (в гр, мл, л, кг)</p>
                      <div className={styles.flex2}>
                        <input
                          value={ingredient.quantity}
                          onChange={(e) => {
                            const newIngredients = [...values.ingredients];
                            newIngredients[index].quantity = e.target.value;
                            setFieldValue("ingredients", newIngredients);
                          }}
                          onBlur={handleBlur}
                          className={styles.quantityInput}
                          type="number"
                          id={`quantity${index}`}
                          name={`quantity${index}`}
                        />
                        <div className={styles.measureWrapper}>
                          <Select
                            defaultValue={MEASURE[0].value}
                            onChange={(selectedOption) =>
                              handleSelectMeasure(selectedOption, index)
                            }
                            options={MEASURE}
                            placeholder={"мл"}
                            // menuIsOpen={menuIsOpen}
                            // menuPosition="fixed"
                            // maxMenuHeight={200}
                            styles={{
                              control: (baseStyles, state) => ({
                                ...baseStyles,
                                background: "rgb(235, 239, 242)",
                                // width: 252,
                                // height: 55,
                                boxShadow: state.isFocused
                                  ? "0px solid #ccc"
                                  : "0px solid #ccc",
                                boxShadow: "none !import",
                                borderStyle: "none",
                                fontSize: 14,
                              }),
                              menu: (provided) => ({
                                ...provided,
                                // width: 252,
                                borderStyle: "none",
                                background: "rgb(235, 239, 242)",
                                fontSize: 14,
                              }),
                              option: (provided) => ({
                                ...provided,
                                // height: 55,
                                background: "rgb(235, 239, 242)",
                                color: "rgb(42, 52, 64)",
                                borderBottom: "1px solid rgb(205, 211, 221)",
                                display: "flex",
                                alignItems: "center",
                                fontSize: 14,
                              }),
                            }}
                            theme={(theme) => ({
                              ...theme,
                              borderRadius: 10,
                              width: 252,
                              height: 60,
                              colors: {
                                ...theme.colors,
                                primary25: "rgb(53, 83, 107)",
                                primary: "rgb(53, 83, 107)",
                              },
                            })}
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
                <button
                  type="button"
                  onClick={addIngredient}
                  className={styles.addBtn}
                >
                  Добавить еще
                </button>
                <button
                  type="button"
                  onClick={removeIngredient}
                  className={styles.minusBtn}
                >
                  -
                </button>
              </div>
            </>
          )}

          <div className={styles.btnWrapper}>
            <button
              className={styles.cancelBtn}
              type="button"
              onClick={handleClose}
            >
              Отмена
            </button>
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
