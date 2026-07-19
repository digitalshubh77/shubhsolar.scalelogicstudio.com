import { BUSINESS_EMAIL, BUSINESS_PHONE_DISPLAY } from "@/lib/contact";

export default function PrivacyPage() {
  return (
    <div className="page-wrap">
      <section className="section">
        <div className="container panel">
          <h1 className="section-title">Privacy Policy</h1>
          <p className="text-sm text-slate-300 mt-2">Last updated: July 2026</p>
          <p className="mt-5 text-slate-200">
            Shubh Solar collects basic contact details to provide solar quotations, site survey coordination,
            subsidy and service assistance. We use this information only for service delivery and customer support.
          </p>
          <h2 className="text-xl font-semibold mt-6">What We Collect</h2>
          <p className="mt-2 text-slate-200">Name, phone number, city, electricity bill range, property details and optional messages.</p>
          <h2 className="text-xl font-semibold mt-6">How We Use Data</h2>
          <p className="mt-2 text-slate-200">To prepare proposals, schedule site visits, communicate updates and provide after-sales support.</p>
          <h2 className="text-xl font-semibold mt-6">Your Rights</h2>
          <p className="mt-2 text-slate-200">You can request correction or deletion of your personal data by contacting us.</p>
          <h2 className="text-xl font-semibold mt-6">Contact</h2>
          <p className="mt-2 text-slate-200">Email: {BUSINESS_EMAIL} · Phone: {BUSINESS_PHONE_DISPLAY}</p>
        </div>
      </section>
    </div>
  );
}
