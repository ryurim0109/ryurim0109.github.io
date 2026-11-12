import {
  Controller,
  Get,
  Inject,
  Module,
  NotFoundException,
  Param,
} from "@nestjs/common";
import { Database } from "./database";
import type content from "../../content/portfolio.json";

@Controller()
class PortfolioController {
  constructor(@Inject(Database) private readonly database: Database) {}

  @Get("health")
  health() {
    return this.database.health();
  }

  @Get("profile")
  profile() {
    return this.database.document("profile");
  }

  @Get("projects")
  projects() {
    return this.database.document("projects");
  }

  @Get("projects/:slug")
  async project(@Param("slug") slug: string) {
    const projects = (await this.database.document(
      "projects",
    )) as typeof content.projects;
    const project = projects.find((item) => item.slug === slug);
    if (!project) throw new NotFoundException("Project not found");
    return project;
  }

  @Get("posts")
  posts() {
    return this.database.document("posts");
  }
}

@Module({ controllers: [PortfolioController], providers: [Database] })
export class AppModule {}
