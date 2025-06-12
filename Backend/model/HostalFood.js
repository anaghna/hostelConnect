const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
  hostelId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hostel", // Assuming there is a Hostel model
    required: true,
  },
  day: {
    type: String,
    enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    required: true,
  },
  type: {
    type: String,
    enum: ["Veg", "Non-Veg"],
    required: true,
  },
  details: {
    Breakfast: { type: String, required: true },
    Lunch: { type: String, required: true },
    Dinner: { type: String, required: true },
  },
}, { timestamps: true });

module.exports = mongoose.model("Food", foodSchema);
