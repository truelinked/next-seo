import { FC } from 'react';
import { Address, AggregateOffer, Offers, Composer, Organizer } from '../types';
declare type Location = {
  type: string;
  name?: string;
  address?: Address;
  sameAs?: string;
  url?: string;
};
declare type Performer = {
  type: string;
  name: string;
  roleName?: string;
  role?: string;
  performer: object;
};
declare type Work = {
  type: string;
  name: string;
  role?: string;
  composer?: Composer;
};
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
  works?: Work | Work[];
}
declare const EventJsonLd: FC<EventJsonLdProps>;
export default EventJsonLd;
