// zeuty-backend/src/index.ts
import express from "express";
import { createConnection } from "typeorm";
import taskRoutes from "./routes";
import { Task } from "./entities";
import "reflect-metadata"

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/tasks", taskRoutes);

createConnection({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "Rain122601*",
  database: "zeuty",
  synchronize: true,
  logging: false,
  entities: [Task],
})
  .then(() => {
    console.log("Connected to the database");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => console.error("Error connecting to the database:", error));
