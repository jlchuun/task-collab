import styles from "./App.module.scss";
import Views from "./Views";

const App = () => {
    return (
        <div className={styles.container}>
            <Views />
        </div>
    );
};

export default App;
