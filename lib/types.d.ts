export interface OpenGraphImages {
  url: string;
  width?: number;
  height?: number;
  alt?: string;
}
export interface OpenGraphVideos {
  url: string;
  width?: number;
  height?: number;
  alt?: string;
  type?: string;
  secureUrl?: string;
}
export interface Address {
  streetAddress: string;
  addressLocality: string;
  addressRegion?: string;
  postalCode: string;
  addressCountry: string;
}
export interface Composer {
  type: string;
  name: string;
  sameAs?: string;
}
export interface Organizer {
  type: string;
  name: string;
  url?: string;
  sameAs?: string;
}
export interface Video {
  name: string;
  description: string;
  thumbnailUrls: string[];
  uploadDate: string;
  contentUrl?: string;
  duration?: string;
  embedUrl?: string;
  expires?: string;
  hasPart?: Clip | Clip[];
  watchCount?: number;
  publication?: BroadcastEvent | BroadcastEvent[];
  regionsAllowed?: string | string[];
}
export interface Clip {
  name: string;
  startOffset: number;
  url: string;
}
export interface BroadcastEvent {
  name?: string;
  isLiveBroadcast: boolean;
  startDate: string;
  endDate: string;
}
export declare type Offers = {
  price: string;
  priceCurrency: string;
  priceValidUntil?: string;
  itemCondition?: string;
  availability?: string;
  url?: string;
  seller: {
    name: string;
  };
};
export declare type AggregateOffer = {
  priceCurrency: string;
  lowPrice: string;
  highPrice?: string;
  offerCount?: string;
  offers?: Offers | Offers[];
};
export interface OpenGraphVideoActors {
  profile: string;
  role?: string;
}
export interface OpenGraph {
  url?: string;
  type?: string;
  title?: string;
  description?: string;
  images?: ReadonlyArray<OpenGraphImages>;
  videos?: ReadonlyArray<OpenGraphVideos>;
  defaultImageHeight?: number;
  defaultImageWidth?: number;
  locale?: string;
  site_name?: string;
  profile?: OpenGraphProfile;
  book?: OpenGraphBook;
  article?: OpenGraphArticle;
  video?: OpenGraphVideo;
}
export interface OpenGraphProfile {
  firstName?: string;
  lastName?: string;
  username?: string;
  gender?: string;
}
export interface OpenGraphBook {
  authors?: ReadonlyArray<string>;
  isbn?: string;
  releaseDate?: string;
  tags?: ReadonlyArray<string>;
}
export interface OpenGraphArticle {
  publishedTime?: string;
  modifiedTime?: string;
  expirationTime?: string;
  authors?: ReadonlyArray<string>;
  section?: string;
  tags?: ReadonlyArray<string>;
}
export interface OpenGraphVideo {
  actors?: ReadonlyArray<OpenGraphVideoActors>;
  directors?: ReadonlyArray<string>;
  writers?: ReadonlyArray<string>;
  duration?: number;
  releaseDate?: string;
  tags?: ReadonlyArray<string>;
  series?: string;
}
export interface Twitter {
  handle?: string;
  site?: string;
  cardType?: string;
}
interface MobileAlternate {
  media: string;
  href: string;
}
interface LanguageAlternate {
  hrefLang: string;
  href: string;
}
interface LinkTag {
  rel: string;
  href: string;
  sizes?: string;
  type?: string;
  color?: string;
  keyOverride?: string;
}
export interface BaseMetaTag {
  content: string;
  keyOverride?: string;
}
export interface HTML5MetaTag extends BaseMetaTag {
  name: string;
  property?: undefined;
  httpEquiv?: undefined;
}
export interface RDFaMetaTag extends BaseMetaTag {
  property: string;
  name?: undefined;
  httpEquiv?: undefined;
}
export interface HTTPEquivMetaTag extends BaseMetaTag {
  httpEquiv:
    | 'content-security-policy'
    | 'content-type'
    | 'default-style'
    | 'x-ua-compatible'
    | 'refresh';
  name?: undefined;
  property?: undefined;
}
export declare type MetaTag = HTML5MetaTag | RDFaMetaTag | HTTPEquivMetaTag;
export declare type ImagePrevSize = 'none' | 'standard' | 'large';
export declare type AggregateRating = {
  ratingValue: string;
  reviewCount?: string;
  ratingCount?: string;
  bestRating?: string;
};
export declare type GamePlayMode = 'CoOp' | 'MultiPlayer' | 'SinglePlayer';
export declare type Review = {
  author: Author;
  datePublished?: string;
  reviewBody?: string;
  name?: string;
  publisher?: Publisher;
  reviewRating: ReviewRating;
};
export declare type ReviewRating = {
  bestRating?: string;
  ratingValue: string;
  worstRating?: string;
};
export declare type Author = {
  type: string;
  name: string;
};
export declare type Publisher = {
  type: string;
  name: string;
};
export declare type ApplicationCategory =
  | 'Game'
  | 'SocialNetworking'
  | 'Travel'
  | 'Shopping'
  | 'Sports'
  | 'Lifestyle'
  | 'Business'
  | 'Design'
  | 'Developer'
  | 'Driver'
  | 'Educational'
  | 'Health'
  | 'Finance'
  | 'Security'
  | 'Browser'
  | 'Communication'
  | 'DesktopEnhancement'
  | 'Entertainment'
  | 'Multimedia'
  | 'Home'
  | 'Utilities'
  | 'Reference';
export interface AdditionalRobotsProps {
  nosnippet?: boolean;
  maxSnippet?: number;
  maxImagePreview?: ImagePrevSize;
  maxVideoPreview?: number;
  noarchive?: boolean;
  unavailableAfter?: string;
  noimageindex?: boolean;
  notranslate?: boolean;
}
export interface NextSeoProps {
  title?: string;
  titleTemplate?: string;
  defaultTitle?: string;
  noindex?: boolean;
  nofollow?: boolean;
  robotsProps?: AdditionalRobotsProps;
  description?: string;
  canonical?: string;
  mobileAlternate?: MobileAlternate;
  languageAlternates?: ReadonlyArray<LanguageAlternate>;
  openGraph?: OpenGraph;
  facebook?: {
    appId: string;
  };
  twitter?: Twitter;
  additionalMetaTags?: ReadonlyArray<MetaTag>;
  additionalLinkTags?: ReadonlyArray<LinkTag>;
}
export interface DefaultSeoProps extends NextSeoProps {
  dangerouslySetAllPagesToNoIndex?: boolean;
  dangerouslySetAllPagesToNoFollow?: boolean;
  defaultOpenGraphImageWidth?: number;
  defaultOpenGraphImageHeight?: number;
  defaultOpenGraphVideoWidth?: number;
  defaultOpenGraphVideoHeight?: number;
}
export interface BuildTagsParams extends DefaultSeoProps, NextSeoProps {}
export {};
