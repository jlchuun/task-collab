import { useForm } from "react-hook-form";
import { useState, useContext } from "react";
import styles from "../Modal.module.scss";
import { taskSchema } from "../../../validationSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { db } from "../../../firebase";
import { doc, collection, updateDoc, arrayUnion } from "firebase/firestore";
import { AccountContext } from "../../AccountContext";
import { Project } from "../Home";
type Task = {
    name: String;
    dueDate: Date;
};

const AddTaskModal = ({ project }: { project: Project }) => {
    const [open, setOpen] = useState(false);
    const { currentUser } = useContext(AccountContext);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(taskSchema),
        defaultValues: {
            name: "",
            dueDate: "",
        },
    });

    const toggleModal = () => setOpen(!open);

    const addTask = async (values: Task): Promise<void> => {
        reset();
        toggleModal();
        if (currentUser) {
            const projectRef = doc(db, "projects", project.id);
            await updateDoc(projectRef, {
                tasks: arrayUnion({
                    name: values.name,
                    dueDate: values.dueDate,
                    status: "ongoing",
                } as Task),
            });
        }
    };

    return (
        <div className={styles.addTaskContainer}>
            <button className={styles.btn} onClick={toggleModal}>
                Add Task
            </button>
            <div>
                {open && (
                    <div className={styles.modalOverlay}>
                        <div className={styles.modalContainer}>
                            <div className={styles.header}>
                                <h2>Add a Task</h2>
                                <button
                                    className={styles.btn}
                                    type="button"
                                    onClick={toggleModal}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 512 512"
                                    >
                                        <path d="M464 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h416c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm-83.6 290.5c4.8 4.8 4.8 12.6 0 17.4l-40.5 40.5c-4.8 4.8-12.6 4.8-17.4 0L256 313.3l-66.5 67.1c-4.8 4.8-12.6 4.8-17.4 0l-40.5-40.5c-4.8-4.8-4.8-12.6 0-17.4l67.1-66.5-67.1-66.5c-4.8-4.8-4.8-12.6 0-17.4l40.5-40.5c4.8-4.8 12.6-4.8 17.4 0l66.5 67.1 66.5-67.1c4.8-4.8 12.6-4.8 17.4 0l40.5 40.5c4.8 4.8 4.8 12.6 0 17.4L313.3 256l67.1 66.5z" />
                                    </svg>
                                </button>
                            </div>
                            <form onSubmit={handleSubmit(addTask)}>
                                {errors.name && (
                                    <p className={styles.alert}>
                                        {errors.name?.message}
                                    </p>
                                )}
                                <input
                                    placeholder="task name"
                                    {...register("name")}
                                />
                                {errors.dueDate && (
                                    <p className={styles.alert}>
                                        {errors.dueDate?.message}
                                    </p>
                                )}
                                <input type="date" {...register("dueDate")} />
                                <button
                                    className={styles.submitBtn}
                                    type="submit"
                                >
                                    Add Task
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AddTaskModal;
