// require("dotenv").config();

// const express = require("express");
// const app = express();
// const cors = require("cors");

// app.use(cors());
// app.use(express.json());

// require("./mongoo");

// const Router = require("./Router");
// app.use("/api", Router);
// app.get("/",(req,res)=>{
//   res.send({
//     activestatus: true,
//     error : false,
//   })
// })

// const PORT = process.env.PORT || 4000;

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
// module.exports = app;
require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

require("./mongoo");

const Router = require("./Router");
app.use("/api", Router);

app.get("/", (req, res) => {
  res.send({ activestatus: true, error: false });
});

module.exports = app;