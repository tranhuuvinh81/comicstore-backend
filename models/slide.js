const db = require("../config/db");

class Slide {
  static async getAll() {
    try {
      const [slides] = await db.query("SELECT id, title, image_url FROM slides");
      return slides;
    } catch (error) {
      throw new Error("Failed to fetch slides: " + error.message);
    }
  }
}

module.exports = Slide;