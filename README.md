# task-collab manager

Task management system with realtime updates for task updates. Daily email reminder for due/overdue tasks.

**Full website:** https://task-collab-95adf.firebaseapp.com/
![taskCollab](https://user-images.githubusercontent.com/44554795/234475186-d8c3866c-dd2e-4535-8f15-8f6ac9244190.PNG)

## Why?

Personal project built to learn about new technologies, like Firebase, Sass, and Typescript.

## Lessons Learned:

Rather than using a UI component library with React, I decided to use Sass with CSS modules for frontend styling. It did take longer to make a decent looking UI, but it was much easier to read and debug HTML in JSX instead of MaterialUI components.

This is the first time using Typescript in general, so there were lots of issues finding the right types to go with React components, but there are only benefits to using Typescript. Being notified of incorrect typing right away made it much easier to prevent bugs from shipping.

Rather than creating my own backend, I decided to use Firebase's many tools to see the advantage of using a PaaS. The only big issue I had using Firebase for my backend is the lack of visibility and control. Testing and debugging backend functions, like authentication or Firebase's cloud functions, became very tedious, since you would have to use the provided tools rather than your own methods.

## Tech Used: React, Sass/SCSS, Typescript, Firebase

React along with SCSS modules allowed creation of a maintable and modularized application. Typescript provided additional safety to lower the amount of issues caused by bad typing. Backend services are provided by Firebase with services for user authentication, a realtime database with Firestore, and cloud functions for use with SendGrid's email API. Firestore allows for realtime user and project management.

## Usage:

As a task management system some of the main features are:
-   login/register authentication
-   owner authorization for users/project management
![ownerAuth](https://user-images.githubusercontent.com/44554795/234477177-c56a9261-90a2-4ae9-bc50-e54d95b6f01c.gif)
-   realtime task updates for status/add/deletion
![tasks](https://user-images.githubusercontent.com/44554795/234476134-bca38104-badf-4f9c-9783-118c02ecadf4.gif)


## Contact

Joshua Chung - joshleechung@gmail.com

Project Link - https://github.com/jlchuun/task-collab
