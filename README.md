# Workflow

## **Overview**
Workflow is a full-stack, responsive web application that allows users to collaborate on tasks in real-time. Built with React and Tailwind CSS for the frontend, and Firebase Realtime Database for the backend, the app provides a seamless, dynamic platform for creating and joining rooms to work together efficiently.

The primary features include creating rooms, joining rooms, and real-time task collaboration, making it an ideal tool for teams and individuals looking to manage tasks collaboratively in a fluid, real-time environment.

---

## **Features**
- **Create Rooms**: Users can create unique rooms to collaborate with others.
- **Join Rooms**: Easily join existing rooms with an invite link or room code.
- **Real-Time Collaboration**: All members of a room can add, update, and delete tasks that are instantly reflected in other users' views.
- **Task Management**: Users can create, edit, and delete tasks with real-time synchronization across all connected clients.
- **Responsive Design**: Fully responsive design, optimized for mobile, tablet, and desktop devices.
- **User-friendly Interface**: Clean, modern design built with Tailwind CSS for fast and customizable styling.

---

## **Tech Stack**

### **Frontend**:
- **React**: JavaScript library for building user interfaces.
- **Tailwind CSS**: Utility-first CSS framework for fast and efficient styling.
- **React Router**: For handling page navigation in a single-page application.

### **Backend**:
- **Firebase Realtime Database**: A NoSQL cloud database for storing room data and task lists in real-time.
- **Firebase Authentication**: For managing user sign-up and login securely.

### **Deployment**:
- **Vercel** or **Netlify**: For frontend deployment.
- **Firebase Hosting**: For backend hosting (if needed).

---

## **Setup and Installation**

### **Prerequisites**
- Node.js (v14 or higher)
- npm or yarn
- Firebase Account (to set up Firebase Realtime Database and Authentication)

### **Steps to Run Locally**
1. **Clone the Repository**:
    ```bash
    git clone https://github.com/your-username/workflow.git
    cd workflow
    ```

2. **Install Dependencies**: Run the following command to install required packages:
    ```bash
    npm install
    ```

3. **Set Up Firebase**:
    - Go to the [Firebase Console](https://console.firebase.google.com/).
    - Create a new Firebase project.
    - Set up Firebase Realtime Database and Firebase Authentication in your Firebase project.
    - Download the Firebase config file and add it to your project as `firebaseConfig.js` in the `src/` folder.
    - Replace the values in the config file with your Firebase project's keys.

4. **Start the Development Server**:
    ```bash
    npm start
    ```
    Your application should now be running at [http://localhost:3000](http://localhost:3000).

### **Firebase Configuration Example (firebaseConfig.js)**

```javascript
export const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-auth-domain",
  databaseURL: "your-database-url",
  projectId: "your-project-id",
  storageBucket: "your-storage-bucket",
  messagingSenderId: "your-messaging-sender-id",
  appId: "your-app-id"
};
