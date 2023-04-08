import styles from "./Login.module.scss";
import { yupResolver } from "@hookform/resolvers/yup";
import { signinSchema } from "../../validationSchema";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, NavLink } from "react-router-dom";

const SignIn = () => {
    const navigate = useNavigate();

    const [error, setError] = useState("");
    const {
        register,
        handleSubmit,
        reset,
        setFocus,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(signinSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    // login existing user in firebase
    const handleSignin = async (values: any): Promise<void> => {
        setFocus("email");
        reset();
        await signInWithEmailAndPassword(auth, values.email, values.password)
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
                <form onSubmit={handleSubmit(handleSignin)}>
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
                    <button type="submit">Sign In</button>
                </form>
                <NavLink className={styles.link} to="/signup">
                    Don't have an account? Register here
                </NavLink>
            </div>
        </div>
    );
};

export default SignIn;
