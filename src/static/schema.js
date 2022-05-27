import * as yup from "yup";

const loginSchema = yup.object({
    userName: yup.string().required("Username is required"),
    password: yup.string().required("Password is required"),
});

const registerSchema = yup.object({
    userName: yup.string().required("Username is required"),
    name: yup.string().required("Name is required"),
    email: yup
        .string()
        .required("Email is required")
        .email("Incorrect Email format"),
    password: yup
        .string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters"),
});

export { loginSchema, registerSchema };
