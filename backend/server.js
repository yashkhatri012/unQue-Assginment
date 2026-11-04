import express from "express";
import dotenv from "dotenv";
import webhookRoutes from "./routes/webhook.routes.js";
import connectDB from "./config/db.js";   
import http from "http";
import { Server } from "socket.io";
import { initializeSocket } from "./config/socket.js";
dotenv.config();



const app = express();
await connectDB();



app.use(express.json());
app.use("/api", webhookRoutes);


app.get("/", (req, res) => res.send("Server running"));




const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

//For connection socket.io, creating a server ourselves explicityly
const server = http.createServer(app);
const io = initializeSocket(server);


io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});