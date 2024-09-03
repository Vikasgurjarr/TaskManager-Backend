// netlify/functions/server.js

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const serverless = require("serverless-http");

// Import routes and utilities
const router = require("../../routes/auth.js");
const connectdb = require("../../utils/db.js");
const projectRoutes = require("../../routes/project.js");
const errorMiddleware = require("../../middlewares/error.js");
const adminRoute = require("../../routes/admin.js");
const taskRoutes = require("../../routes/task.js");

const app = express();

// CORS configuration
const corsOptions = {
    origin: "http://localhost:3000", // Update as needed for production
    methods: "GET,POST,PUT,PATCH,DELETE,HEAD",
    credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json());

// Mount the routers
app.use("/api/auth", router);
app.use("/api/admin", adminRoute);
app.use("/api", projectRoutes);
app.use('/api', taskRoutes);

app.get('/api/hello', (req, res) => {
    res.json({ message: 'Hello from Netlify!' });
  });



// Error handling middleware
app.use(errorMiddleware);

// Export the app as a serverless function
module.exports.handler = serverless(app);
