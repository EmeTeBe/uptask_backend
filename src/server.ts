import express, { type Express } from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import projectRoutes from "./routes/projectRoutes";

dotenv.config();

connectDB();

const app: Express = express();

// Body parser
app.use(express.json());

// Middleware
app.use("/api/projects", projectRoutes);

export default app;
