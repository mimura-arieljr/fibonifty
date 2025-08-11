import 'dotenv/config';
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
const app = express();
app.use(express.json());
const PORT = Number(process.env.PORT) || 3001;
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:5173';
app.use(cors({ origin: CORS_ORIGIN }));
const server = http.createServer(app);
const io = new Server(server, {
    cors: { origin: CORS_ORIGIN },
});
const rooms = new Map();
// helpers
function ensureRoom(roomId) {
    if (!rooms.has(roomId))
        rooms.set(roomId, { users: {}, revealed: false });
    return rooms.get(roomId);
}
function roomSnapshot(roomId) {
    const state = rooms.get(roomId);
    if (!state)
        return { users: {}, revealed: false };
    return { users: state.users, revealed: state.revealed };
}
// --- Socket events ---
io.on('connection', (socket) => {
    console.log('a user connected:', socket.id);
    // client emits: joinRoom -> { roomId, userId }
    socket.on('joinRoom', ({ roomId }) => {
        if (!roomId)
            return;
        socket.join(roomId);
        ensureRoom(roomId);
        const state = rooms.get(roomId);
        // map socket to room/user for cleanup
        socket.roomId = roomId;
        // broadcast updated roster
        io.to(roomId).emit('room:update', roomSnapshot(roomId));
    });
    // client emits: submitSelection -> { roomId, userId, selection }
    socket.on('submitSelection', ({ roomId, userId, selection }) => {
        if (!roomId || !userId)
            return;
        const state = ensureRoom(roomId);
        state.users[userId] = selection;
        io.to(roomId).emit('room:update', roomSnapshot(roomId));
    });
    // client emits: reveal -> { roomId }
    socket.on('reveal', ({ roomId }) => {
        const state = ensureRoom(roomId);
        state.revealed = true;
        io.to(roomId).emit('room:update', roomSnapshot(roomId));
    });
    // client emits: reset -> { roomId }
    socket.on('reset', ({ roomId }) => {
        const state = ensureRoom(roomId);
        Object.keys(state.users).forEach((k) => delete (state.users[k]));
        state.revealed = false;
        io.to(roomId).emit('room:update', roomSnapshot(roomId));
    });
    // cleanup on disconnect
    socket.on('disconnect', () => {
        console.log('user disconnected:', socket.id);
        const roomId = socket.roomId;
        const userId = socket.userId;
        if (!roomId || !userId)
            return;
        const state = rooms.get(roomId);
        if (!state)
            return;
        delete state.users[userId];
        // if room empty, delete it:
        if (Object.keys(state.users).length === 0) {
            rooms.delete(roomId);
        }
        else {
            io.to(roomId).emit('room:update', roomSnapshot(roomId));
        }
    });
});
server.listen(PORT, () => {
    console.log(`Fibonifty server listening on http://localhost:${PORT}`);
});
//# sourceMappingURL=index.js.map