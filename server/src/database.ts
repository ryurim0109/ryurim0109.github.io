import {
  Injectable,
  OnModuleDestroy,
  ServiceUnavailableException,
} from "@nestjs/common";
import { Pool } from "pg";

export function createPool() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString)
    throw new Error("DATABASE_URL is required. See .env.example.");
  return new Pool({
    connectionString,
    max: 5,
    connectionTimeoutMillis: 5000,
    idleTimeoutMillis: 10000,
    statement_timeout: 5000,
  });
}

@Injectable()
export class Database implements OnModuleDestroy {
  private readonly pool = createPool();

  constructor() {
    // Idle connection errors must not crash the HTTP process.
    this.pool.on("error", (error: Error) =>
      console.error("PostgreSQL connection error:", error.message),
    );
  }

  async document(key: string): Promise<unknown> {
    try {
      const result = await this.pool.query<{ value: unknown }>(
        "SELECT value FROM portfolio_documents WHERE key = $1",
        [key],
      );
      if (!result.rows[0]) throw new Error("Content has not been seeded");
      return result.rows[0].value;
    } catch {
      throw new ServiceUnavailableException(
        "Portfolio data is unavailable. Check database connectivity and run db:seed.",
      );
    }
  }

  async health() {
    try {
      await this.pool.query("SELECT 1");
      return { status: "ok", database: "connected" };
    } catch {
      throw new ServiceUnavailableException("Database unavailable");
    }
  }

  async onModuleDestroy() {
    await this.pool.end();
  }
}
