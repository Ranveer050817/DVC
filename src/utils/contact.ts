export const WHATSAPP_NUMBER = "917208901545";
export const CALL_NUMBER = "+917208901545";
export const INSTAGRAM_URL = "https://www.instagram.com/devil_cleanerz?igsh=MXhjemYxa3Fld2lnMg==";

export interface EnquiryDetails {
  name?: string;
  phone?: string;
  address?: string;
  service?: string;
  package?: string;
  date?: string;
  time?: string;
  moreService?: string;
  product?: string;
}

export const openWhatsApp = (details?: EnquiryDetails) => {
  let message = "";

  if (details?.name) {
    message = `Hello Devil Cleanerz & Enterprises,

I would like to enquire about your cleaning services.

Details:

👤 Name: ${details.name || ''}
📞 Phone: ${details.phone || ''}
📍 Address: ${details.address || ''}
🏠 Selected Service: ${details.service || ''}
📦 Selected Package: ${details.package || ''}
📅 Preferred Date: ${details.date || ''}
🕒 Preferred Time Slot: ${details.time || ''}

Please contact me regarding booking.

Thank you.`;
  } else if (details?.product) {
    message = `Hello Devil Cleanerz & Enterprises,

I am interested in ordering the ${details.product}.

Please share more details regarding pricing and availability.`;
  } else if (details?.package) {
    message = `Hello Devil Cleanerz & Enterprises,

I am interested in the ${details.package} Deep Cleaning Package.

Please share more details regarding pricing and availability.`;
  } else if (details?.moreService) {
    message = `Hello Devil Cleanerz & Enterprises,

I am interested in ${details.moreService}.

Please share more details regarding pricing and availability.`;
  } else if (details?.service) {
    message = `Hello Devil Cleanerz & Enterprises,

I am interested in ${details.service}.

Please contact me with more details.`;
  } else {
    message = `Hello Devil Cleanerz & Enterprises,

I am interested in your Deep Cleaning Services.
Please share more details.`;
  }

  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
};
