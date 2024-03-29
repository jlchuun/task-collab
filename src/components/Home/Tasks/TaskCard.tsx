import styles from "./Tasks.module.scss";
import { Project } from "../Home";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from "../../../firebase";

import { Task } from "./Tasks";

const TaskCard = ({ task, project }: { task: Task; project: Project }) => {
    const toggleStatus = async () => {
        const newStatus = task.status === "ongoing" ? "completed" : "ongoing";
        const projectRef = doc(db, "projects", project.id);
        await updateDoc(projectRef, {
            tasks: arrayRemove(task),
        });

        await updateDoc(projectRef, {
            tasks: arrayUnion({
                ...task,
                status: newStatus,
            }),
        });
    };

    const deleteTask = async () => {
        const projectRef = doc(db, "projects", project.id);
        await updateDoc(projectRef, {
            tasks: arrayRemove(task),
        });
    };

    return (
        <li className={styles.taskCard}>
            <div className={styles.top}>
                <p
                    className={`${styles.status} ${
                        task.status === "ongoing"
                            ? styles.ongoingStatus
                            : styles.completedStatus
                    }`}
                >
                    {task.status}
                </p>
                <h3>{task.name}</h3>
            </div>
            <div className={styles.bot}>
                <p className={styles.dueDate}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                    >
                        <path d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z" />
                    </svg>
                    {task.dueDate.toDate().toLocaleString().split(",")[0]}
                </p>
                <div className={styles.dropdown}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                    >
                        <path d="M384 432c8.8 0 16-7.2 16-16l0-320c0-8.8-7.2-16-16-16L64 80c-8.8 0-16 7.2-16 16l0 320c0 8.8 7.2 16 16 16l320 0zm64-16c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 96C0 60.7 28.7 32 64 32l320 0c35.3 0 64 28.7 64 64l0 320zM224 352c-6.7 0-13-2.8-17.6-7.7l-104-112c-6.5-7-8.2-17.2-4.4-25.9s12.5-14.4 22-14.4l208 0c9.5 0 18.2 5.7 22 14.4s2.1 18.9-4.4 25.9l-104 112c-4.5 4.9-10.9 7.7-17.6 7.7z" />
                    </svg>
                    <ul className={styles.dropdownContent}>
                        <li>
                            <button onClick={toggleStatus}>
                                Toggle Status
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={deleteTask}
                                className={styles.danger}
                            >
                                Delete Task
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </li>
    );
};

export default TaskCard;
