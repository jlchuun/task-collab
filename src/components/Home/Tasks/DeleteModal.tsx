import { useState } from "react";
import styles from "../Modal.module.scss";
import { db } from "../../../firebase";
import {
    doc,
    deleteDoc,
    updateDoc,
    arrayRemove,
    where,
    query,
    collection,
    getDocs,
} from "firebase/firestore";
import { Project } from "../Home";

const DeleteModal = ({ project }: { project: Project }) => {
    const [open, setOpen] = useState(false);

    const toggleModal = () => setOpen(!open);
    const deleteProject = async () => {
        // delete project doc
        const projectRef = await deleteDoc(doc(db, "projects", project.id));

        // delete project from all users doc
        const usersQuery = query(
            collection(db, "users"),
            where("projects", "array-contains", project.id)
        );

        const querySnapshot = await getDocs(usersQuery);

        // update each user projects
        await querySnapshot.forEach((doc) => {
            updateDoc(doc.ref, {
                projects: arrayRemove(project.id),
            });
        });
    };
    return (
        <div className={styles.deleteProjectContainer}>
            <button
                className={`${styles.btn} ${styles.danger}`}
                onClick={toggleModal}
            >
                Delete Project
            </button>
            <div>
                {open && (
                    <div className={styles.modalOverlay}>
                        <div className={styles.modalContainer}>
                            <div className={styles.header}>
                                <h2>Delete Project</h2>
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
                            <div
                                onClick={deleteProject}
                                className={styles.btnContainer}
                            >
                                <button
                                    className={`${styles.btn} ${styles.danger}`}
                                >
                                    Confirm Delete
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DeleteModal;
