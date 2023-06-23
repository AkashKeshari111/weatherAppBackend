const { default: axios } = require("axios");
const express = require("express");
require("dotenv").config();
const cors = require("cors");
const connect = require("./config/db");
const app = express();

app.use(express.json());
app.use(cors());

app.get("/weather", async (req, res) => {
  const location = req.query.location;
  const apiKey = process.env.apiKey;
  try {
    const axiosRes = await axios.get(
      `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=yes`
    );
    const data = axiosRes.data;
    if (data.error) {
      // Location not found
      res.status(404).json({ error: "Location not found" });
    } else {
      res.status(200).json(data);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, async () => {
  try {
    await connect();
    console.log("db is connected successfully");
  } catch (error) {
    console.error(error);
  }
  console.log(`Server is running on port ${PORT}`);
});
