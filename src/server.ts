import express, { type Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db";
import projectRoutes from "./routes/projectRoutes";
import { corsConfig } from "./config/cors";
import morgan from "morgan";

dotenv.config();

connectDB();

const app: Express = express();
app.use(cors(corsConfig));

// Body parser
app.use(express.json());
// Logging
app.use(morgan("dev"));

// Middleware
app.use("/api/projects", projectRoutes);

export default app;
