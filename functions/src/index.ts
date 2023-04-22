import * as functions from "firebase-functions";
import { EventContext } from "firebase-functions/v1";
import { Timestamp } from "firebase/firestore";
const admin = require("firebase-admin");
const sgMail = require("@sendgrid/mail");
require("dotenv").config();

type Task = {
    name: string,
    dueDate: Timestamp;
    status: "ongoing" | "completed";
} 

admin.initializeApp();
   
exports.sendReminderEmail = functions.runWith({ secrets: ["SG_API_KEY"]}).
    pubsub.schedule("every day 08:00").onRun(async (context: EventContext) => {

    sgMail.setApiKey(process.env.SG_API_KEY);
    
    const db = admin.firestore();
    const now = new Date();
    now.setHours(0, 0, 0, 0);

    // create firestore Timestamp for current day midnight
    const currTimestamp = admin.firestore.Timestamp.fromDate(now);

    // get all tasks in all project docs
    const projectsRef = db.collection("projects");
    projectsRef.get().then((querySnapshot: any) => {

        // loop through each project doc
        querySnapshot.forEach((doc: any) => {
            const project = doc.data();
            // append due tasks to final tasks array
            const tasks = project.tasks.filter((task: Task) => task.dueDate <= currTimestamp && task.status === "ongoing").map((task: Task) => task.name);
            const userEmails = project.users;

            const reminderMsg = `
                <h1>Project: ${project.title}<\h1>
                <h2>${tasks.length} tasks due/overdue</h2>
                ${tasks.map((task: Task) => `<p>${task}</p>`).join("")}
            `

            // loop through all users in project and send email
            for (const email of userEmails) {
                const msg = {
                    to: email,
                    from: "jlchuun@gmail.com",
                    subject: `Tasks Due for ${project.title}`,
                    text: reminderMsg,
                    html: reminderMsg
                };
                sgMail.send(msg).then(() => console.log("email sent"));
            }

        })
    })
});
