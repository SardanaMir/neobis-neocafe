import { useFormik } from 'formik';

export const {
    values,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
    errors,
    touched
} = useFormik({
    initialValues: {
        newCategory: "",
    },
    onSubmit,
    validationSchema: basicSchema
});
