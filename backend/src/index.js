const express = require("express");
const cors = require("cors");
const sequelize = require("./db");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const authRoutes = require("./routes/auth");
const authMiddleware = require("./middleware/auth");
const taskRoutes = require("./routes/taskRoutes");

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Task Dashboard API",
      version: "1.0.0",
      description: "API documentation for the Task Dashboard backend",
    },
    servers: [
      {
        url: "http://localhost:4000",
      },
    ],
  },
  apis: ["./src/swagger.js"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Include all auth routes (register, login, user management)
app.use("/", authRoutes);

// Protect all /tasks routes
app.use("/tasks", authMiddleware, taskRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Task Dashboard API is running." });
});

sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Task API listening at http://localhost:${port}`);
  });
});
