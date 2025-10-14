// backend/index.js

const express = require("express");
const cors = require("cors"); // Make sure cors is imported
const helmet = require("helmet");
const bodyParser = require("body-parser");
const recipesRouter = require("./routes/recipes");
const recognizeRouter = require("./routes/recognize");

const app = express();

// --- START: CORS CONFIGURATION ---

// 1. Define the list of allowed origins
const allowedOrigins = [
  "http://localhost:3000", // For local development
  "https://smart-recipe-generator-42r8rb3ma-dakshinghais-projects.vercel.app", // IMPORTANT: Add your Vercel URL here later
];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg =
        "The CORS policy for this site does not allow access from the specified Origin.";
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
};

app.use(helmet());
app.use(cors(corsOptions));
app.use(bodyParser.json());

app.use("/api/recipes", recipesRouter);
app.use("/api/recognize", recognizeRouter);

app.get("/api/health", (req, res) => res.json({ status: "ok" }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend listening on ${PORT}`));
