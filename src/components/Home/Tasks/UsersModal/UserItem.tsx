import styles from "./User.module.scss";
import { db } from "../../../../firebase";
import {
    doc,
    updateDoc,
    arrayRemove,
    where,
    query,
    collection,
    getDocs,
} from "firebase/firestore";
import { Project } from "../../Home";
import { useContext, useState } from "react";
import { AccountContext } from "../../../AccountContext";

const UserItem = ({ user, project }: { user: string; project: Project }) => {
    const { currentUser } = useContext(AccountContext);
    const deleteUser = async () => {
        const userQuery = query(
            collection(db, "users"),
            where("email", "==", user)
        );

        const querySnapshot = await getDocs(userQuery);
        // remove project from user doc
        await querySnapshot.forEach((doc) => {
            updateDoc(doc.ref, {
                projects: arrayRemove(project.id),
            });
        });

        // remove user from project doc
        const projectRef = doc(db, "projects", project.id);
        await updateDoc(projectRef, {
            users: arrayRemove(user),
        });
    };
    return (
        <li className={styles.userItem}>
            <h3>{user}</h3>
            {currentUser?.email !== user && (
                <button onClick={deleteUser}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 384 512"
                    >
                        <path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z" />
                    </svg>
                </button>
            )}
        </li>
    );
};

export default UserItem;
