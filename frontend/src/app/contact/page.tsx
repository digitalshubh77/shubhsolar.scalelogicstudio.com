"use client";
import { useState } from "react";
import {
  BUSINESS_ADDRESS,
  BUSINESS_EMAIL,
  BUSINESS_PHONE_DISPLAY,
  whatsappLink,
} from "@/lib/contact";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("Sangli");
  const [property, setProperty] = useState("Home");
  const [roof, setRoof] = useState("Yes, I own it");
  const [bill, setBill] = useState("₹3,000-6,000");
  const [timeline, setTimeline] = useState("1-3 months");
  const [message, setMessage] = useState("");

  const waMessage = `Hi Shubh Solar! Lead details: Name ${name}, Phone ${phone}, City ${city}, Property ${property}, Roof ${roof}, Bill ${bill}, Timeline ${timeline}, Message ${message}.`;

  return (
    <div className="page-wrap">
      <section className="section home-hero">
        <div className="container">
          <p className="eyebrow">Get Started</p>
          <h1 className="hero-title">Get Your Free Solar Quote & Site Visit</h1>
          <p className="hero-subtitle mt-4">
            Fill this 60-second form. Our engineer calls you within 2 working hours (Mon-Sat, 9:30 AM-7 PM).
          </p>
          <div className="grid sm:grid-cols-3 gap-3 mt-6">
            <div className="soft-card text-sm">Response in 2 working hours</div>
            <div className="soft-card text-sm">Free survey within 48 hours</div>
            <div className="soft-card text-sm">No spam, no pressure consultation</div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container grid lg:grid-cols-[1.3fr,0.7fr] gap-6">
          <div className="panel">
            {submitted ? (
              <div>
                <h2 className="text-2xl font-semibold">Thank you, {name || "there"}!</h2>
                <p className="mt-2 text-slate-300">
                  Our engineer will call you within 2 working hours. Want faster response?
                </p>
                <a className="btn-primary mt-5" href={whatsappLink(waMessage)} target="_blank" rel="noopener noreferrer">Chat on WhatsApp now</a>
              </div>
            ) : (
              <form
                className="grid md:grid-cols-2 gap-3"
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
              >
                <input className="solar-input" placeholder="Full Name *" value={name} onChange={(e) => setName(e.target.value)} required />
                <input className="solar-input" placeholder="WhatsApp Number *" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                <select className="solar-input" value={city} onChange={(e) => setCity(e.target.value)}>
                  <option>Sangli</option><option>Miraj</option><option>Kupwad</option><option>Islampur</option><option>Kolhapur</option><option>Other</option>
                </select>
                <select className="solar-input" value={property} onChange={(e) => setProperty(e.target.value)}>
                  <option>Home</option><option>Shop-Office</option><option>Factory-Industry</option>
                </select>
                <select className="solar-input" value={roof} onChange={(e) => setRoof(e.target.value)}>
                  <option>Yes, I own it</option><option>No, rented</option><option>It&apos;s a family property</option>
                </select>
                <select className="solar-input" value={bill} onChange={(e) => setBill(e.target.value)}>
                  <option>Below ₹1,500</option><option>₹1,500-3,000</option><option>₹3,000-6,000</option><option>₹6,000-15,000</option><option>Above ₹15,000</option>
                </select>
                <select className="solar-input md:col-span-2" value={timeline} onChange={(e) => setTimeline(e.target.value)}>
                  <option>Within 1 month</option><option>1-3 months</option><option>Just exploring</option>
                </select>
                <textarea className="solar-input md:col-span-2" placeholder="Message (optional)" value={message} onChange={(e) => setMessage(e.target.value)} rows={4} />
                <button type="submit" className="btn-primary md:col-span-2 justify-center">Get My Free Quote</button>
                <p className="text-xs text-slate-400 md:col-span-2">Your details are used only to prepare your quote. We never sell your data.</p>
              </form>
            )}
          </div>

          <aside className="space-y-4">
            <div className="soft-card">
              <h3 className="font-semibold mb-3">Contact Info</h3>
              <p>Call: {BUSINESS_PHONE_DISPLAY}</p>
              <p>Email: {BUSINESS_EMAIL}</p>
              <p>Office: {BUSINESS_ADDRESS}</p>
              <p>Hours: Mon-Sat · 9:30 AM - 7:00 PM</p>
            </div>
            <div className="soft-card">
              <h3 className="font-semibold mb-3">Visit Our Office</h3>
              <p className="text-sm text-slate-300">See live panels, inverters and structures before you decide.</p>
              <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="btn-secondary mt-4">Get Directions</a>
            </div>
            <div className="soft-card">
              <h3 className="font-semibold mb-3">Why People Trust Us</h3>
              <ul className="text-sm space-y-2 text-slate-300">
                <li>✓ 500+ projects across Vidarbha</li>
                <li>✓ 4.9★ Google rating (750+ customers)</li>
                <li>✓ MNRE-empanelled · ALMM panels</li>
                <li>✓ Free survey with subsidy support</li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
