import express from "express";
const app = express();
app.get("/products",(req,res)=>{});
app.listen(5000,()=>{
console.log("Server started at http://localhost:5000");
});
import dotenv from "dotenv";
dotenv.config();

import { connectDB } from "./config/db.js";
connectDB();