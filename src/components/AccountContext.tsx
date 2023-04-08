import { useState, useEffect, createContext } from "react";
import firebase from "firebase/auth";
import { auth } from "../firebase";

type AccountContextProps = {
    currentUser: firebase.User | null;
};

export const AccountContext = createContext<AccountContextProps>({
    currentUser: null,
});

const UserContext = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<firebase.User | null>(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setCurrentUser(user);
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
