import { AggregateOffer } from '../types';
import escapeJsonLd from './escapeJsonLd';

export const buildAggregateOffer = (offer: AggregateOffer) => `
  {
    "@type": "AggregateOffer",
    "priceCurrency": "${escapeJsonLd(offer.priceCurrency)}",
    ${offer.highPrice ? `"highPrice": "${escapeJsonLd(offer.highPrice)}",` : ''}
    ${
      offer.offerCount
        ? `"offerCount": "${escapeJsonLd(offer.offerCount)}",`
        : ''
    }
    "lowPrice": "${escapeJsonLd(offer.lowPrice)}"
  }
`;
