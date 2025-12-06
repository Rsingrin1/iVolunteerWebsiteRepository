// routes/userRoute.js
import express from "express";

import {
  create,
  getUserById,
  getAllUsers,
  update,
  deleteUser,
  login,           // ⬅️ NEW
} from "../controller/userController.js";

const route = express.Router();

route.post("/user", create);
route.get("/user/:id", getUserById);
route.get("/users", getAllUsers);
route.put("/update/user/:id", update);
route.delete("/delete/user/:id", deleteUser);

// ⬇️ NEW login endpoint
route.post("/login", login);

export default route;