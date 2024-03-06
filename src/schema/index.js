import * as yup from "yup";

export const basicSchema = yup.object().shape({
  newCategory: yup
    .string()
    .min(5, "Минимум 5 букв")
    .max(100, "Максимум 100 букв")
    .required("Введите категорию"),
    name: yup
    .string()
    .required("Введите наименование"), // Обязательное поле

  price: yup
    .number()
    .typeError("Цена должна быть числом") // Сообщение об ошибке, если введено не число
    .required("Введите цену") // Обязательное поле
    .positive("Цена должна быть положительной"), // Цена должна быть положительной

  ingredients: yup.array().of(
    yup.object().shape({
      name: yup.string().required("Наименование обязательно"),
      quantity: yup
        .number()
        .typeError("Количество должно быть числом")
        .required("Количество обязательно")
        .positive("Количество должно быть положительным числом"),
      measure: yup
        .string()
        .required("Выберите единицу измерения")
        .test(
          "isValidMeasure",
          "Некорректная единица измерения",
          (value, context) =>
            ["гр", "мл", "л", "кг"].includes(context.parent.measure)
        ),
    })
  ),
});
