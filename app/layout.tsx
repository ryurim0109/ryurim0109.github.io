import type { Metadata } from "next";
import { SeasonProvider } from "@/components/season-provider";
import "@fontsource/press-start-2p/latin-400.css";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://ryurim0109.github.io"),
  title: {
    default: "김유림 | 풀스택 개발자의 작은 픽셀 마을",
    template: "%s | 김유림",
  },
  description:
    "풀스택 개발자 김유림의 포트폴리오. 한국의 사계절을 따라 변하는 픽셀 마을에서 소개, ryu-deco 프로젝트, 기록과 GitHub를 만나보세요.",
  openGraph: {
    title: "김유림의 작은 픽셀 마을",
    description:
      "화면부터 서버, 데이터까지 연결하는 풀스택 개발자 김유림의 포트폴리오.",
    url: "https://ryurim0109.github.io/",
    siteName: "RYURIM",
    locale: "ko_KR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body id="top">
        <a className="skip-link" href="#main">
          본문으로 건너뛰기
        </a>
        <SeasonProvider>{children}</SeasonProvider>
      </body>
    </html>
  );
}
