import React, { FC } from 'react';
import Head from 'next/head';
import { Address, AggregateOffer, Offers, Composer, Organizer } from '../types';
import buildAddress from '../utils/buildAddress';
import { JsonLdProps } from './jsonld';

const markup = (jsonld: string) => ({ __html: jsonld });

var formatIfArray = function formatIfArray(value: any) {
  return Array.isArray(value)
    ? '[' +
        value.map(function (val) {
          return '"' + val + '"';
        }) +
        ']'
    : '"' + value + '"';
};

var buildOffers = function buildOffers(offers: any) {
  return (
    '\n  {\n    "@type": "Offer",\n    "priceCurrency": "' +
    offers.priceCurrency +
    '",\n    ' +
    (offers.priceValidUntil
      ? '"priceValidUntil": "' + offers.priceValidUntil + '",'
      : '') +
    '\n    ' +
    (offers.itemCondition
      ? '"itemCondition": "' + offers.itemCondition + '",'
      : '') +
    '\n    ' +
    (offers.availability
      ? '"availability": "' + offers.availability + '",'
      : '') +
    '\n    ' +
    (offers.url ? '"url": "' + offers.url + '",' : '') +
    '\n    ' +
    (offers.seller
      ? '\n      "seller": {\n      "@type": "Organization",\n      "name": "' +
        offers.seller.name +
        '"\n    },\n    '
      : '') +
    '\n    "price": "' +
    offers.price +
    '"\n  }\n'
  );
};

var buildAggregateOffer = function buildAggregateOffer(offer: any) {
  return (
    '\n  {\n    "@type": "AggregateOffer",\n    "priceCurrency": "' +
    offer.priceCurrency +
    '",\n    ' +
    (offer.highPrice ? '"highPrice": "' + offer.highPrice + '",' : '') +
    '\n    ' +
    (offer.offerCount ? '"offerCount": "' + offer.offerCount + '",' : '') +
    '\n    "lowPrice": "' +
    offer.lowPrice +
    '"\n  }\n'
  );
};

type Location = {
  type: string;
  name?: string;
  address?: Address;
  sameAs?: string;
  url?: string;
};

type Performer = {
  name: string;
  role: string;
};
type Work = {
  name: string;
  role: string;
};
//Updated event for multiple instance and props
export interface EventJsonLdProps extends JsonLdProps {
  name: string;
  startDate: string;
  endDate: string;
  eventType: string;
  eventStatus: string;
  eventAttendanceMode: string;
  location: Location;
  url?: string;
  description?: string;
  images?: string[];
  offers?: Offers | Offers[];
  aggregateOffer?: AggregateOffer;
  performers?: Performer | Performer[];
  keyOverride: string;
  composers?: Composer | Composer[];
  organizers?: Organizer | Organizer[];
  works?: Work | Work[];
}

const buildLocation = (location: Location) => `
  "location": {
    ${location.type ? `"@type": "${location.type}",` : ``}
    ${location.address ? `${buildAddress(location.address)},` : ``}   
    ${location.url ? `"url": "${location.url}",` : ``}
    ${location.sameAs ? `"sameAs": "${location.sameAs}"` : ``}
    ${location.name ? `"name": "${location.name}"` : ``}
  }
`;

const buildPerformer = (performer: Performer) => `
  {
    
    "name": "${performer.name}",
    "performer": {
      "@type": "Person",
      "name": "${performer.name}",
    }
    ${performer.role ? `,` : ``}
    ${performer.role ? `"@type":"PerformanceRole"` : ``},
    ${performer.role ? `"roleName": ${performer.role}` : ``}    

  }
`;

const buildWorksPerformed = (work: Work) => `
  {
    
    "@type":"CreativeWork",
    "name": "${work.name}",
    "creator":{
       "@type":"Person",
       "name":"${work.name}",
    }
  }
`;

const buildComposer = (composer: Composer) => `
  {
    "@type": "Person",
    "name": "${composer.name}"
  }
`;

const buildOrganization = (organizer: Organizer) => `
  {
    "@type": "Organization",
    "name": "${organizer.name}",
    ${organizer.url ? `"url": "${encodeURI(organizer.url)}"` : ``}
  }
`;

const EventJsonLd: FC<EventJsonLdProps> = ({
  keyOverride,
  name,
  startDate,
  endDate,
  location,
  images,
  offers,
  aggregateOffer,
  performers,
  eventType,
  eventStatus,
  eventAttendanceMode,
  composers,
  organizers,
  works,
  url,
  description,
}) => {
  const jslonld = `{
    "@context": "https://schema.org",
    "@type": "${eventType ? eventType : 'Event'}",
    ${eventStatus ? `"eventStatus":"${eventStatus}",` : ``}
    ${
      eventAttendanceMode
        ? `"eventAttendanceMode":"${eventAttendanceMode}",`
        : ``
    }
    "startDate": "${startDate}",
    "endDate": "${endDate}",
    ${location ? `${buildLocation(location)},` : ``}
    ${images ? `"image":${formatIfArray(images)},` : ``}
    ${url ? `"url": "${url}",` : ``}
    ${description ? `"description": "${description}",` : ``}
    
    ${
      offers
        ? `"offers": ${
            Array.isArray(offers)
              ? `[${offers.map(offer => `${buildOffers(offer)}`)}]`
              : buildOffers(offers)
          },`
        : ''
    }
    ${
      aggregateOffer && !offers
        ? `"offers": ${buildAggregateOffer(aggregateOffer)},`
        : ''
    }
    ${
      works
        ? `"workPerformed": ${
            Array.isArray(works)
              ? `[${works.map(work => `${buildWorksPerformed(work)}`)}]`
              : buildWorksPerformed(works)
          },`
        : ''
    }
    ${
      composers
        ? `"composer": ${
            Array.isArray(composers)
              ? `[${composers.map(composer => `${buildComposer(composer)}`)}]`
              : buildComposer(composers)
          },`
        : ''
    }
    ${
      organizers
        ? `"organizer": ${
            Array.isArray(organizers)
              ? `[${organizers.map(
                  organizer => `${buildOrganization(organizer)}`,
                )}]`
              : buildOrganization(organizers)
          },`
        : ''
    }
    ${
      performers
        ? `"performer": ${
            Array.isArray(performers)
              ? `[${performers.map(
                  performer => `${buildPerformer(performer)}`,
                )}]`
              : buildPerformer(performers)
          },`
        : ''
    }
    "name": "${name}"
  }`;

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={markup(jslonld.replace(/(^[ \t]*\n)/gm, ''))}
        key={`jsonld-video${keyOverride ? `-${keyOverride}` : ''}`}
      />
    </Head>
  );
};

export default EventJsonLd;
