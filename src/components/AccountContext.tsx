import { useState, useEffect, createContext } from "react";
import firebase from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

type AccountContextProps = {
    currentUser: firebase.User | null;
};

export const AccountContext = createContext<AccountContextProps>({
    currentUser: null,
});

const UserContext = ({ children }: { children: any }) => {
    const [currentUser, setCurrentUser] = useState<firebase.User | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setCurrentUser(user);
            if (user) {
                navigate("/home");
            } else {
                navigate("/login");
            }
        });

        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <AccountContext.Provider value={{ currentUser }}>
            {children}
        </AccountContext.Provider>
    );
};

export default UserContext;
