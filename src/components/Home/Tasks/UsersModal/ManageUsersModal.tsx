import { useState } from "react";
import styles from "../../Modal.module.scss";
import { addUserSchema } from "../../../../validationSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { db } from "../../../../firebase";
import { useForm } from "react-hook-form";
import {
    doc,
    updateDoc,
    arrayUnion,
    where,
    query,
    collection,
    getDocs,
} from "firebase/firestore";
import { Project } from "../../Home";
import UserItem from "./UserItem";

type FormProps = {
    email: string;
};

const ManageUsersModal = ({ project }: { project: Project }) => {
    const [open, setOpen] = useState(false);
    const [error, setError] = useState("");
    const toggleModal = () => {
        setOpen(!open);
        setError("");
    };
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
        // query should return only one user
        const userQuery = query(
            collection(db, "users"),
            where("email", "==", values.email)
        );

        const querySnapshot = await getDocs(userQuery);

        // check if user email exists in users doc
        if (querySnapshot.empty) {
            setError("User email does not exist");
            reset();
            return;
        }

        // add project to added user doc
        await querySnapshot.forEach((doc) => {
            updateDoc(doc.ref, {
                projects: arrayUnion(project.id),
            });
        });

        // add user to projects doc
        const projectRef = doc(db, "projects", project.id);
        await updateDoc(projectRef, {
            users: arrayUnion(values.email),
        });
        reset();
        toggleModal();
    };
    console.log(project.users);
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
                                {error && (
                                    <p className={styles.alert}>{error}</p>
                                )}

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
                                    Add User
                                </button>
                            </form>
                            <ul>
                                {project.users &&
                                    project.users.map((user) => (
                                        <UserItem user={user} />
                                    ))}
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManageUsersModal;
