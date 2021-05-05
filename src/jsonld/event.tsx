import React, { FC } from 'react';
import Head from 'next/head';

import markup from '../utils/markup';
import formatIfArray from '../utils/formatIfArray';
import buildAddress from '../utils/buildAddress';
import { Address, AggregateOffer, Offers, Composer, Organizer } from '../types';
import { buildOffers } from '../utils/buildOffers';
import { buildAggregateOffer } from '../utils/buildAggregateOffer';

type Location = {
  type: string;
  name?: string;
  address?: Address;
  sameAs?: string;
  url?: string;
};

type Performer = {
  name: string;
};
//Updated event for multiple instance and props
export interface EventJsonLdProps {
  keyOverride: string;
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
  composers?: Composer | Composer[];
  organizers?: Organizer | Organizer[];
}

const buildLocation = (location: Location) => `
  "location": {
    ${location.type ? `"@type": "${location.type}",` : ``}
    ${location.address ? `${buildAddress(location.address)}` : ``}   
    ${location.url ? `"url": "${location.url}",` : ``}
    ${location.sameAs ? `"sameAs": "${location.sameAs}"` : ``}
    ${location.name ? `"name": "${location.name}"` : ``}
  }
`;

const buildPerformer = (performer: Performer) => `
  {
    "@type": "Person",
    "name": "${performer.name}"
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
  url,
  description,
  images,
  offers,
  aggregateOffer,
  performers,
  eventType,
  eventStatus,
  eventAttendanceMode,
  composers,
  organizers,
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
