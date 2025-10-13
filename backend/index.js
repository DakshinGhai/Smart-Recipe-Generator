const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const recipesRouter = require("./routes/recipes");

const app = express();
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());

app.use("/api/recipes", recipesRouter);

app.get("/api/health", (req, res) => res.json({ status: "ok" }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend listening on ${PORT}`));
