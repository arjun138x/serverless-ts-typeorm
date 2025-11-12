import "reflect-metadata";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });

// Mock AWS environment for serverless-offline behavior
process.env.NODE_ENV = "test";
