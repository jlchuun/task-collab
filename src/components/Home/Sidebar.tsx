import styles from "./Sidebar.module.scss";
import { Project } from "./Home";
import CreateModal from "./CreateModal";
import { auth } from "../../firebase";

type SidebarProps = {
    projects: Array<Project>;
    setTabIndex: (index: number) => void;
};

const Sidebar: React.FC<SidebarProps> = ({ projects, setTabIndex }) => {
    const handleLogout = () => {
        auth.signOut();
    };

    return (
        <aside className={styles.sidebar}>
            <ul>
                <h1>Task Manager</h1>
                {projects.map((project, index) => (
                    <li key={project.id} className={styles.project}>
                        <button
                            type="button"
                            role="tab"
                            onClick={() => setTabIndex(index)}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 448 512"
                            >
                                <path d="M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H64C28.7 64 0 92.7 0 128v16 48V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V192 144 128c0-35.3-28.7-64-64-64H344V24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H152V24zM48 192H400V448c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V192z" />
                            </svg>
                            <span>{project.title}</span>
                        </button>
                    </li>
                ))}
                <li className={styles.addProject}>
                    <CreateModal />
                </li>
                <li className={styles.logout} onClick={handleLogout}>
                    <button>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                        >
                            <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z" />
                        </svg>
                        Logout
                    </button>
                </li>
            </ul>
        </aside>
    );
};

export default Sidebar;
