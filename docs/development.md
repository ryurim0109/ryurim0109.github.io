# 개발 안내

## 로컬 실행

Node.js 22 이상에서 저장소 루트의 명령을 실행합니다.

```bash
npm ci
npm run dev
```

개발 서버는 `http://127.0.0.1:3000`입니다. 정적 빌드 결과는 아래 명령으로 확인합니다.

```bash
npm run build
npm start
```

정적 서버 주소는 `http://127.0.0.1:4173`입니다. 이전 소개 화면은 `/legacy/`에 있고, 기존 `/static/`, `/img/`, 아이콘·매니페스트 주소도 유지합니다.

## API와 DB

Docker Compose가 필요합니다. `.env`를 복사한 뒤 `POSTGRES_PASSWORD`와 `DATABASE_URL`의 비밀번호를 같은 값으로 수정합니다.

```bash
cp .env.example .env
docker compose up -d --wait
npm run db:seed
npm run dev:server
```

API는 `http://127.0.0.1:4000/api`에서 실행됩니다. DB는 로컬 인터페이스에만 노출합니다.

| 경로                 | 내용                                   |
| -------------------- | -------------------------------------- |
| `/health`            | PostgreSQL 연결 상태. 연결 실패 시 503 |
| `/profile`           | 소개, 기술, GitHub                     |
| `/projects`          | 프로젝트 목록                          |
| `/projects/ryu-deco` | ryu-deco 상세                          |
| `/posts`             | 블로그 글 목록                         |

`db:seed`는 [콘텐츠 파일](../content/portfolio.json)을 PostgreSQL의 `portfolio_documents` JSONB 테이블에 저장합니다. 트랜잭션과 upsert를 사용하므로 다시 실행할 수 있습니다. HTTP API는 읽기 전용입니다.

프로덕션 빌드와 API 통합 검사는 다음과 같습니다. 통합 검사를 실행하기 전에 DB를 시작하고 seed를 완료해야 합니다.

```bash
npm run build:server
npm run test:api
npm start --workspace server
```

환경변수는 서버에서 사용합니다. `DATABASE_URL`을 브라우저에 노출되는 `NEXT_PUBLIC_` 변수로 바꾸지 않습니다.

## 수정할 파일

| 파일                                   | 내용                                 |
| -------------------------------------- | ------------------------------------ |
| `content/portfolio.json`               | 소개, 프로젝트, 작업 범위, 블로그 글 |
| `components/sections.tsx`              | 홈의 콘텐츠 영역                     |
| `components/project-contributions.tsx` | AI 활용·직접 작업 구분               |
| `components/village.tsx`               | 장소 이동, 인사, 계절 효과 제어      |
| `components/season-provider.tsx`       | 현재 계절과 자정 갱신                |
| `lib/seasons.ts`                       | 계절 판정과 문구                     |
| `lib/pixel/season-palettes.ts`         | 계절별 색상                          |
| `lib/pixel/village.ts`                 | 마을 렌더링                          |
| `components/pixel-character.tsx`       | 캐릭터 픽셀 데이터                   |
| `app/globals.css`                      | 스타일과 반응형 배치                 |
| `server/src/`                          | NestJS API와 DB 연결                 |

콘텐츠 형식과 작성 기준은 [content/README.md](../content/README.md)를 참고합니다. 콘텐츠를 바꾼 뒤에는 사이트를 재빌드하고, API에서도 사용하려면 `npm run db:seed`를 실행합니다.

계절은 `Asia/Seoul` 기준으로 봄 3~5월, 여름 6~8월, 가을 9~11월, 겨울 12~2월입니다. 열린 페이지는 한국 자정에 계절을 다시 확인합니다. 숨겨진 탭에서는 갱신 타이머를 멈추고 복귀할 때 갱신합니다. 효과는 수동 정지와 `prefers-reduced-motion`을 지원합니다.

## 검사 명령

```bash
npm run format
npm run format:check
npm run typecheck
npm run build:server
npm run build
npm run test:e2e
```

브라우저 검사는 로컬의 Google Chrome을 사용합니다. CI에서는 Chromium을 설치합니다. 데스크톱·모바일의 장소 이동, 키보드 조작, 프로젝트 상세, 계절 전환과 모션 제어를 확인합니다. 스크린샷과 실패 기록은 `test-results/`에 저장됩니다.

실행한 검사와 확인하지 못한 항목은 [검증 기록](verification.md)에 남겨 두었습니다.

## GitHub Pages

포트폴리오는 루트 주소 `https://ryurim0109.github.io/`에 배포합니다. `basePath`에 `/ryu-deco`를 넣지 않습니다. `https://ryurim0109.github.io/ryu-deco/`는 별도 프로젝트의 서비스 주소입니다.

저장소 **Settings → Pages → Build and deployment → Source**를 **GitHub Actions**로 설정합니다. `.github/workflows/pages.yml`은 main 푸시 또는 수동 실행 시 포맷·타입·빌드·브라우저 검사와 PostgreSQL API 검사를 실행하고, 통과하면 `out/`을 배포합니다. 루트의 이전 `index.html`은 보존 자료이며 새 배포에는 사용하지 않습니다.

Pages는 정적 호스팅이므로 NestJS와 PostgreSQL은 별도 호스트에서 실행해야 합니다. Pages의 HTML은 콘텐츠 JSON으로 빌드합니다. API의 응답을 바꿔도 정적 페이지에 자동 반영되지는 않습니다.

현재 원격 배포 여부와 저장소 공개 상태는 [검증 기록](verification.md#원격-배포)을 확인하세요.
