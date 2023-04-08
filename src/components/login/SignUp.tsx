import styles from "./Login.module.scss";
import { yupResolver } from "@hookform/resolvers/yup";
import { signupSchema } from "../../validationSchema";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate, NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";

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
                const errCode = err.code;
                const errMsg = err.message;
                console.log(errCode, errMsg);
            });
    };

    return (
        <div className={styles.container}>
            <div className={styles.formContainer}>
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

                    <button type="submit">Sign In</button>
                </form>
                <NavLink to="/">
                    <a href="#">Sign In Here</a>
                </NavLink>
            </div>
        </div>
    );
};

export default SignUp;
