# RyuRim's little village

풀스택 개발자 김유림의 사계절 픽셀 마을 포트폴리오입니다. Next.js App Router · strict TypeScript · Tailwind CSS로 화면을 만들고, NestJS · PostgreSQL로 읽기 전용 콘텐츠 API를 구현했습니다. 마을·캐릭터는 직접 작성한 픽셀 데이터와 Canvas/SVG로 그렸습니다.

## 화면 실행

Node.js 22 이상이 필요합니다.

```bash
npm ci
npm run dev
```

`http://127.0.0.1:3000`에서 집(About), 작업실(Projects), 서점(Blog), 우체통(Contact)을 탐색합니다. 상단 메뉴와 키보드로도 같은 콘텐츠에 접근할 수 있습니다. ryu-deco 상세는 `/projects/ryu-deco/`입니다.

정적 배포 결과를 확인하려면:

```bash
npm run build
npm start
```

`http://127.0.0.1:4173`에서 확인합니다. 서버가 없어도 소개·프로젝트·블로그 목록은 HTML로 제공됩니다. 계절 효과와 캐릭터 애니메이션은 수동 정지, `prefers-reduced-motion`, 탭 숨김 상태를 지원합니다.

## NestJS + PostgreSQL 실행

로컬에 Docker Compose가 설치되어 있어야 합니다. DB는 로컬 인터페이스에만 노출합니다.

```bash
cp .env.example .env
# .env의 POSTGRES_PASSWORD와 DATABASE_URL 비밀번호를 같은 값으로 수정
docker compose up -d --wait
npm run db:seed
npm run dev:server
```

API 주소는 `http://127.0.0.1:4000/api`입니다.

| 경로                 | 응답                                       |
| -------------------- | ------------------------------------------ |
| `/health`            | 실제 PostgreSQL 연결 확인. 연결 실패는 503 |
| `/profile`           | 소개, 역할, 기술, GitHub                   |
| `/projects`          | 프로젝트 목록                              |
| `/projects/ryu-deco` | 상세 기능과 기술 선택                      |
| `/posts`             | 실제 블로그 글 목록. 현재는 빈 배열        |

API는 PostgreSQL의 `portfolio_documents` JSONB 테이블을 읽습니다. `db:seed`는 공통 콘텐츠 파일을 트랜잭션으로 upsert하므로 재실행할 수 있습니다. DB 쓰기 HTTP 라우트와 연락 폼은 없습니다. 환경변수는 서버에서만 사용하며 브라우저 번들에 DB 주소를 넣지 않습니다.

API 프로덕션 빌드와 통합 테스트:

```bash
npm run build:server
npm run test:api
npm start --workspace server
```

통합 테스트에는 실행 중인 DB와 seed가 필요합니다. GitHub Actions는 PostgreSQL 17 서비스 컨테이너로 DB 초기화, 연결, 콘텐츠 일치, 프로젝트 상세, 없는 프로젝트의 404, 읽기 전용 라우트를 검사합니다.

**GitHub Pages는 정적 호스팅이므로 NestJS·PostgreSQL을 실행할 수 없습니다.** Pages에서는 공통 JSON 원본으로 HTML을 빌드해 독립적으로 표시합니다. API는 별도 Node.js 호스트와 PostgreSQL에 배포할 수 있게 분리했습니다. API를 수정해도 Pages에 자동 반영되는 구조는 아니며, 콘텐츠 파일을 수정하고 재빌드해야 합니다.

## 콘텐츠와 코드 수정

| 파일                             | 역할                                                      |
| -------------------------------- | --------------------------------------------------------- |
| `content/portfolio.json`         | 이름, 풀스택 소개, 관심 분야, 기술, 프로젝트, 실제 글 URL |
| `content/README.md`              | 콘텐츠 형식과 확인 근거                                   |
| `components/sections.tsx`        | HTML 소개·프로젝트·블로그·연락처                          |
| `components/village.tsx`         | 장소 링크, 인사, 계절 효과 제어                           |
| `lib/pixel/village.ts`           | 오리지널 Canvas 픽셀 마을 렌더러                          |
| `components/pixel-character.tsx` | 오리지널 픽셀 캐릭터 데이터                               |
| `app/globals.css`                | 파스텔 색상, 반응형 배치, 모션 설정                       |
| `server/src/`                    | NestJS API, PostgreSQL 연결, 초기화                       |

실제 글·이메일은 저장소에서 확인되지 않아 추가하지 않았습니다. `posts`에 실제 제목·날짜·태그·기존 URL을 추가하면 목록에 표시됩니다. 확인하지 않은 경력·회사·성과·숙련도는 쓰지 않았습니다.

기존 CRA 결과물은 삭제하지 않았으며 정적 파일의 `/static/`, `/img/`, 아이콘·매니페스트 주소를 보존했습니다. 이전 소개 화면은 `/legacy/`에서 볼 수 있습니다. 원래 앱의 확인된 라우트는 `/`뿐이었고, 실제 블로그 글이나 글 경로는 발견되지 않았습니다.

## 검증

```bash
npm run format
npm run format:check
npm run typecheck
npm run build:server
npm run build
npm run test:e2e
```

로컬 브라우저 테스트는 설치된 Google Chrome을 사용합니다. CI는 Chromium을 설치합니다. 데스크톱과 모바일에서 장소·메뉴 이동, 프로젝트 직접 방문·새로고침, 키보드 Enter, 계절 효과 제어, reduced motion, 탭 숨김/복귀, 가로 넘침, Canvas 렌더링, 기존 파일 및 404를 검사합니다. 스크린샷은 무시되는 `test-results/`에 저장합니다.

작업 환경에서 실제 실행한 검증과 배포 확인 한계는 `docs/verification.md`를 참고하세요.

## GitHub Pages

대상은 **`https://ryurim0109.github.io/` 루트**입니다. `basePath`에 `/ryu-deco`를 설정하지 않습니다. ryu-deco 서비스는 **별도 저장소**의 `https://ryurim0109.github.io/ryu-deco/`이며 포트폴리오에서는 절대 URL로 연결합니다.

`.github/workflows/pages.yml`은 main 푸시 또는 수동 실행 시 포맷·타입·서버 빌드·정적 빌드·브라우저·실제 PostgreSQL API 테스트를 통과한 후 `out/`을 배포합니다. 저장소 **Settings → Pages → Build and deployment → Source**를 **GitHub Actions**로 설정해야 합니다. 기존의 branch 배포 상태에서 변경하기 전에는 Pages 소스를 확인하세요. 루트의 이전 `index.html`은 보존 자료이며 새 배포는 `out/`을 사용합니다.

현재 원격 저장소 공개 여부와 Pages 설정은 인증 가능한 GitHub 접근이 없어 확인하지 못했습니다. 공개 전환·설정 변경·푸시·원격 배포는 실행하지 않았습니다. 비공개 저장소의 공개 전환에는 소유자의 명시적 승인이 필요합니다.

## 한국의 사계절

`Asia/Seoul` 기준으로 봄(3~5월), 여름(6~8월), 가을(9~11월), 겨울(12~2월)을 적용합니다. 방문자의 현지 시간대나 정적 사이트의 빌드 날짜에 영향을 받지 않습니다. 한국 자정에 열린 페이지의 계절을 갱신하며, 숨겨진 탭에서는 갱신 타이머를 멈추고 복귀할 때 다시 확인합니다.

봄에는 꽃나무와 꽃잎, 여름에는 녹음과 나비, 가을에는 단풍과 낙엽, 겨울에는 눈 덮인 나무·지붕과 눈사람이 표시됩니다. 계절 이름, 아이콘, 마을 배경과 프로젝트 일러스트가 같은 계절을 공유합니다. `lib/seasons.ts`는 월과 문구, `lib/pixel/season-palettes.ts`는 색상, `lib/pixel/village.ts`는 계절별 오브젝트를 관리합니다.
