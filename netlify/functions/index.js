const express = require('express');
const serverless = require('serverless-http');
const app = express();
require("dotenv").config();
const cors = require("cors");
const routers = require("../routes/auth.js");
const projectRoutes = require("../routes/project.js");
const errorMiddleware = require("../middlewares/error.js");
const adminRoute = require("../routes/admin.js");
const taskRoutes = require("../routes/task.js");

// CORS configuration
const corsOptions = {
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,PATCH,DELETE,HEAD",
    credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json());

// Mount the routers
app.use("/api/auth", routers);
app.use("/api/admin", adminRoute);
app.use("/api/projects", projectRoutes);
app.use('/api', taskRoutes);

// Error middleware
app.use(errorMiddleware);

// Default route to verify the server is running
app.get('/', (req, res) => {
    res.send('Server is running');
});

// Export the app as a serverless function
module.exports.handler = serverless(app);
