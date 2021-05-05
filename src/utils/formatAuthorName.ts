import escapeJsonLd from './escapeJsonLd';

const formatAuthorName = (authorName: string | string[]) =>
  Array.isArray(authorName)
    ? `[${authorName.map(
        name => `{"@type": "Person","name": "${escapeJsonLd(name)}"}`,
      )}]`
    : `{"@type": "Person","name": "${escapeJsonLd(authorName)}"}`;

export default formatAuthorName;
