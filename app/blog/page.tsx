import type { Metadata } from "next";
import { BlogSection } from "@/components/sections";
import { SiteFooter, SiteHeader } from "@/components/site-shell";
export const metadata: Metadata = {
  title: "Blog",
  alternates: { canonical: "/blog/" },
};
export default function BlogPage() {
  return (
    <>
      <SiteHeader />
      <main className="page-main standalone-page" id="main">
        <BlogSection />
      </main>
      <SiteFooter />
    </>
  );
}
