import express from "express"

//function to create new user
import { create, getUserById } from "../controller/userController.js"

const route = express.Router();

route.post("/user",create);
route.get("/user/:id",getUserById);

export default route;