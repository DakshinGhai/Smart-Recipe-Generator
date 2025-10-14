// backend/routes/recognize.js

const express = require("express");
const multer = require("multer");
// backend/routes/recognize.js - NEW CODE
const { ClarifaiStub, grpc } = require("clarifai-nodejs-grpc");

const router = express.Router();

// --- Configure Clarifai Client ---
const stub = ClarifaiStub.grpc();
const metadata = new grpc.Metadata();
metadata.set("authorization", "Key " + process.env.CLARIFAI_PAT);

// --- Configure Multer for file uploads ---
// Store the image in memory before sending it to Clarifai
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB file size limit
  },
});

// --- Define the API Endpoint ---
router.post("/", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No image file provided." });
  }

  stub.PostModelOutputs(
    {
      // --- ADD THIS OBJECT ---
      user_app_id: {
        user_id: "clarifai",
        app_id: "main",
      },
      // ---------------------
      // backend/routes/recognize.js - NEW CODE
      model_id: "food-item-recognition",
      version_id: "1d5fd481e0cf4826aa72ec3ff049e044",

      inputs: [
        { data: { image: { base64: req.file.buffer.toString("base64") } } },
      ],
    },
    metadata,
    (err, response) => {
      if (err) {
        console.error("Clarifai Error:", err);
        return res.status(500).json({ error: "Failed to process image." });
      }

      if (response.status.code !== 10000) {
        console.error("Clarifai Non-OK status:", response.status);
        return res
          .status(500)
          .json({ error: "Received an error from Clarifai API." });
      }

      // Extract the names of the recognized ingredients ("concepts")
      const concepts = response.outputs[0].data.concepts;
      const ingredients = concepts.map((concept) => concept.name);

      // Send the list of ingredients back to the frontend
      res.json({ ingredients });
    }
  );
});

module.exports = router;
