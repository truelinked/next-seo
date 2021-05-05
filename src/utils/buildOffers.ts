import { Offers } from '../types';
import escapeJsonLd from './escapeJsonLd';

// TODO: Docs for offers itemCondition & availability
// TODO: Seller type, make dynamic
export const buildOffers = (offers: Offers) => `
  {
    "@type": "Offer",
    "priceCurrency": "${escapeJsonLd(offers.priceCurrency)}",
    ${
      offers.priceValidUntil
        ? `"priceValidUntil": "${escapeJsonLd(offers.priceValidUntil)}",`
        : ''
    }
    ${
      offers.itemCondition
        ? `"itemCondition": "${escapeJsonLd(offers.itemCondition)}",`
        : ''
    }
    ${
      offers.availability
        ? `"availability": "${escapeJsonLd(offers.availability)}",`
        : ''
    }
    ${offers.url ? `"url": "${offers.url}",` : ''}
    ${
      offers.seller
        ? `
      "seller": {
      "@type": "Organization",
      "name": "${escapeJsonLd(offers.seller.name)}"
    },
    `
        : ''
    }
    "price": "${escapeJsonLd(offers.price)}"
  }
`;
