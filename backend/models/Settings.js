import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema({
  backgroundColor: {
    type: String,
    default: "#ffffff",
  },
});

const Settings = mongoose.model("Settings", settingsSchema);
export default Settings;
