import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
const server = createServer(app);


const corsOptions = {
  origin: '*',
  credentials: false, 
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions)); 
app.use(express.json({ limit: '128kb' }));  

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
  }
});

let users = [];
const roomData = {};

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
    tasks: [],
    users: []
  };

  res.json({ roomId });
});

// Socket.io events for room interactions
io.on('connection', (socket) => {
  socket.on("join server", (username) => {
    const user = { username, id: socket.id };
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

// Get tasks for a room
app.get('/rooms/:roomId/tasks', (req, res) => {
  const { roomId } = req.params;
  if (roomData[roomId]) {
    res.json(roomData[roomId].tasks);
  } else {
    res.status(404).json({ message: "Room not found" });
  }
});

// Post tasks to a room
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

// Put request to update task
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

// Delete task from a room
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

app.use((err, req, res, next) => {
  if (err.status === 413) {
    console.error('Payload Too Large:', err);
    res.status(413).json({ message: "Payload Too Large. Maximum allowed size is 128kb." });
  } else {
    next(err);
  }
});



server.listen(1337, () => {
  console.log('Server listening on port 1337');
});
