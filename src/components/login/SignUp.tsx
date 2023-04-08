import styles from "./Login.module.scss";
import { yupResolver } from "@hookform/resolvers/yup";
import { signupSchema } from "../../validationSchema";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate, NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";

const SignUp = () => {
    const {
        register,
        handleSubmit,
        reset,
        setFocus,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(signupSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    const navigate = useNavigate();
    const [error, setError] = useState("");

    // creates new user in firebase
    const handleSignup = async (values: any): Promise<void> => {
        setFocus("email");
        reset();
        await createUserWithEmailAndPassword(
            auth,
            values.email,
            values.password
        )
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
                navigate("/");
            })
            .catch((err) => {
                setError(err.message);
            });
    };

    return (
        <div className={styles.container}>
            <div className={styles.formContainer}>
                {error ? <p className={styles.alert}>{error}</p> : ""}
                <form onSubmit={handleSubmit(handleSignup)}>
                    {errors.email && (
                        <p className={styles.alert}>{errors.email?.message}</p>
                    )}
                    <input
                        placeholder="email"
                        autoComplete="off"
                        {...register("email")}
                    />
                    {errors.password && (
                        <p className={styles.alert}>
                            {errors.password?.message}
                        </p>
                    )}
                    <input
                        placeholder="password"
                        type="password"
                        {...register("password")}
                    />
                    {errors.confirmPassword && (
                        <p className={styles.alert}>
                            {errors.confirmPassword?.message}
                        </p>
                    )}
                    <input
                        placeholder="confirm password"
                        type="password"
                        {...register("confirmPassword")}
                    />

                    <button type="submit">Sign Up</button>
                </form>
                <NavLink className={styles.link} to="/">
                    Already have an account? Login here.
                </NavLink>
            </div>
        </div>
    );
};

export default SignUp;
