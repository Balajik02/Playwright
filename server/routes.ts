import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";

// Login request validation schema
const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Login endpoint
  app.post("/api/login", async (req, res) => {
    try {
      // Validate request body
      const result = loginSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({
          message: "Username and password are required",
          errors: result.error.errors,
        });
      }

      const { username, password } = result.data;

      // For demo purposes, check against hardcoded credentials
      // In a real app, this would validate against the database
      if (username === "testuser" && password === "password123") {
        return res.status(200).json({
          token: "dummy_jwt_token", // In a real app, this would be a real JWT
        });
      }

      // Invalid credentials
      return res.status(401).json({
        message: "Invalid username or password",
      });
    } catch (error) {
      console.error("Login error:", error);
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}