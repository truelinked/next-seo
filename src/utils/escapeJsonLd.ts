const escapeJsonLd = (input: string | undefined | null) => {
  try {
    if (typeof input !== 'string') {
      return input;
    }
    return input.replace(/\n/g, ' ').replace(/\\([\s\S])|(")/g, '\\$1$2');
  } catch (e) {
    console.log('escapeJsonLd error:', e);
  }
  return '';
};

export default escapeJsonLd;
