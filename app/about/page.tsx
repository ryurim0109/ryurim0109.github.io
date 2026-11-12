import type { Metadata } from "next";
import { AboutSection } from "@/components/sections";
import { SiteFooter, SiteHeader } from "@/components/site-shell";
export const metadata: Metadata = {
  title: "About",
  alternates: { canonical: "/about/" },
};
export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main className="page-main standalone-page" id="main">
        <AboutSection />
      </main>
      <SiteFooter />
    </>
  );
}
