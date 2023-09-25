const mongoose = require("mongoose");

const slotSchema = new mongoose.Schema({
  dayOfWeek: String,
  date: Date,
  time: String,
  isBooked: { type: Boolean, default: false },
  bookedBy: {},
});

const deanSchema = new mongoose.Schema({
  universityId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  slots: {
    type: [slotSchema],
  },
  token: {
    type: String,
  },
  isAdmin: { type: Boolean, default: true },
});

module.exports = mongoose.model("Dean", deanSchema);
