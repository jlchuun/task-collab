import styles from "./Tasks.module.scss";
import TaskCard from "./TaskCard";
import { Project } from "../Home";
import AddTaskModal from "./AddTaskModal";
import ManageUsersModal from "./ManageUsersModal";
import DeleteModal from "./DeleteModal";

type TasksProps = {
    projects: Project[];
    tabIndex: number;
};

const Tasks: React.FC<TasksProps> = ({ projects, tabIndex }) => {
    const tasks = [
        {
            title: "This task name will be longer for longer cards",
            createdBy: "Me",
            dueDate: "10/10/2022",
            status: "ongoing",
        },
        {
            title: "Task 2",
            createdBy: "Me",
            dueDate: "10/10/2022",
            status: "ongoing",
        },
        {
            title: "Task 3",
            createdBy: "Me",
            dueDate: "10/10/2022",
            status: "ongoing",
        },
        {
            title: "This task name will be longer for longer cards",
            createdBy: "Me",
            dueDate: "10/10/2022",
            status: "ongoing",
        },
        {
            title: "Task 2",
            createdBy: "Me",
            dueDate: "10/10/2022",
            status: "ongoing",
        },
        {
            title: "Task 3",
            createdBy: "Me",
            dueDate: "10/10/2022",
            status: "ongoing",
        },
    ];
    return (
        <div className={styles.tasksContainer}>
            <div className={styles.header}>
                <div className={styles.project}>
                    <h1>{projects[tabIndex].title}</h1>
                    <p>{projects[tabIndex].description}</p>
                </div>
                <div className={styles.options}>
                    <AddTaskModal project={projects[tabIndex]} />
                    <ManageUsersModal />
                    <DeleteModal />
                </div>
            </div>
            <div className={styles.columns}>
                <ul className={styles.ongoing}>
                    <h2>Ongoing</h2>

                    {tasks.map((task) => (
                        <TaskCard key={task.title} task={task} />
                    ))}
                </ul>
                <ul className={styles.completed}>
                    <h2>Completed</h2>

                    {tasks.map((task) => (
                        <TaskCard key={task.title} task={task} />
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Tasks;
