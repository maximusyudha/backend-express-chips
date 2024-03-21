const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const config = require("./config/config");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const cors = require("cors");
const mongoDB = require("./config/mongoDB");

const corsOption = {
  origin: "*",
};

const app = express();
app.use(cors(corsOption));
app.use(bodyParser.json());

// Connect to MongoDB
mongoDB(config)
  .then(() => {
    // Routes
    app.use("/api/users", userRoutes);
    app.use("/api/admins", adminRoutes);
    app.use("/api/products", productRoutes);
    app.use("/api/cart", cartRoutes);

    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
