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
import bcrypt from "bcrypt";

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
});


//UNTESTED login verification - add frontend post request
app.post("/Login", async (req, res) => {
    const {username, password} = req.body; //do i need to say hash instead of password or will this work?
    const user = await UserModel.findOne({username: username});
    if(!user){
        return res.status(401).json({message: "User not found"});
    }

    const isValid = await bcrypt.compare(password, user.hash);
    if (!isValid) {
        res.send("wrong password")
        return;
    }
    res.status(200).json({ message: 'Login successful' });
    console.log('Login successful');
});