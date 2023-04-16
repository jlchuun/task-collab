import styles from "./Home.module.scss";
import Sidebar from "./Sidebar/Sidebar";
import { useState } from "react";
import useProjects from "./useProjects";
import { Timestamp } from "firebase/firestore";
import Tasks from "./Tasks/Tasks";

export type Project = {
    id: string;
    title: string;
    description: string;
    owner: string;
    users: string[] | null;
    tasks: string[] | null;
    createdAt: Timestamp;
};

const Home = () => {
    const [projects, setProjects] = useState([]);
    const [tabIndex, setTabIndex] = useState(0);

    useProjects(setProjects);
    return (
        <div className={styles.container}>
            <Sidebar
                projects={projects}
                setTabIndex={setTabIndex}
                tabIndex={tabIndex}
            />
            <Tasks projects={projects} tabIndex={tabIndex} />
        </div>
    );
};

export default Home;
