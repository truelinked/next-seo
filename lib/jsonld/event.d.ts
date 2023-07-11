import { FC } from 'react';
import {
  Address,
  AggregateOffer,
  Offers,
  Composer,
  Performer,
  Organizer,
} from '../types';
import { JsonLdProps } from './jsonld';
declare type Location = {
  type: string;
  name?: string;
  address?: Address;
  sameAs?: string;
  url?: string;
};
declare type Work = {
  name: string;
  role: string;
};
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
declare const EventJsonLd: FC<EventJsonLdProps>;
export default EventJsonLd;
