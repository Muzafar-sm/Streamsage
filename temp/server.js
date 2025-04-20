// server/server.js
//used tmb api in the end this is not working to all

const path = require("path");
const express = require("express");
const fetch = require("node-fetch");
const dotenv = require("dotenv");
const cors = require("cors");

require("dotenv").config();

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

// This line serves the static files from the 'public' folder
app.use(express.static(path.join(__dirname, '../public')));



// Route to fetch movie details
app.get("/api/movies/:title", async (req, res) => {
  const title = req.params.title;
  const apiKey = process.env.OMDB_API_KEY;

  try {
    const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&t=${encodeURIComponent(title)}`);
    const data = await response.json();

    if (data.Response === "False") {
      return res.status(404).json({ error: data.Error });
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


app.use(express.static(path.join(__dirname, "../public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});
