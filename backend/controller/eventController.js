// backend/controller/eventController.js

import Events from "../model/eventModel.js";
import User from "../model/userModel.js";

// CREATE EVENT
// POST /api/event
export const createEvent = async (req, res) => {
  try {
    const {
      name,
      description,
      date,
      location,
      notifMessage,
      notifTime,
      tags,
      imageUrl,
      attachmentUrls,
      organizerId, // optional from body, but we prefer req.user.id
    } = req.body;

    // Basic required fields
    if (!name || !date) {
      return res
        .status(400)
        .json({ message: "Event name and date are required." });
    }

    // Prefer organizer from JWT (req.user), fall back to body if needed
    const organizerIdFromToken = req.user?.id;
    const effectiveOrganizerId = organizerIdFromToken || organizerId;

    if (!effectiveOrganizerId) {
      return res
        .status(400)
        .json({ message: "Organizer ID is required to create an event." });
    }

    // Make sure the organizer user exists
    const organizer = await User.findById(effectiveOrganizerId);
    if (!organizer) {
      return res.status(404).json({ message: "Organizer not found." });
    }

    const newEvent = new Events({
      name,
      description,
      date,
      location,
      notifMessage,
      notifTime,
      tags,
      imageUrl,
      attachmentUrls,
      organizer: organizer._id, // 🔹 link event → organizer
    });

    const savedEvent = await newEvent.save();

    // Push this event ID into the organizer's events array
    organizer.events = organizer.events || [];
    organizer.events.push(savedEvent._id);
    await organizer.save();

    res.status(200).json(savedEvent);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// GET ALL EVENTS
// GET /api/events
export const getAllEvents = async (req, res) => {
  try {
    const events = await Events.find().populate(
      "organizer",
      "username email userType"
    );
    if (!events || events.length === 0) {
      return res.status(404).json({ message: "No events found." });
    }
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// GET EVENT BY ID
// GET /api/event/:id
export const getEventById = async (req, res) => {
  try {
    const id = req.params.id;
    const eventExist = await Events.findById(id).populate(
      "organizer",
      "username email userType"
    );
    if (!eventExist) {
      return res.status(400).json({ message: "Event not found." });
    }
    res.status(200).json(eventExist);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// GET EVENTS BY ORGANIZER
// GET /api/events/organizer/:organizerId
export const getEventsByOrganizer = async (req, res) => {
  try {
    const { organizerId } = req.params;

    const organizer = await User.findById(organizerId).populate("events");
    if (!organizer) {
      return res.status(404).json({ message: "Organizer not found." });
    }

    const events = organizer.events || [];

    // Return 200 with an array (possibly empty)
    return res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};


// UPDATE EVENT
// PUT /api/update/event/:id
export const updateEvent = async (req, res) => {
  try {
    const id = req.params.id;
    const eventExist = await Events.findById(id);
    if (!eventExist) {
      return res.status(404).json({ message: "Event not found." });
    }

    await Events.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({ message: "Event updated successfully." });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// DELETE EVENT
// DELETE /api/delete/event/:id
export const deleteEvent = async (req, res) => {
  try {
    const id = req.params.id;
    const eventExist = await Events.findById(id);
    if (!eventExist) {
      return res.status(404).json({ message: "Event not found." });
    }

    // Remove this event ID from any users' events arrays
    await User.updateMany({ events: id }, { $pull: { events: id } });

    await Events.findByIdAndDelete(id);
    res.status(200).json({ message: "Event deleted successfully." });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};
