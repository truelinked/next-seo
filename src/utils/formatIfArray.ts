import escapeJsonLd from './escapeJsonLd';

const formatIfArray = (value: string | string[]) =>
  Array.isArray(value)
    ? `[${value.map(val => `"${escapeJsonLd(val)}"`)}]`
    : `"${escapeJsonLd(value)}"`;

export default formatIfArray;
