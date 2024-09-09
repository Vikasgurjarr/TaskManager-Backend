require("dotenv").config();
const express = require("express");
const serverless = require("serverless-http");
const cors = require("cors");
const connectdb = require("../../utils/db.js");
const errorMiddleware = require("../../middlewares/error.js");
const routes = require("../../routes/route-index.js");

const app = express();
const router = express.Router();

// CORS configuration
const corsOptions = {
  origin: "https://main--taskyou.netlify.app/", // Update this based on your frontend domain
  methods: "GET,POST,PUT,PATCH,DELETE,HEAD",
  credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json());

// Mount the routers using the router instance
router.use("/api/auth", routes.authRoute);
router.use("/api/admin", routes.adminRoute);
router.use("/api/projects", routes.projectRoute);
router.use("/api", routes.taskRoute);

// Error middleware
router.use(errorMiddleware);

// Connect to the database
connectdb()
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((error) => {
    console.error("Failed to connect to the database:", error);
  });

// Mount the router under the base path for Netlify
app.use("/.netlify/functions/server", router);

// Use the express app as a serverless function
module.exports.handler = serverless(app);
