const mongoose = require("mongoose");
const scheduleSchema = new mongoose.Schema(
  {
    date: { type: String, required: true },
    time: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true },
);

const Schedule = mongoose.model("Schedule", scheduleSchema);

module.exports = Schedule;
