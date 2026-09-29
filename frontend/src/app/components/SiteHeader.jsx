import Link from "next/link";
import { site } from "@/lib/site";

export default function SiteHeader() {
  return (
    <header className="site-header">
      <div className="wrap header-row">
        <Link href="/blog" className="brand">
          <span className="brand-name">{site.name}</span>
          <span className="brand-sub">for Caledon</span>
        </Link>
        <nav className="nav" aria-label="Main">
          <a href={site.url}>Home</a>
          <Link href="/blog">Blog</Link>
          <a href="#contact">Contact</a>
        </nav>
      </div>
    </header>
  );
}
