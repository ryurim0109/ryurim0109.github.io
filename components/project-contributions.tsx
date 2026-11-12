import { Code2, Sparkles } from "lucide-react";
import type { ProjectContributions } from "@/lib/content";

export function ProjectContributionsSection({
  contributions,
}: {
  contributions: ProjectContributions;
}) {
  const groups = [
    {
      id: "ai-assisted",
      label: "AI와 함께한 작업",
      caption: "AI ASSISTED",
      icon: <Sparkles size={19} aria-hidden="true" />,
      items: contributions.aiAssisted,
    },
    {
      id: "hands-on",
      label: "직접 설계·구현한 작업",
      caption: "HANDS ON",
      icon: <Code2 size={19} aria-hidden="true" />,
      items: contributions.handsOn,
    },
  ];

  return (
    <section
      className="contributions-section"
      aria-labelledby="contributions-title"
    >
      <span className="section-eyebrow">HOW I BUILT IT</span>
      <h2 id="contributions-title">어떻게 만들었나요?</h2>
      <p className="contributions-intro">
        AI를 활용한 부분과 직접 설계·구현한 부분을 나누어 제작 과정을
        기록합니다.
      </p>
      <div className="contributions-grid">
        {groups.map((group) => (
          <article
            key={group.id}
            className={`contribution-group ${group.id}`}
            aria-labelledby={`${group.id}-title`}
          >
            <header>
              <span className="contribution-icon">{group.icon}</span>
              <div>
                <span className="section-eyebrow">{group.caption}</span>
                <h3 id={`${group.id}-title`}>{group.label}</h3>
              </div>
            </header>
            {group.items.length > 0 ? (
              <ul>
                {group.items.map((item) => (
                  <li key={item.title}>
                    <h4>{item.title}</h4>
                    <p>{item.description}</p>
                    {item.evidenceUrl && (
                      <a
                        href={item.evidenceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        관련 코드·기록 보기 ↗
                        <span className="sr-only">: {item.title}</span>
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="contribution-pending">
                확인된 작업 내용을 정리 중입니다.
              </p>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
