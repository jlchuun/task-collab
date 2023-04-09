import styles from "./App.module.scss";
import Views from "./Views";
import UserContext from "./AccountContext";
import { BrowserRouter } from "react-router-dom";

const App = () => {
    return (
        <div className={styles.container}>
            <BrowserRouter>
                <UserContext>
                    <Views />
                </UserContext>
            </BrowserRouter>
        </div>
    );
};

export default App;
