"use client";

import Link from "next/link";
import { telLink, whatsappLink } from "@/lib/contact";
import {
  BadgeCheck,
  Building2,
  CheckCircle2,
  Factory,
  Home as HomeIcon,
  ShieldCheck,
  Wrench,
  Zap,
} from "lucide-react";
import { MotionCard, MotionItem, MotionSection } from "@/components/Motion";
import HomeCalcTeaser from "@/components/HomeCalcTeaser";
import HomeSubsidyBanner from "@/components/HomeSubsidyBanner";

const testimonials = [
  {
    quote: "My bill came down from ₹4,800 to under ₹500. The team handled the subsidy paperwork completely.",
    name: "Rajesh Deshmukh",
    role: "Homeowner, Sangli",
    savings: "₹4,300/mo saved",
    initial: "RD",
  },
  {
    quote: "Shubh Solar finished the 50 kW plant without disturbing hospital operations. Savings started month one.",
    name: "Dr. Sunita Wankhade",
    role: "Hospital Director, Miraj",
    savings: "₹55,000/mo saved",
    initial: "SW",
  },
  {
    quote: "Three years later, the service is still excellent. One call and their engineer is at our factory.",
    name: "Prakash Kalmegh",
    role: "Factory Owner, Kupwad MIDC",
    savings: "60% cost cut",
    initial: "PK",
  },
];

const services = [
  {
    icon: HomeIcon,
    name: "Residential Solar",
    tag: "Most Popular · 1–10 kW",
    desc: "Homes & apartments with net metering and subsidy filing.",
    href: "/services",
  },
  {
    icon: Building2,
    name: "Commercial Solar",
    tag: "10–100 kW for shops & offices",
    desc: "Cut daytime load costs for retail, clinics and offices.",
    href: "/services",
  },
  {
    icon: Factory,
    name: "Industrial Solar",
    tag: "100 kW+ for factories & MIDC",
    desc: "High-capacity plants with remote monitoring.",
    href: "/services",
  },
  {
    icon: Wrench,
    name: "Maintenance & AMC",
    tag: "Cleaning, checks & monitoring",
    desc: "Annual health checks and panel cleaning by local team.",
    href: "/services",
  },
];

export default function HomeAnimatedSections() {
  return (
    <>
      <MotionSection className="home-section home-section--alt">
        <div className="home-container">
          <MotionItem>
            <div className="home-section-head">
              <p className="home-eyebrow">The Problem</p>
              <h2 className="home-h2">Your Electricity Bill Will Only Keep Rising</h2>
              <p className="home-lead">
                Every year tariffs go up — and your money goes with them. Here&apos;s what most families and businesses in Sangli face today.
              </p>
            </div>
          </MotionItem>

          <div className="home-cards-3">
            <MotionCard className="home-card home-card--problem">
              <div className="home-card__icon"><Zap size={18} /></div>
              <h3 className="home-card__title">High Electricity Bills</h3>
              <p className="home-card__text">₹3,000–₹15,000 going out every month — money that could stay in your pocket for 25 years.</p>
              <p className="home-card__stat">Avg. rise: 6–8% / year</p>
            </MotionCard>
            <MotionCard className="home-card home-card--problem">
              <div className="home-card__icon"><ShieldCheck size={18} /></div>
              <h3 className="home-card__title">Frequent Power Cuts</h3>
              <p className="home-card__text">Load-shedding disrupts family comfort and stops business operations — costing productivity and sales.</p>
              <p className="home-card__stat">Especially in summer months</p>
            </MotionCard>
            <MotionCard className="home-card home-card--problem">
              <div className="home-card__icon"><BadgeCheck size={18} /></div>
              <h3 className="home-card__title">Rising Tariffs Every Year</h3>
              <p className="home-card__text">A ₹5,000 bill today can easily cross ₹8,000 within a few years as rates keep climbing.</p>
              <p className="home-card__stat">No relief without solar</p>
            </MotionCard>
          </div>

          <MotionItem>
            <div className="home-solve">
              <div className="home-solve__badge">The Solution</div>
              <h3>Solar Fixes All Three, Permanently</h3>
              <p>
                One rooftop system generates your own power, protects you from tariff hikes, and pays for itself in 3–5 years. After that, your electricity is practically free for 20+ more years.
              </p>
              <div className="home-check-row">
                <div className="home-check"><CheckCircle2 size={16} /> Reduce your bill by up to 90% from month one</div>
                <div className="home-check"><CheckCircle2 size={16} /> Net metering credits for extra units you export</div>
                <div className="home-check"><CheckCircle2 size={16} /> Central subsidy (up to ₹78,000) filed by us</div>
              </div>
              <div className="home-btn-row">
                <Link href="/calculator" className="home-btn home-btn--primary">See My Savings →</Link>
              </div>
            </div>
          </MotionItem>
        </div>
      </MotionSection>

      <HomeSubsidyBanner />
      <HomeCalcTeaser />

      <MotionSection className="home-section">
        <div className="home-container">
          <MotionItem>
            <div className="home-section-head">
              <p className="home-eyebrow">Services</p>
              <h2 className="home-h2">Complete Solar Solutions Under One Roof</h2>
              <p className="home-lead">From your first site survey to net metering and lifetime service — we handle everything.</p>
            </div>
          </MotionItem>

          <div className="home-services">
            {services.map((item) => (
              <MotionCard key={item.name} className="home-service home-service--card">
                <div className="home-service__top">
                  <div className="home-card__icon"><item.icon size={18} /></div>
                  <span className="home-service__badge">{item.tag.split("·")[0].trim()}</span>
                </div>
                <h3 className="home-service__name">{item.name}</h3>
                <p className="home-service__tag">{item.tag}</p>
                <p className="home-service__desc">{item.desc}</p>
                <Link href={item.href} className="home-link home-service__link">
                  Read More →
                </Link>
              </MotionCard>
            ))}
          </div>
        </div>
      </MotionSection>

      <MotionSection className="home-section home-section--alt">
        <div className="home-container">
          <MotionItem>
            <div className="home-section-head home-section-head--center">
              <p className="home-eyebrow">Testimonials</p>
              <h2 className="home-h2">What Customers Say</h2>
              <p className="home-lead">Real savings from real rooftops across Sangli and western Maharashtra.</p>
            </div>
          </MotionItem>
          <div className="home-grid-3">
            {testimonials.map((t) => (
              <MotionCard key={t.name} className="home-quote home-quote--rich">
                <div className="home-quote__top">
                  <div className="home-quote__avatar">{t.initial}</div>
                  <div>
                    <p className="home-quote__name">{t.name}</p>
                    <p className="home-quote__role">{t.role}</p>
                  </div>
                  <span className="home-quote__savings">{t.savings}</span>
                </div>
                <p className="home-stars">★★★★★</p>
                <p className="home-quote__text">&ldquo;{t.quote}&rdquo;</p>
              </MotionCard>
            ))}
          </div>
        </div>
      </MotionSection>

      <MotionSection className="home-section">
        <div className="home-container">
          <MotionItem>
            <div className="home-cta home-cta--enhanced">
              <div className="home-cta__glow" aria-hidden="true" />
              <p className="home-cta__eyebrow">Start Today — It&apos;s Free</p>
              <h2>Ready to Reduce Your Electricity Bills?</h2>
              <p>Book a free site visit today. Get your exact savings report, subsidy amount and payback period — with zero obligation.</p>
              <div className="home-cta__urgency">
                <span>✓ Response within 2 hours</span>
                <span>✓ Free site survey</span>
                <span>✓ No hidden charges</span>
              </div>
              <div className="home-btn-row">
                <a href={telLink()} className="home-btn home-btn--primary">Call Now</a>
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="home-btn home-btn--ghost">WhatsApp</a>
                <Link href="/contact" className="home-btn home-btn--ghost">Book Free Site Visit</Link>
              </div>
              <p className="home-note">✓ Subsidy assistance · ✓ 25-year warranty · ✓ Local Sangli team</p>
            </div>
          </MotionItem>
        </div>
      </MotionSection>
    </>
  );
}
