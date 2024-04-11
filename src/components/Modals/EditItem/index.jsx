import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import Select from "react-select";
import CategoryDropDown from "../../CategoryDropDown";
import MeasureDropDown from "../../MeasureDropDown";
import { addNewItem, editItemInfo, getMenu } from "../../../api";
import { basicSchema } from "../../../schema";
import { closeModal } from "../../../redux/slices/modalSlice";
import { components } from "../../Buttons";
import images from "../../../assets/images";
import styles from "./style.module.scss";
import { addItem, setItems } from "../../../redux/slices/itemsSlice";

const EditItem = (props) => {
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
  const [isStockChosen, setIsStockChosen] = useState(true);
  const [preview, setPreview] = useState(null);
  const items = useSelector((state) => state.items.items);
  const getItemArr = items.filter((item) => item.id === props.id);
  const [item, setItem] = useState(getItemArr[0]);
  const selectedItem = items.find((item) => item.id === props.id);

  const onSubmit = async (e) => {
    console.log("values", values);
    const updatedData = {
      name: values.name,
      description: values.description,
      category: values.category,
      price: values.price,
      ingredients: values.ingredients,
      // mealType: "сырье",
      image: values.image,
      available: values.available,
    };
    const formData = convertValuesToFormData(updatedData);
    try {
      const res = await editItemInfo(props.id, formData);
      console.log("edit item", res);
      const updateMenu = await getMenu();
      dispatch(setItems(updateMenu.data))
      dispatch(closeModal());
    } catch (err) {
      console.log(err);
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
      id: item.id,
      name: item.name,
      description: item.description,
      category: item.category,
      price: item.price,
      ingredients: item.ingredients,
      mealType: "Сырье",
      image: item.image,
      available: item.available,
    },
    // validationSchema: basicSchema,
    onSubmit: onSubmit,
  });
  const [selectedCategory, setSelectedCategory] = useState(item.category);
  const [selectedMealType, setSelectedMealType] = useState(item.mealType);
  const currentCategory = categories.find(category => category.id === item.category)

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
          formData.append(
            `ingredients[${index}]measurement_unit`,
            ingredient.measurement_unit
          );
        });
        // formData.append(key, JSON.stringify(values.ingredients))
      } else {
        formData.append(key, values[key]);
      }
    }
    return formData;
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setPreview(imageUrl); // Обновляем предпросмотр
    handleChange({ target: { id: "image", value: file } });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.items[0].getAsFile();
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
      handleChange({ target: { id: "image", value: file } });
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
  const handleSelectMealType = async (selectedOption) => {
    console.log(selectedOption);
    setSelectedMealType(selectedOption.value);
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
    setSelectedCategory(selectedOption.value);
    values.category = selectedOption.value;
  };
  const fillFormWithData = (data) => {
    setItem(data);
    setFieldValue("name", data.name);
    setFieldValue("description", data.description);
    setFieldValue("category", data.category);
    setFieldValue("price", data.price);
    setFieldValue("ingredients", data.ingredients);
    setFieldValue("mealType", data.mealType);
  };

  useEffect(() => {
    fillFormWithData(selectedItem);
    setPreview(item.image)
  }, []);
  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        <div>
          <h2 className={styles.title}>Редактирование</h2>
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

          {/* <p>Тип позиции</p>
          <Select
            defaultValue={selectedMealType}
            onChange={handleSelectMealType}
            options={MEAL_TYPE}
            placeholder={selectedMealType}
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
          /> */}
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
                  defaultValue={selectedCategory}
                  onChange={handleSelectCategory}
                  options={updatedCategories}
                  placeholder={currentCategory.name}
                  styles={{
                    control: (baseStyles, state) => ({
                      ...baseStyles,
                      background: "rgb(235, 239, 242)",
                      width: 250,
                      // height: 55,
                      // boxShadow: state.isFocused
                      //   ? "0px solid #ccc"
                      //   : "0px solid #ccc",
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
                    style={{ height: "60px", width: "60px" }}
                    disabled
                  />
                </div>
              </div>
            </div>
          </div>
          {errors?.price && touched?.price && (
            <h5 className={styles.errorMsg}>{errors?.price}</h5>
          )}
          {selectedMealType === "сырье" ? (
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
                        defaultValue={ingredient.name}
                        onChange={(selectedOption) =>
                          handleSelectIngredient(selectedOption, index)
                        }
                        options={updateStock}
                        placeholder={ingredient.name}
                        styles={{
                          control: (baseStyles, state) => ({
                            ...baseStyles,
                            background: "rgb(235, 239, 242)",
                            width: 235,
                            // height: 55,
                            // boxShadow: state.isFocused
                            //   ? "0px solid #ccc"
                            //   : "0px solid #ccc",
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
                            defaultValue={ingredient.measurement_unit}
                            onChange={(selectedOption) =>
                              handleSelectMeasure(selectedOption, index)
                            }
                            options={MEASURE}
                            placeholder={ingredient.measurement_unit}
                            // menuIsOpen={menuIsOpen}
                            // menuPosition="fixed"
                            // maxMenuHeight={200}
                            styles={{
                              control: (baseStyles, state) => ({
                                ...baseStyles,
                                background: "rgb(235, 239, 242)",
                                // width: 252,
                                // height: 55,
                                // boxShadow: state.isFocused
                                //   ? "0px solid #ccc"
                                //   : "0px solid #ccc",
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

export default EditItem;
