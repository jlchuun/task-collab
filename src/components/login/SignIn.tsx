import styles from "./SignIn.module.scss";

import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const onSubmit = async (e: any) => {
        e.preventDefault();
        setEmail("");
        setPassword("");
        await signInWithEmailAndPassword(auth, email, password)
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
                <form>
                    <input
                        type="email"
                        placeholder="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit" onClick={onSubmit}>
                        Sign In
                    </button>
                </form>
                <a href="#">Register Here</a>
            </div>
        </div>
    );
};

export default SignIn;
