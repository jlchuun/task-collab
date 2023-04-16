import { useState } from "react";
import styles from "../../Modal.module.scss";
import { addUserSchema } from "../../../../validationSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { db } from "../../../../firebase";
import { useForm } from "react-hook-form";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";

import UserItem from "./UserItem";

type FormProps = {
    email: string;
};

const ManageUsersModal = ({ project }) => {
    const [open, setOpen] = useState(false);

    const toggleModal = () => setOpen(!open);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(addUserSchema),
        defaultValues: {
            email: "",
        },
    });

    const addUser = async (values: FormProps) => {
        reset();
        toggleModal();
        const projectRef = doc(db, "projects", project.id);
        await updateDoc(projectRef, {
            users: arrayUnion({
                email: values.email,
            }),
        });

        const userRef = doc(db, "users", values.email);
        await updateDoc(userRef, {
            projects: arrayUnion(project.id),
        });
    };
    return (
        <div className={styles.addTaskContainer}>
            <button className={styles.btn} onClick={toggleModal}>
                Manage Users
            </button>
            <div>
                {open && (
                    <div className={styles.modalOverlay}>
                        <div className={styles.modalContainer}>
                            <div className={styles.header}>
                                <h2>Manage Users</h2>
                                <button
                                    type="button"
                                    className={styles.btn}
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
                            <form onSubmit={handleSubmit(addUser)}>
                                {errors.email && (
                                    <p className={styles.alert}>
                                        {errors.email?.message}
                                    </p>
                                )}
                                <input
                                    autoComplete="off"
                                    placeholder="email"
                                    {...register("email")}
                                />
                                <button
                                    className={styles.submitBtn}
                                    type="submit"
                                >
                                    Add Task
                                </button>
                            </form>
                            <ul></ul>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManageUsersModal;
