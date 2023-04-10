import styles from "./CreateModal.module.scss";
import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { projectSchema } from "../../../validationSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { db } from "../../../firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { Project } from "../Home";
import { AccountContext } from "../../AccountContext";

interface FormProps {
    title: string;
    description: string | undefined;
}

const CreateModal = () => {
    const [open, setOpen] = useState(false);
    const { currentUser } = useContext(AccountContext);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(projectSchema),
        defaultValues: {
            title: "",
            description: "",
        },
    });

    const toggleModal = () => {
        setOpen(!open);
    };

    const createProject = async (values: FormProps): Promise<void> => {
        reset();
        toggleModal();
        if (currentUser) {
            await addDoc(collection(db, "projects"), {
                title: values.title,
                description: values.description,
                owner: currentUser.uid,
                createdAt: Timestamp.now(),
                users: [] as string[],
            } as Project);
        }
    };

    return (
        <div>
            <button type="button" onClick={toggleModal}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                </svg>
                Create New Project
            </button>
            {open && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalContainer}>
                        <div className={styles.header}>
                            <h2>Create a New Project</h2>
                            <button
                                type="button"
                                onClick={toggleModal}
                                className={styles.closeBtn}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 512 512"
                                >
                                    <path d="M464 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h416c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm-83.6 290.5c4.8 4.8 4.8 12.6 0 17.4l-40.5 40.5c-4.8 4.8-12.6 4.8-17.4 0L256 313.3l-66.5 67.1c-4.8 4.8-12.6 4.8-17.4 0l-40.5-40.5c-4.8-4.8-4.8-12.6 0-17.4l67.1-66.5-67.1-66.5c-4.8-4.8-4.8-12.6 0-17.4l40.5-40.5c4.8-4.8 12.6-4.8 17.4 0l66.5 67.1 66.5-67.1c4.8-4.8 12.6-4.8 17.4 0l40.5 40.5c4.8 4.8 4.8 12.6 0 17.4L313.3 256l67.1 66.5z" />
                                </svg>
                            </button>
                        </div>

                        <form onSubmit={handleSubmit(createProject)}>
                            {errors.title && (
                                <p className={styles.alert}>
                                    {errors.title?.message}
                                </p>
                            )}
                            <input
                                placeholder="title"
                                autoComplete="off"
                                {...register("title")}
                            />
                            <textarea
                                placeholder="description (optional)"
                                autoComplete="off"
                                {...register("description")}
                            />
                            <button type="submit">Create Project</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CreateModal;
