// backend/index.js

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const recognizeRouter = require("./routes/recognize");

const app = express();

// --- START: CORRECT CORS CONFIGURATION ---

// 1. Define the list of allowed origins (NO trailing slash)
const allowedOrigins = [
  "http://localhost:3000", // For local development
  "https://smart-recipe-generator-bice.vercel.app/", // Your live Vercel URL
];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like Postman) or from our list
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(
        new Error(
          "The CORS policy for this site does not allow access from your origin."
        )
      );
    }
  },
};

// --- END: CORS CONFIGURATION ---

app.use(helmet());
app.use(cors(corsOptions)); // Use the new cors options
app.use(bodyParser.json());

// Only the recognize router is needed now
app.use("/api/recognize", recognizeRouter);

app.get("/api/health", (req, res) => res.json({ status: "ok" }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend listening on ${PORT}`));
