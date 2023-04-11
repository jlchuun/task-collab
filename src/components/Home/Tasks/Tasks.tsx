import styles from "./Tasks.module.scss";
import TaskCard from "./TaskCard";
import { Project } from "../Home";

type TasksProps = {
    projects: Project[];
    tabIndex: number;
};

const Tasks: React.FC<TasksProps> = ({ projects, tabIndex }) => {
    const tasks = [
        {
            title: "Task 1",
            description: "notes",
            createdBy: "Me",
            dueDate: "10/10/2022",
            status: "ongoing",
        },
        {
            title: "Task 2",
            description: "notes",
            createdBy: "Me",
            dueDate: "10/10/2022",
            status: "ongoing",
        },
        {
            title: "Task 3",
            description: "notes",
            createdBy: "Me",
            dueDate: "10/10/2022",
            status: "ongoing",
        },
    ];
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>Project</h1>
                <p>Description would go here</p>
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
