import { BUSINESS_EMAIL, BUSINESS_PHONE_DISPLAY } from "@/lib/contact";

export default function TermsPage() {
  return (
    <div className="page-wrap">
      <section className="section">
        <div className="container panel">
          <h1 className="section-title">Terms & Conditions</h1>
          <p className="text-sm text-slate-300 mt-2">Last updated: July 2026</p>
          <p className="mt-5 text-slate-200">
            These terms govern use of Shubh Solar website and inquiry services. By using this site, you agree
            to provide accurate information and use the website for lawful purposes only.
          </p>
          <h2 className="text-xl font-semibold mt-6">Quotes & Estimates</h2>
          <p className="mt-2 text-slate-200">
            Savings, generation and payback shown online are indicative. Final values depend on actual site
            survey, consumption and applicable utility policies.
          </p>
          <h2 className="text-xl font-semibold mt-6">Third-Party Policies</h2>
          <p className="mt-2 text-slate-200">
            Subsidy rules, loan rates and DISCOM procedures may change. Shubh Solar assists with applications
            but final approvals are governed by relevant authorities.
          </p>
          <h2 className="text-xl font-semibold mt-6">Liability</h2>
          <p className="mt-2 text-slate-200">
            Shubh Solar is not liable for indirect losses arising from use of this website or dependence on
            indicative estimates without site verification.
          </p>
          <h2 className="text-xl font-semibold mt-6">Contact</h2>
          <p className="mt-2 text-slate-200">Email: {BUSINESS_EMAIL} · Phone: {BUSINESS_PHONE_DISPLAY}</p>
        </div>
      </section>
    </div>
  );
}
