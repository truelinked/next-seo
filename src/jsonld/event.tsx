import React, { FC } from 'react';
import Head from 'next/head';

import markup from '../utils/markup';
import formatIfArray from '../utils/formatIfArray';
import buildAddress from '../utils/buildAddress';
import { Address, AggregateOffer, Offers, Composer, Organizer } from '../types';
import { buildOffers } from '../utils/buildOffers';
import { buildAggregateOffer } from '../utils/buildAggregateOffer';
import escapeJsonLd from '../utils/escapeJsonLd';

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

const buildLocation = (location: Location) => {
  try {
    const data = `
    {
      ${location.address ? `${buildAddress(location.address)}` : ``}
      ${location.type ? `"@type": "${escapeJsonLd(location.type)}"` : ``}
      ${location.url ? `,"url": "${location.url}"` : ``}
      ${location.sameAs ? `,"sameAs": "${escapeJsonLd(location.sameAs)}"` : ``}
      ${location.name ? `",name": "${escapeJsonLd(location.name)}"` : ``}
    }
  `;

    const obj = JSON.parse(data);
    return `"location": ${JSON.stringify(obj, null, 2)}`;
  } catch (e) {}

  return '';
};

const buildPerformer = (performer: Performer) => `
  {
    "@type": "Person",
    "name": "${escapeJsonLd(performer.name)}"
  }
`;

const buildComposer = (composer: Composer) => `
  {
    "@type": "Person",
    "name": "${escapeJsonLd(composer.name)}"
  }
`;

const buildOrganization = (organizer: Organizer) => `
  {
    "@type": "Organization",
    "name": "${escapeJsonLd(organizer.name)}",
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
  const locationJSONLD = buildLocation(location);

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
    ${locationJSONLD ? `${locationJSONLD},` : ``}
    ${images ? `"image":${formatIfArray(images)},` : ``}
    ${url ? `"url": "${url}",` : ``}
    ${description ? `"description": "${escapeJsonLd(description)}",` : ``}
    
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
    "name": "${escapeJsonLd(name)}"
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
