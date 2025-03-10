import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { Router } from 'express';

// Login request validation schema
const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Create a dedicated router for API routes
  const apiRouter = Router();

  // Login endpoint
  apiRouter.post("/login", async (req, res) => {
    res.setHeader('Content-Type', 'application/json');

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
      const testUser = {
        username: "testuser",
        password: "password123"
      };

      // Check credentials against test user
      if (username === testUser.username && password === testUser.password) {
        return res.status(200).json({
          token: "dummy_jwt_token",
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

  // Mount the API router at /api
  app.use('/api', apiRouter);

  const httpServer = createServer(app);
  return httpServer;
}