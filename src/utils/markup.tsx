import escapeJsonLd from './escapeJsonLd';

const markup = (jsonld: string) => ({ __html: escapeJsonLd(jsonld) });

export default markup;
