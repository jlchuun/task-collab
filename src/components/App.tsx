import styles from "./App.module.scss";
import Views from "./Views";
import UserContext from "./AccountContext";
import { HashRouter } from "react-router-dom";

const App = () => {
    return (
        <div className={styles.container}>
            <HashRouter>
                <UserContext>
                    <Views />
                </UserContext>
            </HashRouter>
        </div>
    );
};

export default App;
