"use client";

import { FormEvent, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  CheckCircle2,
  Home,
  MapPin,
  Phone,
  ShieldCheck,
  User,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { BUSINESS_PHONE_DISPLAY, whatsappLink } from "@/lib/contact";
import { PROPERTY_LABELS } from "./config";
import { buildSiteSurveyWhatsAppMessage } from "./siteSurveyMessage";
import type { CalculatorInputs, SiteSurveyForm, SolarResult } from "./types";

type Props = {
  open: boolean;
  onClose: () => void;
  inputs: CalculatorInputs;
  result: SolarResult;
};

const currency = (value: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(value);

function normalizePhone(value: string) {
  return value.replace(/\D/g, "").slice(0, 10);
}

function isValidIndianPhone(phone: string) {
  return /^[6-9]\d{9}$/.test(phone);
}

function SiteSurveyForm({ onClose, inputs, result }: Omit<Props, "open">) {
  const [form, setForm] = useState<SiteSurveyForm>({
    name: "",
    phone: "",
    city: inputs.city || "",
    address: "",
  });
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof SiteSurveyForm, string>>>({});
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const next: Partial<Record<keyof SiteSurveyForm, string>> = {};
    if (!form.name.trim()) next.name = "Enter your name.";
    if (!form.phone.trim()) next.phone = "WhatsApp number required.";
    else if (!isValidIndianPhone(form.phone)) next.phone = "Enter valid 10-digit number.";
    if (!form.city.trim()) next.city = "City required.";
    if (!form.address.trim()) next.address = "Address required.";
    setFieldErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    const message = buildSiteSurveyWhatsAppMessage(form, inputs, result);
    window.open(whatsappLink(message), "_blank", "noopener,noreferrer");
    window.setTimeout(() => {
      setSubmitting(false);
      onClose();
    }, 400);
  };

  const updateField = <K extends keyof SiteSurveyForm>(key: K, value: SiteSurveyForm[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (fieldErrors[key]) {
      setFieldErrors((prev) => {
        const copy = { ...prev };
        delete copy[key];
        return copy;
      });
    }
  };

  return (
    <div className="calc-modal__layout">
      <aside className="calc-modal__aside">
        <div className="calc-modal__aside-head">
          <span className="calc-modal__free-badge">
            <ShieldCheck size={13} /> Free
          </span>
          <button
            type="button"
            className="calc-modal__close calc-modal__close--aside"
            onClick={onClose}
            aria-label="Close"
          >
            <X size={17} />
          </button>
        </div>
        <h2 id="site-survey-title">Book Free Site Survey</h2>
        <p className="calc-modal__aside-lead">Expert visit · Roof check · Custom quote</p>

        <dl className="calc-modal__preview-strip">
          <div>
            <dt>Type</dt>
            <dd>{PROPERTY_LABELS[inputs.propertyType]}</dd>
          </div>
          <div>
            <dt>System</dt>
            <dd>{result.systemSizeKw} kW</dd>
          </div>
          <div>
            <dt>Bill</dt>
            <dd>{currency(inputs.monthlyBill)}/mo</dd>
          </div>
          <div>
            <dt>Savings</dt>
            <dd>{currency(result.annualSavings)}/yr</dd>
          </div>
        </dl>
      </aside>

      <div className="calc-modal__main">
        <div className="calc-modal__mobile-handle" aria-hidden="true" />

        <div className="calc-modal__main-head">
          <h3>Your details</h3>
          <button type="button" className="calc-modal__close calc-modal__close--main" onClick={onClose} aria-label="Close">
            <X size={17} />
          </button>
        </div>

        <form className="calc-modal__form calc-modal__form--compact" onSubmit={handleSubmit} noValidate>
          <div className="calc-modal__form-grid">
            <label className={`calc-modal__field${fieldErrors.name ? " has-error" : ""}`}>
              <span>Name</span>
              <div className="calc-modal__input-wrap">
                <User size={15} />
                <input
                  value={form.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  placeholder="Full name"
                  autoComplete="name"
                />
              </div>
              {fieldErrors.name ? <em>{fieldErrors.name}</em> : null}
            </label>

            <label className={`calc-modal__field${fieldErrors.phone ? " has-error" : ""}`}>
              <span>WhatsApp</span>
              <div className="calc-modal__input-wrap">
                <Phone size={15} />
                <span className="calc-modal__prefix">+91</span>
                <input
                  value={form.phone}
                  onChange={(e) => updateField("phone", normalizePhone(e.target.value))}
                  placeholder="9876543210"
                  inputMode="numeric"
                  autoComplete="tel"
                  maxLength={10}
                />
              </div>
              {fieldErrors.phone ? <em>{fieldErrors.phone}</em> : null}
            </label>

            <label className={`calc-modal__field${fieldErrors.city ? " has-error" : ""}`}>
              <span>City</span>
              <div className="calc-modal__input-wrap">
                <MapPin size={15} />
                <input
                  value={form.city}
                  onChange={(e) => updateField("city", e.target.value)}
                  placeholder="City"
                  autoComplete="address-level2"
                />
              </div>
              {fieldErrors.city ? <em>{fieldErrors.city}</em> : null}
            </label>

            <label className={`calc-modal__field calc-modal__field--full${fieldErrors.address ? " has-error" : ""}`}>
              <span>Address</span>
              <div className="calc-modal__input-wrap calc-modal__input-wrap--area">
                <Home size={15} />
                <textarea
                  value={form.address}
                  onChange={(e) => updateField("address", e.target.value)}
                  placeholder="Full address for site visit"
                  rows={2}
                />
              </div>
              {fieldErrors.address ? <em>{fieldErrors.address}</em> : null}
            </label>
          </div>

          <Button type="submit" className="calc-modal__submit" disabled={submitting}>
            <WhatsAppIcon size={17} />
            {submitting ? "Opening WhatsApp..." : "Continue on WhatsApp"}
          </Button>

          <p className="calc-modal__note">
            <CheckCircle2 size={13} />
            Sent to Shubh Solar · {BUSINESS_PHONE_DISPLAY}
          </p>
        </form>
      </div>
    </div>
  );
}

export default function SiteSurveyModal({ open, onClose, inputs, result }: Props) {
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="calc-modal-backdrop"
          role="presentation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="calc-modal calc-modal--survey"
            role="dialog"
            aria-modal="true"
            aria-labelledby="site-survey-title"
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            onClick={(event) => event.stopPropagation()}
          >
            <SiteSurveyForm onClose={onClose} inputs={inputs} result={result} />
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
