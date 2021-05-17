const markup = (jsonld: string) => {
  try {
    JSON.parse(jsonld);
    return { __html: jsonld };
  } catch (e) {
    return { __html: '' };
  }
};

export default markup;
