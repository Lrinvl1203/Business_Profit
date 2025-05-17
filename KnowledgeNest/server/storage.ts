import { articles, type Article, type InsertArticle, users, type User, type InsertUser } from "@shared/schema";

// Update the interface with CRUD methods for articles
export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Article methods
  getArticles(): Promise<Article[]>;
  getArticleById(id: number): Promise<Article | undefined>;
  getArticlesByCategory(category: string): Promise<Article[]>;
  getFeaturedArticles(): Promise<Article[]>;
  createArticle(article: InsertArticle): Promise<Article>;
  updateArticle(id: number, article: Partial<InsertArticle>): Promise<Article | undefined>;
  deleteArticle(id: number): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private articlesMap: Map<number, Article>;
  private userCurrentId: number;
  private articleCurrentId: number;

  constructor() {
    this.users = new Map();
    this.articlesMap = new Map();
    this.userCurrentId = 1;
    this.articleCurrentId = 1;

    // Add some sample featured articles
    this.createArticle({
      title: "The Future of Generative AI in Content Creation",
      content: "Exploring how generative AI is transforming content creation across industries with unprecedented capabilities for producing text, images, and more.",
      category: "ai",
      imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
      featured: 1,
    });

    this.createArticle({
      title: "5 Strategies to Increase Business Profitability",
      content: "Practical approaches to optimize operations, enhance customer experience, and leverage data analytics for improved business profitability in competitive markets.",
      category: "business",
      imageUrl: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
      featured: 1,
    });

    this.createArticle({
      title: "Global Supply Chain Transformations in 2023",
      content: "How global businesses are adapting to new challenges in supply chain management with innovative solutions and technology integration.",
      category: "world",
      imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
      featured: 1,
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Article methods
  async getArticles(): Promise<Article[]> {
    return Array.from(this.articlesMap.values());
  }

  async getArticleById(id: number): Promise<Article | undefined> {
    return this.articlesMap.get(id);
  }

  async getArticlesByCategory(category: string): Promise<Article[]> {
    return Array.from(this.articlesMap.values()).filter(
      (article) => article.category === category
    );
  }

  async getFeaturedArticles(): Promise<Article[]> {
    return Array.from(this.articlesMap.values()).filter(
      (article) => article.featured === 1
    );
  }

  async createArticle(insertArticle: InsertArticle): Promise<Article> {
    const id = this.articleCurrentId++;
    const now = new Date();
    const article: Article = { 
      ...insertArticle, 
      id, 
      createdAt: now, 
      updatedAt: now 
    };
    this.articlesMap.set(id, article);
    return article;
  }

  async updateArticle(id: number, articleUpdate: Partial<InsertArticle>): Promise<Article | undefined> {
    const article = this.articlesMap.get(id);
    if (!article) return undefined;

    const updatedArticle: Article = { 
      ...article, 
      ...articleUpdate,
      updatedAt: new Date() 
    };
    this.articlesMap.set(id, updatedArticle);
    return updatedArticle;
  }

  async deleteArticle(id: number): Promise<boolean> {
    return this.articlesMap.delete(id);
  }
}

export const storage = new MemStorage();
