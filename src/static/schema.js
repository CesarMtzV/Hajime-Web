import * as yup from "yup";

const kanjiCharacterSchema = yup.object({
    kanji: yup.string().required("You must type the Kanji character"),
    spelling: yup.string().required("You must type the spelling of the character"),
    definitions: yup.string().required("You must type the definition"),
    strokes: yup.number().typeError("Number of strokes must be a number").required("You must type the number of strokes"),
    examples: yup.string().required("You must type an example"),
});

const kanjiSetSchema = yup.object({
    title: yup.string().required("You must type a title for the set"),
});

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

export { loginSchema, registerSchema, kanjiSetSchema, kanjiCharacterSchema };
