import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
  }
});

app.use(express.json());

let users = [];
const roomData = {};

const corsOptions = {
  origin: '*', 
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());  // For parsing JSON request bodies

function generateRoomId() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let roomId = '';
  for (let i = 0; i < 6; i++) {
    roomId += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return roomId;
}

app.post('/create', (req, res) => {
  const roomId = generateRoomId();
  roomData[roomId] = {
        "tasks": [
          {
            "title": "Fix Login Bug",
            "description": "Investigate and fix the bug preventing users from logging in successfully.",
            "id": "Task-5",
            "status": "in-progress",
            "points": 3,
            "priority": "high"
          },
          {
            "title": "Design New Logo",
            "description": "Create a new logo for the upcoming product launch.",
            "id": "Task-6",
            "status": "todo",
            "points": 2,
            "priority": "low"
          },
          {
            "title": "Write Documentation",
            "description": "Write the technical documentation for the new feature added to the software.",
            "id": "Task-7",
            "status": "todo",
            "points": 7,
            "priority": "medium"
          },
          {
            "title": "Conduct User Testing",
            "description": "Organize and conduct user testing sessions for the new app feature.",
            "id": "Task-8",
            "status": "done",
            "points": 9,
            "priority": "high",
            'image': 'data:image/jpeg;base64,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'
          }
        ],
        "users": []
      }
      
  res.json({ roomId });
});

io.on('connection', (socket) => {
  socket.on("join server", (username) => {
    const user = {
      username,
      id: socket.id
    };
    users.push(user);
    io.emit("new user", user);
  });

  socket.on("join room", (roomName, cb) => {
    socket.join(roomName);
    if (!roomData[roomName]) {
      roomData[roomName] = { tasks: [], users: [] };
    }
    roomData[roomName].users.push(socket.id);
    io.to(roomName).emit("room users", roomData[roomName].users);
    cb(roomData[roomName]);
  });

  socket.on("create task", (roomName, task) => {
    if (roomData[roomName]) {
      roomData[roomName].tasks.push(task);
      io.to(roomName).emit("new task", task);
    }
  });

  socket.on("update task", (roomName, updatedTask) => {
    if (roomData[roomName]) {
      roomData[roomName].tasks = roomData[roomName].tasks.map(task => 
        task.id === updatedTask.id ? updatedTask : task
      );
      io.to(roomName).emit("updated task", updatedTask);
    }
  });

  socket.on("delete task", (roomName, taskId) => {
    if (roomData[roomName]) {
      roomData[roomName].tasks = roomData[roomName].tasks.filter(task => task.id !== taskId);
      io.to(roomName).emit("deleted task", taskId);
    }
  });

  socket.on("disconnect", () => {
    users = users.filter(user => user.id !== socket.id);
    for (const roomName in roomData) {
      roomData[roomName].users = roomData[roomName].users.filter(userId => userId !== socket.id);
      io.to(roomName).emit("room users", roomData[roomName].users);
    }
  });
});

app.get('/rooms/:roomId/tasks', (req, res) => {
  const { roomId } = req.params;
  if (roomData[roomId]) {
    res.json(roomData[roomId].tasks);
  } else {
    res.status(404).json({ message: "Room not found" });
  }
});

app.post('/rooms/:roomId/tasks', (req, res) => {
  const { roomId } = req.params;
  const task = req.body;
  if (!roomData[roomId]) {
    roomData[roomId] = { tasks: [], users: [] };
  }
  roomData[roomId].tasks.push(task);
  io.to(roomId).emit("new task", task);
  res.status(201).json(task);
});

app.put('/rooms/:roomId/tasks/:taskId', (req, res) => {
  const { roomId, taskId } = req.params;
  const updatedTask = req.body;
  if (roomData[roomId]) {
    roomData[roomId].tasks = roomData[roomId].tasks.map(task => 
      task.id === taskId ? updatedTask : task
    );
    io.to(roomId).emit("updated task", updatedTask);
    res.json(updatedTask);
  } else {
    res.status(404).json({ message: "Room not found" });
  }
});

app.delete('/rooms/:roomId/tasks/:taskId', (req, res) => {
  const { roomId, taskId } = req.params;
  if (roomData[roomId]) {
    roomData[roomId].tasks = roomData[roomId].tasks.filter(task => task.id !== taskId);
    io.to(roomId).emit("deleted task", taskId);
    res.status(204).end();
  } else {
    res.status(404).json({ message: "Room not found" });
  }
});

server.listen(1337, () => {
  console.log('Server listening on port 1337');
});