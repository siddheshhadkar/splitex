const mongoose = require("mongoose");

(async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
  } catch (e) {
    console.log("error: " + e);
  }
})();

module.exports = mongoose;
