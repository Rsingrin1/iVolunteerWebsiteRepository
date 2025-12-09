// routes/userRoute.js
import express from "express";

import {
  create,
  getUserById,
  getAllUsers,
  update,
  deleteUser,
  login,
} from "../controller/userController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const route = express.Router();

route.post("/user", create);
route.get("/user", requireAuth, getUserById);
route.get("/users", getAllUsers);
route.put("/user", requireAuth, update);
//route.delete("/user", requireAuth, deleteUser);

// ⬇️ NEW login endpoint
route.post("/login", login);

export default route;