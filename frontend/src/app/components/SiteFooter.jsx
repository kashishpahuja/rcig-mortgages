import { site } from "@/lib/site";
import ContactCard from "./ContactCard";
import ContactForm from "./ContactForm";

export default function SiteFooter() {
  return (
    <footer id="contact" className="site-footer">
      <div className="wrap footer-grid">
        <ContactCard />
        <div>
          <h2>Send a message</h2>
          <ContactForm />
        </div>
      </div>
      <div className="wrap footer-base">
        <p>© {new Date().getFullYear()} {site.fullName}. {site.tagline}.</p>
      </div>
    </footer>
  );
}
