const escapeJsonLd = (jsonld: string) => {
  try {
    const cleanedLineBreaks = jsonld.replace(/\n/g, ' ');
    if (cleanedLineBreaks && cleanedLineBreaks.length > 0) {
      const json = JSON.stringify(jsonld);
      return json.substring(1, json.length - 1);
    }
  } catch (e) {
    console.log('escapeJsonLd error:', e);
  }
  return '';
};

export default escapeJsonLd;
