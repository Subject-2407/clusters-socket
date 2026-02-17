import 'dotenv/config';
import { createServer } from 'http';
import { Server } from 'socket.io';

const PORT: number = parseInt(process.env.PORT || '3005');

const httpServer = createServer();

const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {
    console.log(`Client connected: ${socket.id}`);

    socket.on('join-cluster', (cluster) => {
        socket.join(cluster);
    });

    socket.on('message', (msg) => {
        io.to(msg.cluster).emit('message', msg);
    });

    socket.on("disconnect", () => {
        console.log(`Client disconnected: ${socket.id}`);
    });
});

httpServer.listen(PORT, () => {
  console.log(`Clusters socket server running on http://localhost:${PORT}`);
});