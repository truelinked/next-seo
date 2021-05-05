import React, { FC } from 'react';
import Head from 'next/head';

import markup from '../utils/markup';
import escapeJsonLd from '../utils/escapeJsonLd';
export interface HiringOrganization {
  name: string;
  sameAs: string;
  logo?: string;
}

export interface Place {
  addressLocality: string;
  addressRegion: string;
  postalCode: string;
  streetAddress: string;
  addressCountry: string;
}

export interface MonetaryAmount {
  currency: string;
  value: number | [number, number];
  unitText: UnitTextType;
}

export type UnitTextType = 'HOUR' | 'DAY' | 'WEEK' | 'MONTH' | 'YEAR';

export type EmploymentType =
  | 'FULL_TIME'
  | 'PART_TIME'
  | 'CONTRACTOR'
  | 'TEMPORARY'
  | 'INTERN'
  | 'VOLUNTEER'
  | 'PER_DIEM'
  | 'OTHER';

export interface JobPostingJsonLdProps {
  keyOverride?: string;
  datePosted: string;
  description: string;
  hiringOrganization: HiringOrganization;
  title: string;
  validThrough: string;
  applicantLocationRequirements?: string;
  baseSalary?: MonetaryAmount;
  employmentType?: EmploymentType | EmploymentType[];
  jobLocation?: Place;
  jobLocationType?: string;
}

const buildBaseSalary = (baseSalary: MonetaryAmount) => `
  "baseSalary": {
    "@type": "MonetaryAmount",
    ${
      baseSalary.currency
        ? `"currency": "${escapeJsonLd(baseSalary.currency)}",`
        : ''
    }
    "value": {
      ${
        baseSalary.value
          ? Array.isArray(baseSalary.value)
            ? `"minValue": "${baseSalary.value[0]}", "maxValue": "${baseSalary.value[1]}",`
            : `"value": "${baseSalary.value}",`
          : ''
      }
      ${baseSalary.unitText ? `"unitText": "${baseSalary.unitText}",` : ''}
      "@type": "QuantitativeValue"
    }
  },
`;

const JobPostingJsonLd: FC<JobPostingJsonLdProps> = ({
  keyOverride,
  baseSalary,
  datePosted,
  description,
  employmentType,
  hiringOrganization,
  jobLocation,
  applicantLocationRequirements,
  jobLocationType,
  title,
  validThrough,
}) => {
  const jslonld = `{
    "@context": "https://schema.org",
    "@type": "JobPosting",
    ${baseSalary ? buildBaseSalary(baseSalary) : ''}
    "datePosted": "${datePosted}",
    "description": "${escapeJsonLd(description)}",
    ${employmentType ? `"employmentType": "${employmentType}",` : ''}
    "hiringOrganization" : {
      "@type" : "Organization",
      "name" : "${escapeJsonLd(hiringOrganization.name)}",
      "sameAs" : "${escapeJsonLd(hiringOrganization.sameAs)}"
      ${hiringOrganization.logo ? `,"logo": "${hiringOrganization.logo}"` : ''}
    },
    ${
      jobLocation
        ? `"jobLocation": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "${escapeJsonLd(jobLocation.addressLocality)}",
        "addressRegion": "${escapeJsonLd(jobLocation.addressRegion)}",
        "postalCode" : "${escapeJsonLd(jobLocation.postalCode)}",
        "streetAddress" : "${escapeJsonLd(jobLocation.streetAddress)}",
        "addressCountry" : "${escapeJsonLd(jobLocation.addressCountry)}"
          }
      },`
        : ''
    }
    ${
      applicantLocationRequirements
        ? ` "applicantLocationRequirements": {
        "@type": "Country",
        "name": "${escapeJsonLd(applicantLocationRequirements)}"
    },`
        : ''
    }
    ${
      jobLocationType
        ? `"jobLocationType": "${escapeJsonLd(jobLocationType)}",`
        : ''
    }
    ${validThrough ? `"validThrough": "${escapeJsonLd(validThrough)}",` : ''}
    "title": "${escapeJsonLd(title)}"
  }`;

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={markup(jslonld)}
        key={`jsonld-jobposting${keyOverride ? `-${keyOverride}` : ''}`}
      />
    </Head>
  );
};

export default JobPostingJsonLd;
