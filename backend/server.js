require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

const whitelist = ["http://localhost:3000"];
const corsOptions = {
  origin: function (origin, callback) {
    console.log("origin:", origin);
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      console.log("origin acceptable");
      callback(null, true);
    } else {
      console.log("origin rejected");
    }
  },
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/user", require("./routes/api/user.routes"));
app.use("/api/transaction", require("./routes/api/transaction.routes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
