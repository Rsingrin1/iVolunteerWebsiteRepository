/*import express from "express";

const app = express();
app.get("/",(req,res)=>{
res.send("Server is ready");
});
app.listen(5000,()=>{
console.log("Server started at http://localhost:5000");
});
import dotenv from "dotenv";
dotenv.config();

import { connectDB } from "./config/db.js";
connectDB();

import userRoute from "./routes/userRoute.js";
//API Routes
app.use("/api",userRoute); 
app.get("/api/user",(req,res)=>{
    res.send(userRoute);
});

//display message on server side local host
app.get('/message', (req, res) => {
    res.json({message: 'Hello'})
})


import cors from "cors";
// Middleware
app.use(cors());
app.use(express.json());*/

// backend/server.js
// backend/server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { connectDB } from "./config/db.js";
import userRoute from "./routes/userRoute.js";
import eventRoute from "./routes/eventRoute.js";  // ⬅️ make sure this path is correct

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Simple health check
app.get("/", (req, res) => {
  res.send("Server is ready");
});

// API routes
app.use("/api", userRoute);   // /api/user, /api/login, ...
app.use("/api", eventRoute);  // /api/events, /api/event/:id, /api/events/organizer/:organizerId, ...

// Connect DB and start server
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
}
);

//add this post for login
//https://youtu.be/ZVyIIyZJutM?t=1534