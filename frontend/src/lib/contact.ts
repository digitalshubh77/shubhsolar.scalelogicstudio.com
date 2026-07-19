export const BUSINESS_PHONE = "919876543210";
export const BUSINESS_PHONE_DISPLAY = "+91 98765 43210";
export const BUSINESS_ADDRESS = "Shubh Solar, AP Sangli, Sangli, Maharashtra 416416";
export const BUSINESS_EMAIL = "info@shubhsolar.in";

const DEFAULT_WHATSAPP_MESSAGE = "Hi Shubh Solar! I want a free solar quote.";

export type InquiryPayload = {
  name: string;
  phone: string;
  bill?: string;
  source?: string;
};

export function buildInquiryMessage({
  name,
  phone,
  bill,
  source = "Website",
}: InquiryPayload) {
  const lines = [
    "Hi Shubh Solar! New inquiry:",
    `Name: ${name}`,
    `Phone: ${phone}`,
  ];

  if (bill) lines.push(`Monthly bill: ${bill}`);
  lines.push(`Source: ${source}`);

  return lines.join("\n");
}

export function telLink() {
  return `tel:+${BUSINESS_PHONE}`;
}

export function whatsappLink(message = DEFAULT_WHATSAPP_MESSAGE) {
  return `https://wa.me/${BUSINESS_PHONE}?text=${encodeURIComponent(message)}`;
}
