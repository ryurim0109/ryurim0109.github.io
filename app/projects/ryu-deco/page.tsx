import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Check, Github } from "lucide-react";
import { SiteFooter, SiteHeader } from "@/components/site-shell";
import { ProjectPreview } from "@/components/project-preview";
import { ProjectContributionsSection } from "@/components/project-contributions";
import { projects } from "@/lib/content";

const project = projects[0];
export const metadata: Metadata = {
  title: "ryu-deco — 픽셀 월드 에디터",
  description: project.description,
  alternates: { canonical: "/projects/ryu-deco/" },
};

export default function ProjectPage() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="page-main detail-page">
        <Link href="/#projects" className="text-link">
          <ArrowLeft size={16} />
          작은 작업실로 돌아가기
        </Link>
        <header className="project-detail-header">
          <span className="section-eyebrow">
            PROJECT / 01 · PIXEL WORLD EDITOR
          </span>
          <h1>
            ryu-deco<span>✦</span>
          </h1>
          <p className="detail-tagline">{project.tagline}</p>
          <p>{project.description}</p>
          <div className="project-actions">
            <a
              className="button primary"
              href={project.service}
              target="_blank"
              rel="noopener noreferrer"
            >
              서비스 체험하기
              <ArrowUpRight size={16} />
            </a>
            <a
              className="button secondary"
              href={project.source}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github size={16} />
              소스 코드
              <ArrowUpRight size={14} />
            </a>
          </div>
        </header>
        <ProjectPreview large />
        <section className="detail-overview">
          <div>
            <span className="section-eyebrow">WHAT YOU CAN MAKE</span>
            <h2>
              작은 픽셀에서,
              <br />
              나만의 GitHub 월드로.
            </h2>
            <p>
              소개와 기술 스택을 배치하고, 캐릭터를 직접 그려 움직임을 더합니다.
              완성한 장면은 README에 사용할 수 있는 이미지로 가져갑니다.
            </p>
          </div>
          <div>
            <h3>구현한 기능</h3>
            <ul className="feature-list">
              {project.features.map((feature) => (
                <li key={feature}>
                  <Check size={15} />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </section>
        <section className="detail-stack">
          <h2>사용한 기술</h2>
          <div className="tag-list">
            {project.stack.map((skill) => (
              <span key={skill}>{skill}</span>
            ))}
          </div>
          <p>
            Next.js App Router와 strict TypeScript를 사용하고, 정적 내보내기로
            GitHub Pages에 배포할 수 있도록 구성했습니다.
          </p>
        </section>
        <ProjectContributionsSection contributions={project.contributions} />
        <section className="decisions-section">
          <span className="section-eyebrow">BEHIND THE PIXELS</span>
          <h2>만들면서 풀어낸 문제들</h2>
          {project.decisions.map((decision) => (
            <article key={decision.number} className="decision">
              <span className="decision-number">{decision.number}</span>
              <div>
                <h3>{decision.title}</h3>
                <dl>
                  <dt>해결할 문제</dt>
                  <dd>{decision.problem}</dd>
                  <dt>구현 방식</dt>
                  <dd>{decision.implementation}</dd>
                  <dt>기술 선택의 이유</dt>
                  <dd>{decision.reason}</dd>
                </dl>
              </div>
            </article>
          ))}
        </section>
        <div className="detail-end">
          <p>이제, 나만의 작은 세계를 만들어 보세요.</p>
          <a
            href={project.service}
            className="button primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            ryu-deco 열기
            <ArrowUpRight size={16} />
          </a>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
