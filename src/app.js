const express = require("express");
const path = require("path");

const app = express();

// =======================
// MIDDLEWARES
// =======================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// =======================
// STATIC FILES (UPLOADS)
// =======================
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// =======================
// ROUTES
// =======================
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/content", require("./routes/content.routes"));
app.use("/api/approval", require("./routes/approval.routes"));
app.use("/api/content", require("./routes/broadcast.routes"));

// =======================
// HEALTH CHECK
// =======================
app.get("/", (req, res) => {
  res.send("Content Broadcasting API Running 🚀");
});

// =======================
// GLOBAL ERROR HANDLER
// =======================
app.use((err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    message: err.message || "Internal Server Error",
  });
});

module.exports = app;