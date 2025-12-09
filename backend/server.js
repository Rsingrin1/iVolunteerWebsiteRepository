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
import cookieParser from "cookie-parser"; // ✔ parse cookies
import { connectDB } from "./config/db.js";

import userRoute from "./routes/userRoute.js";
import eventRoute from "./routes/eventRoute.js";
import tagRoute from "./routes/tagRoute.js";

dotenv.config();

const app = express();

// ✔ Required for cookie authentication between frontend & backend
app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
    credentials: true,
  })
);

console.log("JWT SECRET =", process.env.JWT_SECRET);











// ✔ JSON & cookies
app.use(express.json());
app.use(cookieParser());

// ✔ Health check
app.get("/", (req, res) => {
  res.send("Server is ready");
});

// ✔ API routes
app.use("/api", userRoute);
app.use("/api", eventRoute);
app.use("/api", tagRoute);

// ✔ Connect DB
connectDB();

// ✔ Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
