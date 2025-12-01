import express from "express"

//function to create new user
import { create, getUserById, getAllUsers, update, deleteUser} from "../controller/userController.js"

const route = express.Router();

route.post("/user",create);
route.get("/user/:id",getUserById);
route.get("/users", getAllUsers);
route.put("/update/user/:id", update);
route.delete("/delete/user/:id", deleteUser);


export default route;