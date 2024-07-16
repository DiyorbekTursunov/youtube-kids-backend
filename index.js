const express = require('express');
const dotenv = require('dotenv');
const { connect_db } = require('./config/db.config');
const videoRoute = require("./routes/video.route");
const appRoute = require("./routes/app.route");
const authRoute = require("./routes/auth.route");

const cors = require("cors");

// Enable all CORS requests

dotenv.config();
// Configures dotenv to work in your application

const app = express();

app.use(cors());
app.use(express.json())
app.use(appRoute)

app.use("/video", videoRoute)
app.use("/auth", authRoute)




const server = app.listen(process.env.PORT || 3000, () => {
  connect_db()
  console.log(`Server running at http://localhost:${process.env.PORT || 3000}`);
});

// Handle server errors
server.on("error", (error) => {
  console.error("Server error:", error.message);
});