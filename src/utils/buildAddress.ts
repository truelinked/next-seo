import { Address } from '../types';
import escapeJsonLd from './escapeJsonLd';

export default (address: Address) => `
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "${escapeJsonLd(address.streetAddress)}",
    "addressLocality": "${escapeJsonLd(address.addressLocality)}",
    ${
      address.addressRegion
        ? `"addressRegion": "${escapeJsonLd(address.addressRegion)}",`
        : ''
    }
    "postalCode": "${escapeJsonLd(address.postalCode)}",
    "addressCountry": "${escapeJsonLd(address.addressCountry)}"
  },
`;
