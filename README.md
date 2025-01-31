# Workflow

## **Overview**
Workflow is a full-stack, responsive web application that allows users to collaborate on tasks in real-time. Built with React and Tailwind CSS for the frontend, and Firebase Realtime Database for the backend.
The primary features include creating rooms, joining rooms, and real-time task collaboration, making it an ideal tool for teams and individuals looking to manage tasks collaboratively in a fluid, real-time environment. 

---

## **Features**
- **Create Rooms**: Users can create unique rooms to collaborate with others.
- **Join Rooms**: Easily join existing rooms with an invite link or room code.
- **Real-Time Collaboration**: All members of a room can add, update, and delete tasks that are instantly reflected in other users' views.
- **Task Management**: Users can create, edit, and delete tasks with real-time synchronization across all connected clients.
- **Responsive Design**: Fully responsive design, optimized for mobile, tablet, and desktop devices.
- **User-friendly Interface**: Clean, modern design built with Tailwind CSS for fast and customizable styling.
- **Unique animated background effect**: Added to really make the website stand out from many others.

---

## **Tech Stack**

### **Frontend**:
- **React**: JavaScript library for building user interfaces.
- **Tailwind CSS**: Utility-first CSS framework for fast and efficient styling.
- **React Router**: For handling page navigation in a single-page application.

### **Backend**:
- **Firebase Realtime Database**: A NoSQL cloud database for storing room data and task lists in real-time.

### **Deployment**:
- **Vercel**: For frontend deployment.

---

## **Setup and Installation**

### **Prerequisites**
- Node.js (v14 or higher)
- npm
- Firebase Account (to set up Firebase Realtime Database)

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
    - Set up Firebase Realtime Database in your Firebase project.
    - Download the Firebase config file and add it to your project as `firebaseConfig.js` in the `src/` folder.
    - Replace the values in the config file with your Firebase project's keys.

4. **Start the Development Server**:
    ```bash
    npm start
    ```
    Your application should now be running at [http://localhost:3000](http://localhost:3000).

5 **Run Frontend Server**
    ```bash
    npm run dev
    ```
    Your application should be working in [http://localhost:5173/](http://localhost:5173/).
    

## **Contributing**

We welcome contributions to improve **Workflow**! If you'd like to contribute, please follow these steps:

1. **Fork the repository**.
2. **Create a new branch**:
    ```bash
    git checkout -b feature-name
    ```
3. **Make your changes**.
4. **Commit your changes**:
    ```bash
    git commit -am 'Add feature'
    ```
5. **Push to the branch**:
    ```bash
    git push origin feature-name
    ```
6. **Open a pull request** with a description of your changes.

Please ensure your code follows the existing style, and feel free to open issues if you have any questions or suggestions.

---

## **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

