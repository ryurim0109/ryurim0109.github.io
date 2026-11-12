import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Code2,
  Github,
  House,
  Mail,
  Sprout,
} from "lucide-react";
import { posts, profile, projects } from "@/lib/content";
import { PixelCharacter } from "@/components/pixel-character";
import { ProjectPreview } from "@/components/project-preview";

export function SectionHeading({
  number,
  title,
  subtitle,
  icon,
}: {
  number: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="section-heading">
      <div className="section-heading-main">
        <span className="section-icon" aria-hidden="true">
          {icon}
        </span>
        <div>
          <span className="section-eyebrow">{number} / AROUND THE VILLAGE</span>
          <h2 tabIndex={-1}>
            {title}
            <span>{subtitle}</span>
          </h2>
        </div>
      </div>
    </div>
  );
}

export function AboutSection() {
  return (
    <section id="about" className="content-section about-section">
      <SectionHeading
        number="01"
        title="About me"
        subtitle="유림의 집"
        icon={<House size={21} />}
      />
      <div className="about-grid">
        <div className="about-letter">
          <span className="letter-tab">
            <Sprout size={14} /> A LITTLE ABOUT ME
          </span>
          <h3>
            화면부터 데이터까지,
            <br />
            하나의 경험을 만듭니다.
          </h3>
          <p>{profile.about}</p>
          <div className="interest-list">
            {profile.interests.map((interest) => (
              <span key={interest}># {interest}</span>
            ))}
          </div>
        </div>
        <div className="stack-note">
          <div className="stack-note-title">
            <Code2 size={17} />
            <h3>My toolkit</h3>
            <span>만들며 사용하는 도구들</span>
          </div>
          <p>ryu-deco에서 사용한 기술</p>
          <div className="tag-list">
            {profile.stack.map((skill) => (
              <span key={skill}>{skill}</span>
            ))}
          </div>
          <div className="stack-note-separator" />
          <p>이 포트폴리오의 풀스택 구성</p>
          <div className="tag-list green">
            {profile.portfolioStack.map((skill) => (
              <span key={skill}>{skill}</span>
            ))}
          </div>
          <div className="toolkit-caption">
            <span aria-hidden="true">✦</span> 인터페이스와 API, 데이터를 함께
            연결합니다.
          </div>
        </div>
      </div>
    </section>
  );
}

export function ProjectsSection() {
  const project = projects[0];
  return (
    <section id="projects" className="content-section">
      <SectionHeading
        number="02"
        title="Selected project"
        subtitle="작은 작업실"
        icon={<Code2 size={21} />}
      />
      <div className="project-card">
        <Link
          className="project-art-link"
          href="/projects/ryu-deco/"
          aria-label="ryu-deco 프로젝트 상세 보기"
        >
          <ProjectPreview />
          <span className="art-caption">
            A LITTLE WORLD, MADE BY YOU.<span>✦</span>
          </span>
        </Link>
        <div className="project-copy">
          <span className="project-category">
            <span className="status-dot" />
            {project.category}
          </span>
          <Link href="/projects/ryu-deco/" className="project-title">
            <h3>{project.name}</h3>
            <ArrowUpRight size={24} />
          </Link>
          <p className="project-tagline">{project.tagline}</p>
          <p className="project-description">{project.description}</p>
          <div className="tag-list small">
            {project.stack.map((skill) => (
              <span key={skill}>{skill}</span>
            ))}
          </div>
          <div className="project-actions">
            <a
              className="button primary"
              href={project.service}
              target="_blank"
              rel="noopener noreferrer"
            >
              서비스 둘러보기
              <ArrowUpRight size={15} />
            </a>
            <a
              className="text-link"
              href={project.source}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github size={15} />
              소스 코드
              <ArrowUpRight size={13} />
            </a>
          </div>
          <Link className="project-detail-link" href="/projects/ryu-deco/">
            어떤 고민을 담았을까요?
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}

export function BlogSection() {
  return (
    <section id="blog" className="content-section">
      <SectionHeading
        number="03"
        title="Notes & learnings"
        subtitle="기록의 서점"
        icon={<BookOpen size={21} />}
      />
      {posts.length > 0 ? (
        <div className="blog-list">
          {posts.map((post) => (
            <a className="blog-post" key={post.url} href={post.url}>
              <time dateTime={post.date}>
                {new Intl.DateTimeFormat("ko-KR", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  timeZone: "UTC",
                }).format(new Date(post.date))}
              </time>
              <h3>{post.title}</h3>
              <span className="blog-tags">{post.tags.join(" · ")}</span>
              <ArrowUpRight size={18} />
            </a>
          ))}
        </div>
      ) : (
        <div className="blog-empty">
          <div className="pixel-books" aria-hidden="true">
            <i />
            <i />
            <i />
            <i />
            <span />
          </div>
          <div>
            <span className="section-eyebrow">A NEW CHAPTER</span>
            <h3>다음 이야기를 꽂아 둘 자리.</h3>
            <p>
              직접 만들며 배운 것들을 이 서점에 채워 나가려고 합니다.
              <br className="desktop-break" /> 새로운 기록이 생기면 여기서
              만나요.
            </p>
          </div>
          <span className="bookshop-stamp" aria-hidden="true">
            한 페이지씩,
            <br />
            천천히.
          </span>
        </div>
      )}
    </section>
  );
}

export function ContactSection() {
  return (
    <section id="contact" className="content-section contact-section">
      <SectionHeading
        number="04"
        title="Say hello"
        subtitle="마을 우체통"
        icon={<Mail size={21} />}
      />
      <div className="contact-card">
        <div className="contact-character">
          <PixelCharacter />
          <span aria-hidden="true">♡</span>
        </div>
        <div className="contact-copy">
          <span className="section-eyebrow">LET&apos;S CONNECT</span>
          <h3>함께 만들 이야기가 있나요?</h3>
          <p>제가 만들고 있는 것들이 궁금하다면, GitHub에서 만나요.</p>
        </div>
        <a
          className="button primary"
          href={profile.github}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Github size={17} />
          GitHub 방문하기
          <ArrowUpRight size={15} />
        </a>
      </div>
    </section>
  );
}

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-copy">
        <div className="hero-eyebrow">
          <span className="status-dot" /> FULL-STACK DEVELOPER{" "}
          <span className="eyebrow-slash">/</span> KIM YURIM
        </div>
        <h1 id="hero-title">
          코드로 짓는,
          <br />
          나의 작은 <span>세계.</span>
          <span className="heading-sparkle" aria-hidden="true">
            ✦
          </span>
        </h1>
        <p>
          안녕하세요, {profile.role} <strong>{profile.name}</strong>입니다.
          <br />
          {profile.intro}
        </p>
        <div className="hero-actions">
          <a href="#projects" className="button primary">
            만든 것 둘러보기
            <ArrowDown size={15} />
          </a>
          <a
            href={profile.github}
            className="text-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github size={17} />
            GitHub
            <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
      <div className="welcome-note">
        <span className="note-pin" aria-hidden="true" />
        <span className="section-eyebrow">WELCOME TO MY VILLAGE</span>
        <div className="welcome-note-art">
          <PixelCharacter />
          <span aria-hidden="true">
            ✦<br />
            &nbsp; ✧
          </span>
        </div>
        <p>
          작은 호기심이 모여
          <br />
          하나의 세계가 되는 곳.
        </p>
        <span className="note-sign">편하게 쉬어 가세요 :)</span>
      </div>
    </section>
  );
}
