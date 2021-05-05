const escapeJsonLd = (jsonld: string) => {
  try {
    return jsonld.replace(/\n/g, ' ').replace(/\\([\s\S])|(")/g, '\\$1$2');
  } catch (e) {
    console.log('escapeJsonLd error:', e);
  }
  return '';
};

export default escapeJsonLd;
