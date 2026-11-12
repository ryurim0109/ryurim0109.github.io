import data from "@/content/portfolio.json";

export interface BlogPost {
  title: string;
  date: string;
  tags: string[];
  url: string;
}

export interface ContributionItem {
  title: string;
  description: string;
  evidenceUrl?: string;
}

export interface ProjectContributions {
  aiAssisted: ContributionItem[];
  handsOn: ContributionItem[];
}

export const profile = data.profile;
export const projects = data.projects;
export const posts: BlogPost[] = data.posts;
