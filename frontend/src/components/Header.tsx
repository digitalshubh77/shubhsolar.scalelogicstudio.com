"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, Phone, Sun, X } from "lucide-react";
import { BUSINESS_PHONE_DISPLAY, telLink } from "@/lib/contact";

const navLinks = [
  { label: "Services", href: "/services" },
  { label: "Calculator", href: "/calculator" },
  { label: "Why Us", href: "/#why-us" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Projects", href: "/projects" },
  { label: "FAQ", href: "/faq" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
      <div className="site-header__inner">
        <Link href="/" className="site-logo">
          <span className="site-logo__icon">
            <Sun size={22} />
          </span>
          <span className="site-logo__text">
            Shubh <span>Solar</span>
          </span>
        </Link>

        <nav className="site-nav" aria-label="Primary">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="site-nav__link">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="site-header__actions">
          <a href={telLink()} className="site-header__phone">
            <span className="site-header__phone-icon">
              <Phone size={16} />
            </span>
            {BUSINESS_PHONE_DISPLAY}
          </a>
          <Link href="/contact" className="site-header__cta">
            Get Free Quote
          </Link>
        </div>

        <button
          type="button"
          className="site-header__menu-btn"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <div className={`site-header__mobile${open ? " is-open" : ""}`}>
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="site-header__mobile-link"
            onClick={() => setOpen(false)}
          >
            {link.label}
          </Link>
        ))}
        <div className="site-header__mobile-actions">
          <a href={telLink()} className="site-header__phone" style={{ justifyContent: "center" }}>
            <span className="site-header__phone-icon">
              <Phone size={16} />
            </span>
            {BUSINESS_PHONE_DISPLAY}
          </a>
          <Link href="/contact" className="site-header__cta" onClick={() => setOpen(false)} style={{ width: "100%" }}>
            Get Free Quote
          </Link>
        </div>
      </div>
    </header>
  );
}
