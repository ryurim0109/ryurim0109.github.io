import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api");
  const allowedOrigins = (
    process.env.CORS_ORIGINS ??
    "http://127.0.0.1:3000,http://localhost:3000,https://ryurim0109.github.io"
  ).split(",");
  app.enableCors({ origin: allowedOrigins, methods: ["GET", "HEAD"] });
  app.enableShutdownHooks();
  await app.listen(Number(process.env.PORT ?? 4000), "127.0.0.1");
}

bootstrap().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
