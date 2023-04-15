import { useState } from "react";
import styles from "../Modal.module.scss";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { projectSchema } from "../../../validationSchema";
import { Project } from "../Home";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase";

type FormProps = {
    title: string;
    description: string | undefined;
};

const EditProjectModal = ({ project }: { project: Project }) => {
    const [open, setOpen] = useState(false);

    const toggleModal = () => setOpen(!open);

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

    const updateProject = async (values: FormProps): Promise<void> => {
        reset();
        toggleModal();
        const projectRef = doc(db, "projects", project.id);
        await updateDoc(projectRef, {
            title: values.title,
            description: values.description,
        });
    };

    return (
        <div className={styles.editProjectContainer}>
            <button className={styles.toggleBtn} onClick={toggleModal}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z" />
                </svg>
            </button>
            <div>
                {open && (
                    <div className={styles.modalOverlay}>
                        <div className={styles.modalContainer}>
                            <div className={styles.header}>
                                <h2>Edit Project</h2>
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
                            <form onSubmit={handleSubmit(updateProject)}>
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
                                <button
                                    className={styles.submitBtn}
                                    type="submit"
                                >
                                    Update Project
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EditProjectModal;
