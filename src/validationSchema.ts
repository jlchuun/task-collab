import * as yup from "yup";

export const signupSchema = yup.object({
    email: yup.string().required("Email is required").email(),
    password: yup.string()
        .required("Password is required")
        .min(6, "Password is too short")
        .max(20, "Password is too long")
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/, "Password must contain at least one capital and one number"),
    confirmPassword: yup.string()
        .oneOf([yup.ref("password"), ""], "Passwords must match")
}).required();

export const signinSchema = yup.object({
        email: yup.string().required("Username is required").email(),
        password: yup.string().required("Password is required")
}).required(); 
    