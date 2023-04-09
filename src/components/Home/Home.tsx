import styles from "./Home.module.scss";
import Sidebar from "./Sidebar";

import { useState } from "react";

export interface Project {
    id: number;
    title: string;
    description: string;
}

const Home = () => {
    const projects: Array<Project> = [
        {
            id: 1,
            title: "Starter Project",
            description: "The first project for starters",
        },
        {
            id: 2,
            title: "Starter Project 2",
            description: "The second project for starters",
        },
        {
            id: 3,
            title: "Starter Project 3",
            description: "The third project for starters",
        },
    ];

    const [tabIndex, setTabIndex] = useState(0);

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
