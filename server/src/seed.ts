import content from "../../content/portfolio.json";
import { createPool } from "./database";

async function seed() {
  const pool = createPool();
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    await client.query(
      "CREATE TABLE IF NOT EXISTS portfolio_documents (key TEXT PRIMARY KEY, value JSONB NOT NULL, updated_at TIMESTAMPTZ NOT NULL DEFAULT now())",
    );
    for (const [key, value] of Object.entries(content)) {
      await client.query(
        "INSERT INTO portfolio_documents (key, value) VALUES ($1, $2::jsonb) ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = now()",
        [key, JSON.stringify(value)],
      );
    }
    await client.query("COMMIT");
    console.log("Seeded profile, projects and posts into PostgreSQL.");
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

seed().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
