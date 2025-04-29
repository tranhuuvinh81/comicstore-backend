const Slide = require("../models/slide");

exports.getAllSlides = async (req, res) => {
  try {
    const slides = await Slide.getAll();
    res.json(slides);
  } catch (error) {
    console.error("Error fetching slides:", error);
    res.status(500).json({ message: "Failed to fetch slides", error: error.message });
  }
};