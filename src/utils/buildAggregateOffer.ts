import { AggregateOffer } from '../types';
import { buildOffers } from './buildOffers';
import escapeJsonLd from './escapeJsonLd';

export const buildAggregateOffer = (offer: AggregateOffer) => `
  {
    "@type": "AggregateOffer",
    "priceCurrency": "${escapeJsonLd(offer.priceCurrency)}",
    ${offer.highPrice ? `"highPrice": "${escapeJsonLd(offer.highPrice)}",` : ''}
    ${offer.offerCount ? `"offerCount": "${escapeJsonLd(offer.offerCount)}",` : ''}
    ${
      offer.offers
        ? `"offers": ${
            Array.isArray(offer.offers)
              ? `[${offer.offers.map(offer => `${buildOffers(offer)}`)}]`
              : buildOffers(offer.offers)
          },`
        : ''
    }
    "lowPrice": "${escapeJsonLd(offer.lowPrice)}"
  }
`;
