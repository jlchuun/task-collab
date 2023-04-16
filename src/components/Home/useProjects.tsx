import { db } from "../../firebase";
import { useState, useContext, useEffect } from "react";
import {
    onSnapshot,
    collection,
    query,
    where,
    orderBy,
} from "firebase/firestore";
import { AccountContext } from "../AccountContext";
import { Project } from "./Home";

const useProjects = (setProjects: (projects: Project[]) => void) => {
    const { currentUser } = useContext(AccountContext);

    useEffect(() => {
        if (currentUser) {
            const userProjects = query(
                collection(db, "projects"),
                orderBy("createdAt", "desc"),
                where("users", "array-contains", currentUser.email)
            );

            const unsubscribe = onSnapshot(userProjects, (querySnapshot) => {
                const projectList: Project[] | null = [];

                querySnapshot.forEach((doc) => {
                    projectList.push({
                        id: doc.id,
                        ...doc.data(),
                    } as Project);
                });
                setProjects(projectList);
            });

            return unsubscribe;
        }
    }, [setProjects]);
};

export default useProjects;
