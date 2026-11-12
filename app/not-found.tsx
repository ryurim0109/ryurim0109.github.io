import Link from "next/link";
import { PixelCharacter } from "@/components/pixel-character";
export default function NotFound() {
  return (
    <main id="main" className="not-found">
      <PixelCharacter />
      <span className="section-eyebrow">404 / A LITTLE DETOUR</span>
      <h1>아직 길이 나지 않은 곳이에요.</h1>
      <p>마을로 돌아가 다른 이야기를 만나 보세요.</p>
      <Link href="/" className="button primary">
        마을로 돌아가기 ↗
      </Link>
    </main>
  );
}
