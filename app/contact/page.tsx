import type { Metadata } from "next";
import { ContactSection } from "@/components/sections";
import { SiteFooter, SiteHeader } from "@/components/site-shell";
export const metadata: Metadata = {
  title: "Contact",
  alternates: { canonical: "/contact/" },
};
export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main className="page-main standalone-page" id="main">
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}
