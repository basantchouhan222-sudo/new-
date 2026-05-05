const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

require("./mongoo");

const Router = require("./Router");

app.use("/api", Router);

app.listen(4000, () => {
  console.log("Server running on http://localhost:4000");
});