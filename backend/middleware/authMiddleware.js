// middleware/authMiddleware.js
import jwt from "jsonwebtoken";

// Basic auth: checks token, attaches req.user
export const requireAuth = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Authorization token missing or malformed." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "dev_secret_key_change_me"
    );

    // decoded: { id, username, email, userType }
    req.user = decoded;
    next();
  } catch (error) {
    console.error("JWT verification failed:", error.message);
    return res.status(401).json({ message: "Invalid or expired token." });
  }
};

// Organizer-only guard
export const requireOrganizer = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: "Not authenticated." });
  }

  if (req.user.userType !== "organizer") {
    return res
      .status(403)
      .json({ message: "Organizer permissions required." });
  }

  next();
};

// Volunteer or organizer (for applying, viewing protected stuff, etc.)
export const requireVolunteerOrOrganizer = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: "Not authenticated." });
  }

  if (req.user.userType !== "volunteer" && req.user.userType !== "organizer") {
    return res
      .status(403)
      .json({ message: "Volunteer or organizer permissions required." });
  }

  next();
};
