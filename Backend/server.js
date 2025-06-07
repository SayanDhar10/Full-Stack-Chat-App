const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const cors = require('cors');
const { Server } = require('socket.io');
const Message = require('./models/Message');

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/chat-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected"));

// Routes
app.get('/', (req, res) => res.send("API Running"));
app.use('/api/messages', require('./routes/messages'));

// Socket.IO
const io = new Server(server, {
  cors: { origin: '*' }
});

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('sendMessage', async (data) => {
    const message = new Message({ username: data.username, text: data.text });
    await message.save();
    io.emit('receiveMessage', message);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

server.listen(5000, () => console.log('Server running on port 5000'));
