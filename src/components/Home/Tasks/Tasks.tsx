import styles from "./Tasks.module.scss";
import TaskCard from "./TaskCard";
import { Project } from "../Home";
import AddTaskModal from "./AddTaskModal";
import ManageUsersModal from "./UsersModal/ManageUsersModal";
import DeleteModal from "./DeleteModal";
import EditProjectModal from "./EditProjectModal";

type TasksProps = {
    projects: Project[];
    tabIndex: number;
};

const Tasks: React.FC<TasksProps> = ({ projects, tabIndex }) => {
    return (
        <>
            {projects[tabIndex] && (
                <div className={styles.tasksContainer}>
                    <div className={styles.header}>
                        <div className={styles.project}>
                            <h1>{projects[tabIndex].title}</h1>
                            <p>{projects[tabIndex].description}</p>
                        </div>
                        <EditProjectModal project={projects[tabIndex]} />
                        <div className={styles.options}>
                            <AddTaskModal project={projects[tabIndex]} />
                            <ManageUsersModal project={projects[tabIndex]} />
                            <DeleteModal />
                        </div>
                    </div>
                    <div className={styles.columns}>
                        <ul className={styles.ongoing}>
                            <h2>Ongoing</h2>
                            {projects[tabIndex].tasks &&
                                projects[tabIndex].tasks
                                    ?.filter(
                                        (task) => task.status === "ongoing"
                                    )
                                    .map((task) => (
                                        <TaskCard
                                            key={task}
                                            task={task}
                                            project={projects[tabIndex]}
                                        />
                                    ))}
                        </ul>
                        <ul className={styles.completed}>
                            <h2>Completed</h2>

                            {projects[tabIndex].tasks &&
                                projects[tabIndex].tasks
                                    .filter(
                                        (task) => task.status === "completed"
                                    )
                                    .map((task) => (
                                        <TaskCard
                                            key={task}
                                            task={task}
                                            project={projects[tabIndex]}
                                        />
                                    ))}
                        </ul>
                    </div>
                </div>
            )}
        </>
    );
};

export default Tasks;
