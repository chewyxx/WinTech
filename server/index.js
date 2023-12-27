require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const {MONGO_URL} = process.env;
const PORT = 4000
const cookieParser = require("cookie-parser");
const authRoute = require("./Routes/AuthRoute")

import { Itinerary } from './Models/ItineraryModel.js';
import ItineraryRoute from './Routes/ItineraryRoute.js'

mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB is  connected successfully"))
  .catch((err) => console.error(err));

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());

app.use(express.json());

app.use("/", authRoute);
app.use("/itineraries", ItineraryRoute);