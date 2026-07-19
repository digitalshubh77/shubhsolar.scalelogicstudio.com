import Link from "next/link";
import { ArrowRight, BadgeCheck, Clock, Mail, MapPin, Phone, Sun, Zap } from "lucide-react";
import { BUSINESS_ADDRESS, BUSINESS_EMAIL, BUSINESS_PHONE_DISPLAY, telLink } from "@/lib/contact";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Calculator", href: "/calculator" },
  { label: "FAQ", href: "/faq" },
  { label: "Get Free Quote", href: "/contact" },
];

const serviceLinks = [
  { label: "Residential Solar", href: "/services#residential" },
  { label: "Commercial Solar", href: "/services#commercial" },
  { label: "Industrial Solar", href: "/services#industrial" },
  { label: "Maintenance & AMC", href: "/services#amc" },
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__cta">
          <div className="site-footer__cta-icon" aria-hidden="true">
            <Zap size={22} />
          </div>
          <div className="site-footer__cta-copy">
            <span>Free rooftop assessment</span>
            <h2>Ready to turn your roof into monthly savings?</h2>
          </div>
          <Link href="/contact" className="site-footer__cta-button">
            Get Free Quote <ArrowRight size={16} />
          </Link>
        </div>

        <div className="site-footer__grid">
          <div className="site-footer__brand">
            <Link href="/" className="site-logo">
              <span className="site-logo__icon">
                <Sun size={22} />
              </span>
              <span className="site-logo__text">
                Shubh <span>Solar</span>
              </span>
            </Link>
            <p className="site-footer__brand-text">
              Powering Maharashtra with clean solar energy. 8+ years of trusted installations across Sangli and western Maharashtra.
            </p>
            <div className="site-footer__verified">
              <BadgeCheck size={16} />
              <span>MNRE empanelled · Local service team</span>
            </div>
            <div className="site-footer__socials">
              <a href="#" className="site-footer__social" aria-label="Facebook">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M13.5 22v-8h2.7l.4-3.1H13.5V9.1c0-.9.3-1.6 1.6-1.6H16.7V4.7c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.4H7.5V14h2.5v8h3.5z" />
                </svg>
              </a>
              <a href="#" className="site-footer__social" aria-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
              </a>
              <a href="#" className="site-footer__social" aria-label="YouTube">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31.5 31.5 0 0 0 0 12a31.5 31.5 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31.5 31.5 0 0 0 24 12a31.5 31.5 0 0 0-.5-5.8zM9.6 15.5V8.5l6.2 3.5-6.2 3.5z" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="site-footer__title">Quick Links</h4>
            <ul className="site-footer__list">
              {quickLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="site-footer__title">Services</h4>
            <ul className="site-footer__list">
              {serviceLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="site-footer__title">Contact</h4>
            <ul className="site-footer__contact-list">
              <li className="site-footer__contact-item">
                <span className="site-footer__contact-icon">
                  <MapPin size={16} />
                </span>
                <span>{BUSINESS_ADDRESS}</span>
              </li>
              <li className="site-footer__contact-item">
                <span className="site-footer__contact-icon">
                  <Phone size={16} />
                </span>
                <a href={telLink()}>{BUSINESS_PHONE_DISPLAY}</a>
              </li>
              <li className="site-footer__contact-item">
                <span className="site-footer__contact-icon">
                  <Mail size={16} />
                </span>
                <a href={`mailto:${BUSINESS_EMAIL}`}>{BUSINESS_EMAIL}</a>
              </li>
              <li className="site-footer__contact-item">
                <span className="site-footer__contact-icon">
                  <Clock size={16} />
                </span>
                <span>Mon–Sat · 9:30 AM – 7:00 PM</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="site-footer__bottom">
          <p className="site-footer__copy">© 2026 Shubh Solar · Demo website by Scale Logic Studio</p>
          <div className="site-footer__legal">
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
