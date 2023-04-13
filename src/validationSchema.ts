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
    
export const projectSchema = yup.object({
    title: yup.string().required("Title is required").max(20, "Title has to be less than 20 characters"),
    description: yup.string().optional()
});

const formatDate = (date: Date) : String => {
    return new Date(date).toDateString();
}

export const taskSchema = yup.object({
    name: yup.string().required("Task name required").max(20, "Task name has to be less than 20 characters"),
    dueDate: yup.date().required("Date is required")
});

