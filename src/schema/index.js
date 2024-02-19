import * as yup from "yup";

export const basicSchema = yup.object().shape({
    newCategory: yup
    .string()
    .min(5, 'Минимум 5 букв')
    .max(100, "Максимум 100 букв")
    .required("Введите категорию")
});