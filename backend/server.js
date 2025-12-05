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

import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { connectDB } from "./config/db.js";
import userRoute from "./routes/userRoute.js";
import UserModel from './model/userModel.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Server is ready");
});

// API routes
app.use("/api", userRoute);

// Start server after DB connection
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});


app.post('/VolunteerSignUp', (req, res) => {
    UserModel.create(req.body)
    .then(Users => res.json(Users))
    .catch(err => res.json(err))
})

//add this post for login
//https://youtu.be/ZVyIIyZJutM?t=1534