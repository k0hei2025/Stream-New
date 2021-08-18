const mongoose = require("mongoose");
const Schedule = require("./schedule");

const userSchema = new mongoose.Schema(
  {
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    schedule: {
      isSchedule: {type:Boolean,default:false},
      scheduleTime: {type:Date},
    },
    
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);

module.exports = User;
