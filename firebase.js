import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";  // Import Realtime DB methods

const firebaseConfig = {
  apiKey: "AIzaSyCuOpIeXzzQ-tCycFojNOA3ynqiitzlKtw",
  authDomain: "workflow-adaa4.firebaseapp.com",
  databaseURL: "https://workflow-adaa4-default-rtdb.firebaseio.com", // Realtime Database URL
  projectId: "workflow-adaa4",
  storageBucket: "workflow-adaa4.firebasestorage.app",
  messagingSenderId: "501115603321",
  appId: "1:501115603321:web:2e89cb62cf095457a007a8",
  measurementId: "G-BEF24RLCR5"
};

const app = initializeApp(firebaseConfig);


function writeData(roomId, id, title, description, status, priority, points, image) {
  const db = getDatabase(app);
  const reference = ref(db, "rooms/" + roomId + "/" + id); 

  set(reference, { 
    id: id,
    title: title,
    description: description,
    status: status,
    priority: priority,
    points: points,
    image: image
  })
  .then(() => {
    console.log("Data added successfully");
  })
}


function readData(roomId) {
  const db = getDatabase(app);
  const reference = ref(db, "rooms/" + roomId);

  return reference;
}

export { writeData , readData };

