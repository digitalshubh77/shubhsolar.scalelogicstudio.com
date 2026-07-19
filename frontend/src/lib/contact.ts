export const BUSINESS_PHONE = "918275720252";
export const BUSINESS_PHONE_DISPLAY = "+91 82757 20252";
export const BUSINESS_ADDRESS = "Shubh Solar, AP Sangli, Sangli, Maharashtra 416416";
export const BUSINESS_EMAIL = "info@shubhsolar.in";

const DEFAULT_WHATSAPP_MESSAGE =
  "Hi Shubh Solar! I am interested in rooftop solar. Please share a free quote and savings estimate.";

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
