import { QueryDocumentSnapshot } from "firebase-admin/firestore";
import { Task } from "../src/components/Home/Tasks/Tasks";
import { EventContext } from "firebase-functions/v1";
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const sgMail = require("@sendgrid/mail");
const db = require("./firebase");
const { collection } = require("firebase/firestore");


admin.initalizeApp();
sgMail.setApiKey(
    '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');
   
exports.sendReminderEmail = functions.pubsub.schedule("every 24 hours").onRun(async (context: EventContext) => {
    const now = new Date();
    const projectsRef = collection(db, "projects");

    // get all projects with a due task
    const projectsSnapshot = await projectsRef.where("tasks", "array-contains", ((task: Task) => {
        return task.dueDate.toDate() <= now;
    })).get();

    projectsSnapshot.forEach((doc: QueryDocumentSnapshot) => {
        const project = doc.data();
        const tasks = project.tasks.filter((task: Task) => task.dueDate.toDate() <= now);

        tasks.forEach((task: Task) => {
            console.log(`Task ${task.name} in project ${doc.data().title} due on or before ${now}`);

        })
    })
})
