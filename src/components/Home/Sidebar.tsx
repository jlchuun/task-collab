import styles from "./Sidebar.module.scss";
import { Project } from "./Home";

type SidebarProps = {
    projects: Array<Project>;
    setTabIndex: (index: number) => void;
};

const Sidebar = ({ projects, setTabIndex }: SidebarProps) => {
    return (
        <aside className={styles.sidebar}>
            <button className={styles.addProject} type="button">
                Create New Project
            </button>

            <ul>
                {projects.map((project, index) => (
                    <li key={project.id}>
                        <button
                            type="button"
                            role="tab"
                            onClick={() => setTabIndex(index)}
                        >
                            <span>{project.title}</span>
                        </button>
                    </li>
                ))}
            </ul>

            <button className={styles.logout}>Logout</button>
        </aside>
    );
};

export default Sidebar;
