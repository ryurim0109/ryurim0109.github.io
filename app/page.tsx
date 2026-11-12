import { SeasonBadge } from "@/components/season-provider";
import { SiteFooter, SiteHeader } from "@/components/site-shell";
import {
  AboutSection,
  BlogSection,
  ContactSection,
  Hero,
  ProjectsSection,
} from "@/components/sections";
import { Village } from "@/components/village";

export default function Home() {
  return (
    <>
      <SiteHeader home />
      <main id="main" className="page-main">
        <div className="page-kicker">
          <span>
            PORTFOLIO <span className="kicker-dot">·</span> 김유림의 작은 마을
          </span>
          <SeasonBadge />
        </div>
        <Hero />
        <Village />
        <div className="village-legend">
          <span aria-hidden="true">✧</span>
          <p>각자의 이야기를 가진 네 곳. 마음이 가는 곳부터 방문해 보세요.</p>
          <span className="legend-line" />
        </div>
        <AboutSection />
        <ProjectsSection />
        <BlogSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}
