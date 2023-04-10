import styles from "./Home.module.scss";
import Sidebar from "./Sidebar";
import { useState } from "react";
import useProjects from "./useProjects";
import { Timestamp } from "firebase/firestore";

export interface Project {
    id: string;
    title: string;
    description: string;
    owner: string;
    users: string[] | null;
    createdAt: Timestamp;
}

const Home = () => {
    const projects: Array<Project> = useProjects();
    const [tabIndex, setTabIndex] = useState(0);
    useProjects();

    return (
        <div className={styles.container}>
            <Sidebar projects={projects} setTabIndex={setTabIndex} />
            <div className={styles.tabPanels}>
                {projects
                    .filter((project, index) => {
                        if (index === tabIndex) {
                            return project;
                        }
                    })
                    .map((project) => (
                        <div key={project.id}>{project.description}</div>
                    ))}
            </div>
        </div>
    );
};

export default Home;
