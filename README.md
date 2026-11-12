# ryurim's village

건물을 눌러 소개와 프로젝트, 기록을 둘러보는 포트폴리오입니다.

집은 About, 작업실은 Projects, 서점은 Blog, 우체통은 Contact로 이어집니다. 한국 시간에 맞춰 마을의 계절도 바뀝니다. 봄에는 꽃잎, 여름에는 나비, 가을에는 낙엽, 겨울에는 눈이 내려요.

## 실행

Node.js 22 이상에서 실행합니다.

```bash
npm ci
npm run dev
```

브라우저에서 `http://127.0.0.1:3000`을 열면 됩니다.

## 구성

- 화면: Next.js, TypeScript, Tailwind CSS
- 마을 그림: Canvas, SVG
- 콘텐츠 API: NestJS, PostgreSQL

소개와 프로젝트 내용은 [content/portfolio.json](content/portfolio.json)에서 수정합니다. 프로젝트마다 AI를 활용한 부분과 직접 작업한 부분을 나눠 적을 수 있습니다.

마을의 색상은 `lib/pixel/season-palettes.ts`, 건물과 나무는 `lib/pixel/village.ts`에 있습니다.

## 배포

포트폴리오 주소는 `https://ryurim0109.github.io/`입니다. GitHub Actions에서 정적 파일을 빌드해 Pages에 배포하도록 구성했습니다. API와 DB는 별도로 실행합니다.

[ryu-deco](https://github.com/ryurim0109/ryu-deco)는 포트폴리오에서 소개하는 별도 프로젝트입니다.

API 실행, 테스트, Pages 설정은 [개발 안내](docs/development.md)에 정리해 뒀습니다.
