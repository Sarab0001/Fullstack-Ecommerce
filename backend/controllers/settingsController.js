import Settings from "../models/Settings.js";

// Get background color
const getSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create({});
    }
    res.json({ backgroundColor: settings.backgroundColor });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Update background color
const updateSettings = async (req, res) => {
  const { backgroundColor } = req.body;
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create({ backgroundColor });
    } else {
      settings.backgroundColor = backgroundColor;
      await settings.save();
    }
    res.json({ message: "Background color updated", backgroundColor });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

export { getSettings, updateSettings };
