import React, { useState, useEffect } from "react";
import { getStock } from "./api";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import Autosuggest from "react-autosuggest";

const EditItem = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categories);
  const MEASURE = ["мл", "гр", "л", "кг"];
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

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
  const onInputChange = (event, { newValue }) => {
    setInputValue(newValue);
  };
  // Функция для отображения подсказок
  const getSuggestions = async (value) => {
    const res = await getStock(); // Здесь вызывается ваш метод для получения данных по введенному значению
    const search = res.data.filter((item) => item.name === value);
    setSuggestions(search); // Устанавливает полученные данные в состояние подсказок
  };

  const handleInputChange = (event, { newValue }) => {
    setInputValue(newValue);
  };

  useEffect(() => {
    getSuggestions(inputValue);
  }, [inputValue]);

  const onSuggestionsFetchRequested = ({ value }) => {
    getSuggestions(value);
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };
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
    <>
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={(suggestion) => suggestion.name}
        renderSuggestion={(suggestion) => <div>{suggestion.name}</div>}
        inputProps={{
          value: inputValue,
          onChange: handleInputChange,
        }}
      />
    </>
  );
};

export default EditItem;
