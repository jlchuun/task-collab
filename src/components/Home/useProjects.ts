import { db } from "../../firebase";
import { useState, useContext, useEffect } from "react";
import { onSnapshot, collection, query, where } from "firebase/firestore";
import { AccountContext } from "../AccountContext";
import { Project } from "./Home";

const useProjects = () => {
    const { currentUser } = useContext(AccountContext);
    const [projects, setProjects] = useState<Project[]>([]);
    

    useEffect(() => {
        if (currentUser) {
            const userProjects = query(collection(db, "projects"), where("owner", "==", currentUser.uid));
            const unsubscribe = onSnapshot(userProjects, (querySnapshot) => {
                const projectList: Project[] | null = [];

                querySnapshot.forEach((doc) => {
                    projectList.push({
                        id: doc.id,
                        ...doc.data()
                    } as Project)
                })
                setProjects(projectList);
            })

            return unsubscribe;
        }
    }, []);

    return projects;

}

export default useProjects;