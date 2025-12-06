// backend/routes/eventRoute.js
import express from "express";
import {
  createEvent,
  getAllEvents,
  getEventById,
  getEventsByOrganizer,
  updateEvent,
  deleteEvent,
} from "../controller/eventController.js";

import {
  requireAuth,
  requireOrganizer,
  // requireVolunteerOrOrganizer, // for later
} from "../middleware/authMiddleware.js";

const route = express.Router();

// Public
route.get("/events", getAllEvents);
route.get("/event/:id", getEventById);

// Organizer-only: list *their* events
route.get(
  "/events/organizer/:organizerId",
  requireAuth,
  requireOrganizer,
  getEventsByOrganizer
);

// Organizer-only: create / update / delete
route.post("/event", requireAuth, requireOrganizer, createEvent);
route.put("/update/event/:id", requireAuth, requireOrganizer, updateEvent);
route.delete("/delete/event/:id", requireAuth, requireOrganizer, deleteEvent);

export default route;
