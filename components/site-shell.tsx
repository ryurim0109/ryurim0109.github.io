import Link from "next/link";
import { ArrowUpRight, Github } from "lucide-react";
import { SeasonIcon } from "@/components/season-provider";
import { profile } from "@/lib/content";
import { PixelCharacter } from "@/components/pixel-character";

export function SiteHeader({ home = false }: { home?: boolean }) {
  const prefix = home ? "" : "/";
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link href="/" className="brand" aria-label="RYURIM 포트폴리오 홈">
          <span className="brand-character">
            <PixelCharacter />
          </span>
          <span className="brand-word">
            ryu<span>rim</span>
            <span className="brand-star">✦</span>
          </span>
          <span className="brand-divider" />
          <span className="brand-caption">developer&apos;s village</span>
        </Link>
        <nav aria-label="주 메뉴">
          <a href={`${prefix}#about`}>About</a>
          <a href={`${prefix}#projects`}>Projects</a>
          <a href={`${prefix}#blog`}>Blog</a>
          <a href={`${prefix}#contact`}>Contact</a>
        </nav>
        <a
          className="header-github"
          href={profile.github}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Github size={16} />
          <span>GitHub</span>
          <ArrowUpRight size={13} />
        </a>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <Link href="/" className="footer-brand">
          ryurim&apos;s little world
          <span>작은 코드들이 모여, 나다운 세계가 되도록.</span>
        </Link>
        <p>
          Made with care & a little pixel magic.
          <br />
          <span>© {new Date().getFullYear()} 김유림</span>
        </p>
        <a href="#top" className="back-top">
          마을 위로 ↑
        </a>
      </div>
      <div className="footer-snow">
        <SeasonIcon />
        <span>THANK YOU FOR STOPPING BY</span>
        <SeasonIcon />
      </div>
    </footer>
  );
}
