require("dotenv").config();
const express = require("express");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/user", require("./routes/api/user.routes"));
app.use("/api/users/all", require("./routes/api/users.routes"));
app.use("/api/transaction", require("./routes/api/transaction.routes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
