/** @format */

const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001;

// Define routes
const metaMaskRoute = require("./routes/metaMask");
const binanceRoute = require("./routes/binance");
const trustRoute = require("./routes/trust");

// Middleware
app.use(express.json());
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE",
  );

  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type",
  );
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  // res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader(
    "Content-Security-Policy",
    "script-src 'self' https://cdnjs.cloudflare.com",
  );
  next();
});

app.use(
  cors({
    // origin: "http://localhost:3001",
    credentials: true,
  }),
);

process.on("uncaughtException", err => {
  console.log("Error 💥", err.name, err.message, err.stack);
});

//----------------------------------------- END OF MIDDLEWARE---------------------------------------------------

// Routes
app.get("/", (req, res) => {
  res.send({ message: "wallet connector Api" });
});
app.get("/getVersion", (req, res) => {
  res.json({ message: "Api is up", version: "1.0.0" });
});
app.use("/api/metaMask", metaMaskRoute);
app.use("/api/binance", binanceRoute);
app.use("/api/trust", trustRoute);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
