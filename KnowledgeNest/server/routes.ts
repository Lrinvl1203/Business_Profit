import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertArticleSchema } from "@shared/schema";
import { z } from "zod";
import express from "express";

export async function registerRoutes(app: Express): Promise<Server> {
  // API Routes
  const apiRouter = express.Router();
  app.use("/api", apiRouter);

  // Get all articles
  apiRouter.get("/articles", async (req: Request, res: Response) => {
    try {
      const articles = await storage.getArticles();
      res.json(articles);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch articles" });
    }
  });

  // Get featured articles
  apiRouter.get("/articles/featured", async (req: Request, res: Response) => {
    try {
      const articles = await storage.getFeaturedArticles();
      res.json(articles);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch featured articles" });
    }
  });

  // Get articles by category
  apiRouter.get("/articles/category/:category", async (req: Request, res: Response) => {
    try {
      const { category } = req.params;
      const articles = await storage.getArticlesByCategory(category);
      res.json(articles);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch articles by category" });
    }
  });

  // Get article by ID
  apiRouter.get("/articles/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid article ID" });
      }

      const article = await storage.getArticleById(id);
      if (!article) {
        return res.status(404).json({ message: "Article not found" });
      }

      res.json(article);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch article" });
    }
  });

  // Create a new article
  apiRouter.post("/articles", async (req: Request, res: Response) => {
    try {
      const validatedData = insertArticleSchema.parse(req.body);
      const article = await storage.createArticle(validatedData);
      res.status(201).json(article);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid article data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create article" });
    }
  });

  // Update an article
  apiRouter.put("/articles/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid article ID" });
      }

      const validatedData = insertArticleSchema.partial().parse(req.body);
      const article = await storage.updateArticle(id, validatedData);
      
      if (!article) {
        return res.status(404).json({ message: "Article not found" });
      }

      res.json(article);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid article data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update article" });
    }
  });

  // Delete an article
  apiRouter.delete("/articles/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid article ID" });
      }

      const success = await storage.deleteArticle(id);
      if (!success) {
        return res.status(404).json({ message: "Article not found" });
      }

      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete article" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
