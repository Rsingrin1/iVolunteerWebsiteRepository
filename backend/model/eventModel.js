import mongoose from "mongoose";

const { Schema } = mongoose;

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  date: {
    type: Date, // https://www.mongodb.com/docs/manual/reference/method/Date/
    required: true,
  },
  location: {
    type: String,
  },
  notifMessage: {
    type: String,
  },
  notifTime: {
    type: Date,
  },
  tags: {
    type: [String],
  },

  // main image for the event (stored as a URL)
  imageUrl: {
    type: String,
  },

  // optional extra file URLs (flyers, docs, etc.)
  attachmentUrls: {
    type: [String],
    default: [],
  },

  // 🔹 NEW: which organizer created/owns this event
  organizer: {
    type: Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
});

export default mongoose.model("Events", eventSchema);
