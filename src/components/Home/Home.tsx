import styles from "./Home.module.scss";
import Sidebar from "./Sidebar/Sidebar";
import useProjects from "./useProjects";
import { Timestamp } from "firebase/firestore";
import Tasks from "./Tasks/Tasks";
import { useState } from "react";
import { Task } from "./Tasks/Tasks";

import { getDocs, collection } from "firebase/firestore";

import { db } from "../../firebase";

export type Project = {
    id: string;
    title: string;
    description: string;
    owner: string;
    users: string[] | null;
    tasks: Task[] | null;
    createdAt: Timestamp;
};

const Home = () => {
    const [projects, setProjects] = useState<Project[]>([]);
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
