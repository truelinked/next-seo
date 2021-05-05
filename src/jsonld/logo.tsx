import React, { FC } from 'react';
import Head from 'next/head';

import markup from '../utils/markup';
import escapeJsonLd from '../utils/escapeJsonLd';
export interface LogoJsonLdProps {
  keyOverride?: string;
  logo: string;
  url: string;
}

const LogoJsonLd: FC<LogoJsonLdProps> = ({ keyOverride, url, logo }) => {
  const jslonld = `{
    "@context": "https://schema.org",
    "@type": "Organization",
    "url": "${url}",
    "logo": "${escapeJsonLd(logo)}"
  }`;

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={markup(jslonld)}
        key={`jsonld-logo${keyOverride ? `-${keyOverride}` : ''}`}
      />
    </Head>
  );
};

export default LogoJsonLd;
