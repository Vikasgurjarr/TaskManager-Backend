require("dotenv").config();
const express = require("express");
const serverless = require("serverless-http");
const cors = require("cors");

const connectdb = require("../../utils/db.js");
const routers = require("../../routes/auth.js");
const projectRoutes = require("../../routes/project.js");
const errorMiddleware = require("../../middlewares/error.js");
const adminRoute = require("../../routes/admin.js");
const taskRoutes = require("../../routes/task.js");
const projectController = require('../../controllers/project.js');


const router = express.Router();

const app = express();

// CORS configuration
const corsOptions = {
    origin: "http://localhost:3000", // You might need to update this depending on your Netlify frontend domain
    methods: "GET,POST,PUT,PATCH,DELETE,HEAD",
    credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json());

// Mount the routers
app.use("/api/auth", routers);
app.use("/api/admin", adminRoute);
app.use("/api/projects", projectRoutes);
app.use("/api", taskRoutes);

app.use(errorMiddleware);

// Connect to the database
connectdb()
    .then(() => {
        console.log("Database connected successfully");
    })
    .catch((error) => {
        console.error("Failed to connect to the database:", error);
    });

    router.get('/', (req, res) => {
      res.send('App is running..');
      });

      router.get('/projects', projectController.getProjects);

      app.use('/.netlify/functions/server', router);
// Use the express app as a serverless function
module.exports.handler = serverless(app);
