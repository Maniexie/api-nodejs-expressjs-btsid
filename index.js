const express = require("express");
const app = express();
const dotenv = require("dotenv");
const routes = require("./routes");
const connectDB = require("./config/db");
const bodyParser = require("body-parser");
const cors = require("cors");
dotenv.config();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

//connect Database
connectDB();

// Konfigurasi Body Parser
app.use(bodyParser.json());

// konfigurasi postman
app.use(express.json());

//middleware
app.use(cors());

// routes setup
routes.use(cors());
app.use("/api/v1/", routes);

//port
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  console.log(process.env.MONGO_URI);
});
