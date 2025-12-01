import express from "express"

//function to create new user
import { create, getUserById, getAllUsers, update} from "../controller/userController.js"

const route = express.Router();

route.post("/user",create);
route.get("/user/:id",getUserById);
route.get("/users", getAllUsers);
route.put("/update/user/:id", update);


export default route;