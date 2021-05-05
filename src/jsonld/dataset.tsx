import React, { FC } from 'react';
import Head from 'next/head';

import markup from '../utils/markup';
import escapeJsonLd from '../utils/escapeJsonLd';
export interface DatasetJsonLdProps {
  description: string;
  name: string;
  license?: string;
}

const DatasetJsonLd: FC<DatasetJsonLdProps> = ({
  description,
  name,
  license,
}) => {
  const jslonld = `{
    "@context": "https://schema.org",
    "@type": "Dataset",
    "description": "${escapeJsonLd(description)}",
    "name": "${escapeJsonLd(name)}"${
    license
      ? `,
        "license": "${escapeJsonLd(license)}"`
      : ''
  }
  }`;

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={markup(jslonld)}
        key="jsonld-dataset"
      />
    </Head>
  );
};

export default DatasetJsonLd;
