import React from 'react';

import type { ItemListElements } from 'src/types';
import { setItemListBreadCrumbsElements } from 'src/utils/schema/setItemListElements';

import { JsonLd, JsonLdProps } from './jsonld';

export interface BreadCrumbJsonLdProps extends JsonLdProps {
  itemListElements: ItemListElements[];
}

function BreadCrumbJsonLd({
  type = 'BreadcrumbList',
  keyOverride,
  itemListElements,
}: BreadCrumbJsonLdProps) {
  const data = {
    itemListElement: setItemListBreadCrumbsElements(itemListElements),
  };

  return (
    <JsonLd
      type={type}
      keyOverride={keyOverride}
      {...data}
      scriptKey="breadcrumb"
    />
  );
}

export default BreadCrumbJsonLd;
