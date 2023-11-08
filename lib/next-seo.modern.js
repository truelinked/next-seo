import Head from 'next/head';
import React, { Component } from 'react';

function _extends() {
  _extends =
    Object.assign ||
    function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

  return _extends.apply(this, arguments);
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

const defaults = {
  templateTitle: '',
  noindex: false,
  nofollow: false,
  defaultOpenGraphImageWidth: 0,
  defaultOpenGraphImageHeight: 0,
  defaultOpenGraphVideoWidth: 0,
  defaultOpenGraphVideoHeight: 0,
};

const buildOpenGraphMediaTags = (
  mediaType,
  media = [],
  { defaultWidth, defaultHeight } = {},
) => {
  return media.reduce((tags, medium, index) => {
    tags.push(
      /*#__PURE__*/ React.createElement('meta', {
        key: `og:${mediaType}:0${index}`,
        property: `og:${mediaType}`,
        content: medium.url,
      }),
    );

    if (medium.alt) {
      tags.push(
        /*#__PURE__*/ React.createElement('meta', {
          key: `og:${mediaType}:alt0${index}`,
          property: `og:${mediaType}:alt`,
          content: medium.alt,
        }),
      );
    }

    if (medium.secureUrl) {
      tags.push(
        /*#__PURE__*/ React.createElement('meta', {
          key: `og:${mediaType}:secure_url0${index}`,
          property: `og:${mediaType}:secure_url`,
          content: medium.secureUrl.toString(),
        }),
      );
    }

    if (medium.type) {
      tags.push(
        /*#__PURE__*/ React.createElement('meta', {
          key: `og:${mediaType}:type0${index}`,
          property: `og:${mediaType}:type`,
          content: medium.type.toString(),
        }),
      );
    }

    if (medium.width) {
      tags.push(
        /*#__PURE__*/ React.createElement('meta', {
          key: `og:${mediaType}:width0${index}`,
          property: `og:${mediaType}:width`,
          content: medium.width.toString(),
        }),
      );
    } else if (defaultWidth) {
      tags.push(
        /*#__PURE__*/ React.createElement('meta', {
          key: `og:${mediaType}:width0${index}`,
          property: `og:${mediaType}:width`,
          content: defaultWidth.toString(),
        }),
      );
    }

    if (medium.height) {
      tags.push(
        /*#__PURE__*/ React.createElement('meta', {
          key: `og:${mediaType}:height${index}`,
          property: `og:${mediaType}:height`,
          content: medium.height.toString(),
        }),
      );
    } else if (defaultHeight) {
      tags.push(
        /*#__PURE__*/ React.createElement('meta', {
          key: `og:${mediaType}:height${index}`,
          property: `og:${mediaType}:height`,
          content: defaultHeight.toString(),
        }),
      );
    }

    return tags;
  }, []);
};

const buildTags = config => {
  var _config$openGraph, _config$openGraph3, _config$additionalLin;

  const tagsToRender = [];

  if (config.titleTemplate) {
    defaults.templateTitle = config.titleTemplate;
  }

  let updatedTitle = '';

  if (config.title) {
    updatedTitle = config.title;

    if (defaults.templateTitle) {
      updatedTitle = defaults.templateTitle.replace(/%s/g, () => updatedTitle);
    }
  } else if (config.defaultTitle) {
    updatedTitle = config.defaultTitle;
  }

  if (updatedTitle) {
    tagsToRender.push(
      /*#__PURE__*/ React.createElement(
        'title',
        {
          key: 'title',
        },
        updatedTitle,
      ),
    );
  }

  const noindex =
    config.noindex ||
    defaults.noindex ||
    config.dangerouslySetAllPagesToNoIndex;
  const nofollow =
    config.nofollow ||
    defaults.nofollow ||
    config.dangerouslySetAllPagesToNoFollow;
  let robotsParams = '';

  if (config.robotsProps) {
    const {
      nosnippet,
      maxSnippet,
      maxImagePreview,
      maxVideoPreview,
      noarchive,
      noimageindex,
      notranslate,
      unavailableAfter,
    } = config.robotsProps;
    robotsParams = `${nosnippet ? ',nosnippet' : ''}${
      maxSnippet ? `,max-snippet:${maxSnippet}` : ''
    }${maxImagePreview ? `,max-image-preview:${maxImagePreview}` : ''}${
      noarchive ? ',noarchive' : ''
    }${unavailableAfter ? `,unavailable_after:${unavailableAfter}` : ''}${
      noimageindex ? ',noimageindex' : ''
    }${maxVideoPreview ? `,max-video-preview:${maxVideoPreview}` : ''}${
      notranslate ? ',notranslate' : ''
    }`;
  }

  if (noindex || nofollow) {
    if (config.dangerouslySetAllPagesToNoIndex) {
      defaults.noindex = true;
    }

    if (config.dangerouslySetAllPagesToNoFollow) {
      defaults.nofollow = true;
    }

    tagsToRender.push(
      /*#__PURE__*/ React.createElement('meta', {
        key: 'robots',
        name: 'robots',
        content: `${noindex ? 'noindex' : 'index'},${
          nofollow ? 'nofollow' : 'follow'
        }${robotsParams}`,
      }),
    );
  } else {
    tagsToRender.push(
      /*#__PURE__*/ React.createElement('meta', {
        key: 'robots',
        name: 'robots',
        content: `index,follow${robotsParams}`,
      }),
    );
  }

  if (config.description) {
    tagsToRender.push(
      /*#__PURE__*/ React.createElement('meta', {
        key: 'description',
        name: 'description',
        content: config.description,
      }),
    );
  }

  if (config.mobileAlternate) {
    tagsToRender.push(
      /*#__PURE__*/ React.createElement('link', {
        rel: 'alternate',
        key: 'mobileAlternate',
        media: config.mobileAlternate.media,
        href: config.mobileAlternate.href,
      }),
    );
  }

  if (config.languageAlternates && config.languageAlternates.length > 0) {
    config.languageAlternates.forEach(languageAlternate => {
      tagsToRender.push(
        /*#__PURE__*/ React.createElement('link', {
          rel: 'alternate',
          key: `languageAlternate-${languageAlternate.hrefLang}`,
          hrefLang: languageAlternate.hrefLang,
          href: languageAlternate.href,
        }),
      );
    });
  }

  if (config.twitter) {
    if (config.twitter.cardType) {
      tagsToRender.push(
        /*#__PURE__*/ React.createElement('meta', {
          key: 'twitter:card',
          name: 'twitter:card',
          content: config.twitter.cardType,
        }),
      );
    }

    if (config.twitter.site) {
      tagsToRender.push(
        /*#__PURE__*/ React.createElement('meta', {
          key: 'twitter:site',
          name: 'twitter:site',
          content: config.twitter.site,
        }),
      );
    }

    if (config.twitter.handle) {
      tagsToRender.push(
        /*#__PURE__*/ React.createElement('meta', {
          key: 'twitter:creator',
          name: 'twitter:creator',
          content: config.twitter.handle,
        }),
      );
    }
  }

  if (config.facebook) {
    if (config.facebook.appId) {
      tagsToRender.push(
        /*#__PURE__*/ React.createElement('meta', {
          key: 'fb:app_id',
          property: 'fb:app_id',
          content: config.facebook.appId,
        }),
      );
    }
  }

  if (
    ((_config$openGraph = config.openGraph) != null &&
      _config$openGraph.title) ||
    updatedTitle
  ) {
    var _config$openGraph2;

    tagsToRender.push(
      /*#__PURE__*/ React.createElement('meta', {
        key: 'og:title',
        property: 'og:title',
        content:
          ((_config$openGraph2 = config.openGraph) == null
            ? void 0
            : _config$openGraph2.title) || updatedTitle,
      }),
    );
  }

  if (
    ((_config$openGraph3 = config.openGraph) != null &&
      _config$openGraph3.description) ||
    config.description
  ) {
    var _config$openGraph4;

    tagsToRender.push(
      /*#__PURE__*/ React.createElement('meta', {
        key: 'og:description',
        property: 'og:description',
        content:
          ((_config$openGraph4 = config.openGraph) == null
            ? void 0
            : _config$openGraph4.description) || config.description,
      }),
    );
  }

  if (config.openGraph) {
    if (config.openGraph.url || config.canonical) {
      tagsToRender.push(
        /*#__PURE__*/ React.createElement('meta', {
          key: 'og:url',
          property: 'og:url',
          content: config.openGraph.url || config.canonical,
        }),
      );
    }

    if (config.openGraph.type) {
      const type = config.openGraph.type.toLowerCase();
      tagsToRender.push(
        /*#__PURE__*/ React.createElement('meta', {
          key: 'og:type',
          property: 'og:type',
          content: type,
        }),
      );

      if (type === 'profile' && config.openGraph.profile) {
        if (config.openGraph.profile.firstName) {
          tagsToRender.push(
            /*#__PURE__*/ React.createElement('meta', {
              key: 'profile:first_name',
              property: 'profile:first_name',
              content: config.openGraph.profile.firstName,
            }),
          );
        }

        if (config.openGraph.profile.lastName) {
          tagsToRender.push(
            /*#__PURE__*/ React.createElement('meta', {
              key: 'profile:last_name',
              property: 'profile:last_name',
              content: config.openGraph.profile.lastName,
            }),
          );
        }

        if (config.openGraph.profile.username) {
          tagsToRender.push(
            /*#__PURE__*/ React.createElement('meta', {
              key: 'profile:username',
              property: 'profile:username',
              content: config.openGraph.profile.username,
            }),
          );
        }

        if (config.openGraph.profile.gender) {
          tagsToRender.push(
            /*#__PURE__*/ React.createElement('meta', {
              key: 'profile:gender',
              property: 'profile:gender',
              content: config.openGraph.profile.gender,
            }),
          );
        }
      } else if (type === 'book' && config.openGraph.book) {
        if (
          config.openGraph.book.authors &&
          config.openGraph.book.authors.length
        ) {
          config.openGraph.book.authors.forEach((author, index) => {
            tagsToRender.push(
              /*#__PURE__*/ React.createElement('meta', {
                key: `book:author:0${index}`,
                property: 'book:author',
                content: author,
              }),
            );
          });
        }

        if (config.openGraph.book.isbn) {
          tagsToRender.push(
            /*#__PURE__*/ React.createElement('meta', {
              key: 'book:isbn',
              property: 'book:isbn',
              content: config.openGraph.book.isbn,
            }),
          );
        }

        if (config.openGraph.book.releaseDate) {
          tagsToRender.push(
            /*#__PURE__*/ React.createElement('meta', {
              key: 'book:release_date',
              property: 'book:release_date',
              content: config.openGraph.book.releaseDate,
            }),
          );
        }

        if (config.openGraph.book.tags && config.openGraph.book.tags.length) {
          config.openGraph.book.tags.forEach((tag, index) => {
            tagsToRender.push(
              /*#__PURE__*/ React.createElement('meta', {
                key: `book:tag:0${index}`,
                property: 'book:tag',
                content: tag,
              }),
            );
          });
        }
      } else if (type === 'article' && config.openGraph.article) {
        if (config.openGraph.article.publishedTime) {
          tagsToRender.push(
            /*#__PURE__*/ React.createElement('meta', {
              key: 'article:published_time',
              property: 'article:published_time',
              content: config.openGraph.article.publishedTime,
            }),
          );
        }

        if (config.openGraph.article.modifiedTime) {
          tagsToRender.push(
            /*#__PURE__*/ React.createElement('meta', {
              key: 'article:modified_time',
              property: 'article:modified_time',
              content: config.openGraph.article.modifiedTime,
            }),
          );
        }

        if (config.openGraph.article.expirationTime) {
          tagsToRender.push(
            /*#__PURE__*/ React.createElement('meta', {
              key: 'article:expiration_time',
              property: 'article:expiration_time',
              content: config.openGraph.article.expirationTime,
            }),
          );
        }

        if (
          config.openGraph.article.authors &&
          config.openGraph.article.authors.length
        ) {
          config.openGraph.article.authors.forEach((author, index) => {
            tagsToRender.push(
              /*#__PURE__*/ React.createElement('meta', {
                key: `article:author:0${index}`,
                property: 'article:author',
                content: author,
              }),
            );
          });
        }

        if (config.openGraph.article.section) {
          tagsToRender.push(
            /*#__PURE__*/ React.createElement('meta', {
              key: 'article:section',
              property: 'article:section',
              content: config.openGraph.article.section,
            }),
          );
        }

        if (
          config.openGraph.article.tags &&
          config.openGraph.article.tags.length
        ) {
          config.openGraph.article.tags.forEach((tag, index) => {
            tagsToRender.push(
              /*#__PURE__*/ React.createElement('meta', {
                key: `article:tag:0${index}`,
                property: 'article:tag',
                content: tag,
              }),
            );
          });
        }
      } else if (
        (type === 'video.movie' ||
          type === 'video.episode' ||
          type === 'video.tv_show' ||
          type === 'video.other') &&
        config.openGraph.video
      ) {
        if (
          config.openGraph.video.actors &&
          config.openGraph.video.actors.length
        ) {
          config.openGraph.video.actors.forEach((actor, index) => {
            if (actor.profile) {
              tagsToRender.push(
                /*#__PURE__*/ React.createElement('meta', {
                  key: `video:actor:0${index}`,
                  property: 'video:actor',
                  content: actor.profile,
                }),
              );
            }

            if (actor.role) {
              tagsToRender.push(
                /*#__PURE__*/ React.createElement('meta', {
                  key: `video:actor:role:0${index}`,
                  property: 'video:actor:role',
                  content: actor.role,
                }),
              );
            }
          });
        }

        if (
          config.openGraph.video.directors &&
          config.openGraph.video.directors.length
        ) {
          config.openGraph.video.directors.forEach((director, index) => {
            tagsToRender.push(
              /*#__PURE__*/ React.createElement('meta', {
                key: `video:director:0${index}`,
                property: 'video:director',
                content: director,
              }),
            );
          });
        }

        if (
          config.openGraph.video.writers &&
          config.openGraph.video.writers.length
        ) {
          config.openGraph.video.writers.forEach((writer, index) => {
            tagsToRender.push(
              /*#__PURE__*/ React.createElement('meta', {
                key: `video:writer:0${index}`,
                property: 'video:writer',
                content: writer,
              }),
            );
          });
        }

        if (config.openGraph.video.duration) {
          tagsToRender.push(
            /*#__PURE__*/ React.createElement('meta', {
              key: 'video:duration',
              property: 'video:duration',
              content: config.openGraph.video.duration.toString(),
            }),
          );
        }

        if (config.openGraph.video.releaseDate) {
          tagsToRender.push(
            /*#__PURE__*/ React.createElement('meta', {
              key: 'video:release_date',
              property: 'video:release_date',
              content: config.openGraph.video.releaseDate,
            }),
          );
        }

        if (config.openGraph.video.tags && config.openGraph.video.tags.length) {
          config.openGraph.video.tags.forEach((tag, index) => {
            tagsToRender.push(
              /*#__PURE__*/ React.createElement('meta', {
                key: `video:tag:0${index}`,
                property: 'video:tag',
                content: tag,
              }),
            );
          });
        }

        if (config.openGraph.video.series) {
          tagsToRender.push(
            /*#__PURE__*/ React.createElement('meta', {
              key: 'video:series',
              property: 'video:series',
              content: config.openGraph.video.series,
            }),
          );
        }
      }
    } // images

    if (config.defaultOpenGraphImageWidth) {
      defaults.defaultOpenGraphImageWidth = config.defaultOpenGraphImageWidth;
    }

    if (config.defaultOpenGraphImageHeight) {
      defaults.defaultOpenGraphImageHeight = config.defaultOpenGraphImageHeight;
    }

    if (config.openGraph.images && config.openGraph.images.length) {
      tagsToRender.push(
        ...buildOpenGraphMediaTags('image', config.openGraph.images, {
          defaultWidth: defaults.defaultOpenGraphImageWidth,
          defaultHeight: defaults.defaultOpenGraphImageHeight,
        }),
      );
    } // videos

    if (config.defaultOpenGraphVideoWidth) {
      defaults.defaultOpenGraphVideoWidth = config.defaultOpenGraphVideoWidth;
    }

    if (config.defaultOpenGraphVideoHeight) {
      defaults.defaultOpenGraphVideoHeight = config.defaultOpenGraphVideoHeight;
    }

    if (config.openGraph.videos && config.openGraph.videos.length) {
      tagsToRender.push(
        ...buildOpenGraphMediaTags('video', config.openGraph.videos, {
          defaultWidth: defaults.defaultOpenGraphVideoWidth,
          defaultHeight: defaults.defaultOpenGraphVideoHeight,
        }),
      );
    }

    if (config.openGraph.locale) {
      tagsToRender.push(
        /*#__PURE__*/ React.createElement('meta', {
          key: 'og:locale',
          property: 'og:locale',
          content: config.openGraph.locale,
        }),
      );
    }

    if (config.openGraph.site_name) {
      tagsToRender.push(
        /*#__PURE__*/ React.createElement('meta', {
          key: 'og:site_name',
          property: 'og:site_name',
          content: config.openGraph.site_name,
        }),
      );
    }
  }

  if (config.canonical) {
    tagsToRender.push(
      /*#__PURE__*/ React.createElement('link', {
        rel: 'canonical',
        href: config.canonical,
        key: 'canonical',
      }),
    );
  }

  if (config.additionalMetaTags && config.additionalMetaTags.length > 0) {
    config.additionalMetaTags.forEach(tag => {
      var _ref, _ref2, _tag$keyOverride;

      tagsToRender.push(
        /*#__PURE__*/ React.createElement(
          'meta',
          _extends(
            {
              key: `meta:${
                (_ref =
                  (_ref2 =
                    (_tag$keyOverride = tag.keyOverride) != null
                      ? _tag$keyOverride
                      : tag.name) != null
                    ? _ref2
                    : tag.property) != null
                  ? _ref
                  : tag.httpEquiv
              }`,
            },
            tag,
          ),
        ),
      );
    });
  }

  if (
    (_config$additionalLin = config.additionalLinkTags) != null &&
    _config$additionalLin.length
  ) {
    config.additionalLinkTags.forEach(tag => {
      var _tag$keyOverride2;

      tagsToRender.push(
        /*#__PURE__*/ React.createElement(
          'link',
          _extends(
            {
              key: `link${
                (_tag$keyOverride2 = tag.keyOverride) != null
                  ? _tag$keyOverride2
                  : tag.href
              }${tag.rel}`,
            },
            tag,
          ),
        ),
      );
    });
  }

  return tagsToRender;
};

class DefaultSeo extends Component {
  render() {
    const {
      title,
      titleTemplate,
      defaultTitle,
      dangerouslySetAllPagesToNoIndex = false,
      dangerouslySetAllPagesToNoFollow = false,
      description,
      canonical,
      facebook,
      openGraph,
      additionalMetaTags,
      twitter,
      defaultOpenGraphImageWidth,
      defaultOpenGraphImageHeight,
      defaultOpenGraphVideoWidth,
      defaultOpenGraphVideoHeight,
      mobileAlternate,
      languageAlternates,
      additionalLinkTags,
      robotsProps,
    } = this.props;
    return /*#__PURE__*/ React.createElement(
      Head,
      null,
      buildTags({
        title,
        titleTemplate,
        defaultTitle,
        dangerouslySetAllPagesToNoIndex,
        dangerouslySetAllPagesToNoFollow,
        description,
        canonical,
        facebook,
        openGraph,
        additionalMetaTags,
        twitter,
        defaultOpenGraphImageWidth,
        defaultOpenGraphImageHeight,
        defaultOpenGraphVideoWidth,
        defaultOpenGraphVideoHeight,
        mobileAlternate,
        languageAlternates,
        additionalLinkTags,
        robotsProps,
      }),
    );
  }
}

class NextSeo extends Component {
  render() {
    const {
      title,
      noindex = false,
      nofollow,
      robotsProps,
      description,
      canonical,
      openGraph,
      facebook,
      twitter,
      additionalMetaTags,
      titleTemplate,
      defaultTitle,
      mobileAlternate,
      languageAlternates,
      additionalLinkTags,
    } = this.props;
    return /*#__PURE__*/ React.createElement(
      Head,
      null,
      buildTags({
        title,
        noindex,
        nofollow,
        robotsProps,
        description,
        canonical,
        facebook,
        openGraph,
        additionalMetaTags,
        twitter,
        titleTemplate,
        defaultTitle,
        mobileAlternate,
        languageAlternates,
        additionalLinkTags,
      }),
    );
  }
}

const toJson = (type, jsonld) => {
  const { id = undefined } = jsonld;

  const updated = _extends(
    {},
    id
      ? {
          '@id': jsonld.id,
        }
      : {},
    jsonld,
  );

  delete updated.id;
  return {
    __html: JSON.stringify(
      _extends(
        {
          '@context': 'https://schema.org',
          '@type': type,
        },
        updated,
      ),
      safeJsonLdReplacer,
    ),
  };
};

const ESCAPE_ENTITIES = Object.freeze({
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&apos;',
});
const ESCAPE_REGEX = new RegExp(
  `[${Object.keys(ESCAPE_ENTITIES).join('')}]`,
  'g',
);

const ESCAPE_REPLACER = t => ESCAPE_ENTITIES[t];
/**
 * A replacer for JSON.stringify to strip JSON-LD of illegal HTML entities
 * per https://www.w3.org/TR/json-ld11/#restrictions-for-contents-of-json-ld-script-elements
 */

const safeJsonLdReplacer = (() => {
  // Replace per https://www.w3.org/TR/json-ld11/#restrictions-for-contents-of-json-ld-script-elements
  // Solution from https://stackoverflow.com/a/5499821/864313
  return (_, value) => {
    switch (typeof value) {
      case 'object':
        // Omit null values.
        if (value === null) {
          return undefined;
        }

        return value;
      // JSON.stringify will recursively call replacer.

      case 'number':
      case 'boolean':
      case 'bigint':
        return value;
      // These values are not risky.

      case 'string':
        return value.replace(ESCAPE_REGEX, ESCAPE_REPLACER);

      default: {
        return undefined;
      }
    }
  };
})(); // Utility: Assert never

const _excluded = ['type', 'keyOverride', 'scriptKey', 'scriptId'];

function JsonLd(_ref) {
  let { type = 'Thing', keyOverride, scriptKey, scriptId = undefined } = _ref,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);

  return /*#__PURE__*/ React.createElement(
    Head,
    null,
    /*#__PURE__*/ React.createElement('script', {
      type: 'application/ld+json',
      id: scriptId,
      dangerouslySetInnerHTML: toJson(type, _extends({}, rest)),
      key: `jsonld-${scriptKey}${keyOverride ? `-${keyOverride}` : ''}`,
    }),
  );
}

/**
 * Include name and url
 * @param author
 * @returns
 */
function includeNameAndUrl(author) {
  return typeof author === 'object' && !!(author.name && author.url);
}
/**
 * Generate author information
 * @param author
 * @returns
 */

function generateAuthorInfo(author) {
  if (typeof author === 'string') {
    return {
      '@type': 'Person',
      name: author,
    };
  } else if (includeNameAndUrl(author)) {
    return {
      '@type': 'Person',
      name: author.name,
      url: author.url,
    };
  }

  return;
}

function setAuthor(author) {
  if (Array.isArray(author)) {
    return author.map(item => generateAuthorInfo(item)).filter(item => !!item);
  } else if (author) {
    return generateAuthorInfo(author);
  }

  return;
}

function setImage(image) {
  if (image) {
    return {
      '@type': 'ImageObject',
      url: image,
    };
  }

  return undefined;
}

function setPublisher(publisherName, publisherLogo) {
  if (!publisherName) {
    return undefined;
  }

  return {
    '@type': 'Organization',
    name: publisherName,
    logo: setImage(publisherLogo),
  };
}

function setReviewRating(rating) {
  if (rating) {
    return _extends({}, rating, {
      '@type': 'Rating',
    });
  }

  return undefined;
}

const _excluded$1 = ['reviewRating', 'author', 'publisher'];
function setReviews(reviews) {
  function mapReview(_ref) {
    let { reviewRating, author, publisher } = _ref,
      rest = _objectWithoutPropertiesLoose(_ref, _excluded$1);

    return _extends(
      {},
      rest,
      {
        '@type': 'Review',
      },
      author && {
        author: setAuthor(author),
      },
      reviewRating && {
        reviewRating: setReviewRating(reviewRating),
      },
      publisher && {
        publisher: setPublisher(publisher.name),
      },
    );
  }

  if (Array.isArray(reviews)) {
    return reviews.map(mapReview);
  } else if (reviews) {
    return mapReview(reviews);
  }

  return undefined;
}

function setNutrition(calories) {
  if (calories) {
    return {
      '@type': 'NutritionInformation',
      calories: `${calories} calories`,
    };
  }

  return undefined;
}

function setAggregateRating(aggregateRating) {
  if (aggregateRating) {
    return {
      '@type': 'AggregateRating',
      ratingCount: aggregateRating.ratingCount,
      reviewCount: aggregateRating.reviewCount,
      bestRating: aggregateRating.bestRating,
      ratingValue: aggregateRating.ratingValue,
    };
  }

  return undefined;
}

function setClip(clips) {
  function mapClip(clip) {
    return _extends({}, clip, {
      '@type': 'Clip',
    });
  }

  if (Array.isArray(clips)) {
    return clips.map(mapClip);
  } else if (clips) {
    return mapClip(clips);
  }

  return undefined;
}

function setInteractionStatistic(watchCount) {
  if (watchCount) {
    return {
      '@type': 'InteractionCounter',
      interactionType: 'https://schema.org/WatchAction',
      userInteractionCount: watchCount,
    };
  }

  return undefined;
}

function setBroadcastEvent(publication) {
  function mapBroadcastEvent(publication) {
    return _extends({}, publication, {
      '@type': 'BroadcastEvent',
    });
  }

  if (publication) {
    if (Array.isArray(publication)) {
      return publication.map(mapBroadcastEvent);
    }

    return mapBroadcastEvent(publication);
  }

  return undefined;
}

const _excluded$2 = ['thumbnailUrls', 'hasPart', 'watchCount', 'publication'];
function setVideo(video, setContext = false) {
  function mapVideo(_ref, context) {
    let { thumbnailUrls, hasPart, watchCount, publication } = _ref,
      rest = _objectWithoutPropertiesLoose(_ref, _excluded$2);

    return _extends(
      {},
      rest,
      {
        '@type': 'VideoObject',
      },
      context && {
        '@context': 'https://schema.org',
      },
      {
        thumbnailUrl: thumbnailUrls,
        hasPart: setClip(hasPart),
        interactionStatistic: setInteractionStatistic(watchCount),
        publication: setBroadcastEvent(publication),
      },
    );
  }

  if (video) {
    return mapVideo(video, setContext);
  }

  return undefined;
}

function setInstruction(instruction) {
  if (instruction) {
    return _extends({}, instruction, {
      '@type': 'HowToStep',
    });
  }

  return undefined;
}

const _excluded$3 = [
  'authorName',
  'images',
  'yields',
  'category',
  'calories',
  'aggregateRating',
  'video',
  'ingredients',
  'instructions',
  'cuisine',
];

function CarouselJsonLd({ type = 'Carousel', keyOverride, ofType, data }) {
  function generateList(data, ofType) {
    switch (ofType) {
      case 'default':
        return data.map((item, index) => ({
          '@type': 'ListItem',
          position: `${index + 1}`,
          url: item.url,
        }));

      case 'course':
        return data.map((item, index) => ({
          '@type': 'ListItem',
          position: `${index + 1}`,
          item: {
            '@context': 'https://schema.org',
            '@type': 'Course',
            url: item.url,
            name: item.courseName,
            description: item.description,
            provider: {
              '@type': 'Organization',
              name: item.providerName,
              sameAs: item.providerUrl,
            },
          },
        }));

      case 'movie':
        return data.map((item, index) => ({
          '@type': 'ListItem',
          position: `${index + 1}`,
          item: {
            '@context': 'https://schema.org',
            '@type': 'Movie',
            name: item.name,
            url: item.url,
            image: item.image,
            dateCreated: item.dateCreated,
            director: item.director
              ? Array.isArray(item.director)
                ? item.director.map(director => ({
                    '@type': 'Person',
                    name: director.name,
                  }))
                : {
                    '@type': 'Person',
                    name: item.director.name,
                  }
              : undefined,
            review: setReviews(item.review),
          },
        }));

      case 'recipe':
        return data.map((_ref, index) => {
          let {
              authorName,
              images,
              yields,
              category,
              calories,
              aggregateRating,
              video,
              ingredients,
              instructions,
              cuisine,
            } = _ref,
            rest = _objectWithoutPropertiesLoose(_ref, _excluded$3);

          return {
            '@type': 'ListItem',
            position: `${index + 1}`,
            item: _extends(
              {
                '@context': 'https://schema.org',
                '@type': 'Recipe',
              },
              rest,
              {
                author: setAuthor(authorName),
                image: images,
                recipeYield: yields,
                recipeCategory: category,
                recipeCuisine: cuisine,
                nutrition: setNutrition(calories),
                aggregateRating: setAggregateRating(aggregateRating),
                video: setVideo(video),
                recipeIngredient: ingredients,
                recipeInstructions: instructions.map(setInstruction),
              },
            ),
          };
        });
    }
  }

  const d = {
    '@type': 'ItemList',
    itemListElement: generateList(data, ofType),
  };
  return /*#__PURE__*/ React.createElement(
    JsonLd,
    _extends(
      {
        type: type,
        keyOverride: keyOverride,
      },
      d,
      {
        scriptKey: 'Carousel',
      },
    ),
  );
}

const _excluded$4 = [
  'type',
  'keyOverride',
  'url',
  'title',
  'images',
  'section',
  'dateCreated',
  'datePublished',
  'dateModified',
  'authorName',
  'publisherName',
  'publisherLogo',
  'body',
];

function NewsArticleJsonLd(_ref) {
  let {
      type = 'NewsArticle',
      keyOverride,
      url,
      title,
      images,
      section,
      dateCreated,
      datePublished,
      dateModified,
      authorName,
      publisherName,
      publisherLogo,
      body,
    } = _ref,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded$4);

  const data = _extends({}, rest, {
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    headline: title,
    image: images,
    articleSection: section,
    dateCreated: dateCreated || datePublished,
    datePublished: datePublished,
    dateModified: dateModified || datePublished,
    author: setAuthor(authorName),
    publisher: setPublisher(publisherName, publisherLogo),
    articleBody: body,
  });

  return /*#__PURE__*/ React.createElement(
    JsonLd,
    _extends(
      {
        type: type,
        keyOverride: keyOverride,
      },
      data,
      {
        scriptKey: 'NewsArticle',
      },
    ),
  );
}

const _excluded$5 = [
  'type',
  'keyOverride',
  'baseSalary',
  'hiringOrganization',
  'applicantLocationRequirements',
  'jobLocation',
];

function JobPostingJsonLd(_ref) {
  let {
      type = 'JobPosting',
      keyOverride,
      baseSalary,
      hiringOrganization,
      applicantLocationRequirements,
      jobLocation,
    } = _ref,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded$5);

  function setBaseSalary(baseSalary) {
    if (baseSalary) {
      return {
        '@type': 'MonetaryAmount',
        currency: baseSalary.currency,
        value: _extends(
          {
            '@type': 'QuantitativeValue',
            unitText: baseSalary.unitText,
          },
          Array.isArray(baseSalary.value)
            ? {
                minValue: baseSalary.value[0],
                maxValue: baseSalary.value[1],
              }
            : {
                value: baseSalary.value,
              },
        ),
      };
    }

    return undefined;
  }

  function setHiringOrganization(org) {
    return {
      '@type': 'Organization',
      name: org.name,
      sameAs: org.sameAs,
      logo: org.logo,
    };
  }

  function setJobLocation(location) {
    if (location) {
      return {
        '@type': 'Place',
        address: {
          '@type': 'PostalAddress',
          addressCountry: location.addressCountry,
          addressLocality: location.addressLocality,
          addressRegion: location.addressRegion,
          postalCode: location.postalCode,
          streetAddress: location.streetAddress,
        },
      };
    }

    return undefined;
  }

  function setApplicantLocationRequirements(requirements) {
    if (requirements) {
      return {
        '@type': 'Country',
        name: requirements,
      };
    }

    return undefined;
  }

  const data = _extends({}, rest, {
    baseSalary: setBaseSalary(baseSalary),
    hiringOrganization: setHiringOrganization(hiringOrganization),
    jobLocation: setJobLocation(jobLocation),
    applicantLocationRequirements: setApplicantLocationRequirements(
      applicantLocationRequirements,
    ),
  });

  return /*#__PURE__*/ React.createElement(
    JsonLd,
    _extends(
      {
        type: type,
        keyOverride: keyOverride,
      },
      data,
      {
        scriptKey: 'JobPosting',
      },
    ),
  );
}

function setAddress(address) {
  if (address) {
    return _extends(
      {
        '@type': 'PostalAddress',
      },
      address,
    );
  }

  return undefined;
}

function setGeo(geo) {
  if (geo) {
    return _extends({}, geo, {
      '@type': 'GeoCoordinates',
    });
  }

  return undefined;
}

function setAction(action) {
  if (action) {
    return {
      '@type': action.actionType,
      name: action.actionName,
      target: action.target,
    };
  }

  return undefined;
}

function setGeoCircle(geoCircle) {
  if (geoCircle) {
    return {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: geoCircle.geoMidpoint.latitude,
        longitude: geoCircle.geoMidpoint.longitude,
      },
      geoRadius: geoCircle.geoRadius,
    };
  }

  return undefined;
}

function setOffer(offer) {
  function setPriceSpecification(priceSpecification) {
    if (priceSpecification) {
      return {
        '@type': priceSpecification.type,
        priceCurrency: priceSpecification.priceCurrency,
        price: priceSpecification.price,
      };
    }

    return undefined;
  }

  function setItemOffered(itemOffered) {
    if (itemOffered) {
      return _extends({}, itemOffered, {
        '@type': 'Service',
      });
    }

    return undefined;
  }

  if (offer) {
    return _extends({}, offer, {
      '@type': 'Offer',
      priceSpecification: setPriceSpecification(offer.priceSpecification),
      itemOffered: setItemOffered(offer.itemOffered),
    });
  }

  return undefined;
}

function setOpeningHours(openingHours) {
  if (openingHours) {
    return _extends({}, openingHours, {
      '@type': 'OpeningHoursSpecification',
    });
  }

  return undefined;
}

const _excluded$6 = [
  'type',
  'keyOverride',
  'address',
  'geo',
  'rating',
  'review',
  'action',
  'areaServed',
  'makesOffer',
  'openingHours',
  'images',
];

function LocalBusinessJsonLd(_ref) {
  let {
      type = 'LocalBusiness',
      keyOverride,
      address,
      geo,
      rating,
      review,
      action,
      areaServed,
      makesOffer,
      openingHours,
      images,
    } = _ref,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded$6);

  const data = _extends({}, rest, {
    image: images,
    address: setAddress(address),
    geo: setGeo(geo),
    aggregateRating: setAggregateRating(rating),
    review: setReviews(review),
    potentialAction: setAction(action),
    areaServed: areaServed && areaServed.map(setGeoCircle),
    makesOffer: makesOffer == null ? void 0 : makesOffer.map(setOffer),
    openingHoursSpecification: Array.isArray(openingHours)
      ? openingHours.map(setOpeningHours)
      : setOpeningHours(openingHours),
  });

  return /*#__PURE__*/ React.createElement(
    JsonLd,
    _extends(
      {
        type: type,
        keyOverride: keyOverride,
      },
      data,
      {
        scriptKey: 'LocalBusiness',
      },
    ),
  );
}

const _excluded$7 = ['type', 'keyOverride', 'mainEntity'],
  _excluded2 = ['upvoteCount'];

function QAPageJsonLd(_ref) {
  var _mainEntity$author, _mainEntity$acceptedA, _mainEntity$acceptedA2;

  let { type = 'QAPage', keyOverride, mainEntity } = _ref,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded$7);

  const data = _extends({}, rest, {
    mainEntity: _extends(
      {},
      mainEntity,
      {
        '@type': 'Question',
        author: setAuthor(
          (_mainEntity$author = mainEntity.author) == null
            ? void 0
            : _mainEntity$author.name,
        ),
      },
      mainEntity.acceptedAnswer && {
        acceptedAnswer: _extends({}, mainEntity.acceptedAnswer, {
          '@type': 'Answer',
          author: setAuthor(
            (_mainEntity$acceptedA = mainEntity.acceptedAnswer) == null
              ? void 0
              : (_mainEntity$acceptedA2 = _mainEntity$acceptedA.author) == null
              ? void 0
              : _mainEntity$acceptedA2.name,
          ),
        }),
      },
      mainEntity.suggestedAnswer && {
        suggestedAnswer: mainEntity.suggestedAnswer.map(_ref2 => {
          var _rest$author;

          let { upvoteCount } = _ref2,
            rest = _objectWithoutPropertiesLoose(_ref2, _excluded2);

          return _extends({}, rest, {
            '@type': 'Answer',
            upvoteCount: upvoteCount || 0,
            author: setAuthor(
              (_rest$author = rest.author) == null ? void 0 : _rest$author.name,
            ),
          });
        }),
      },
    ),
  });

  return /*#__PURE__*/ React.createElement(
    JsonLd,
    _extends(
      {
        type: type,
        keyOverride: keyOverride,
      },
      data,
      {
        scriptKey: 'QAPage',
      },
    ),
  );
}

function setItemListElements(items) {
  if (items && items.length) {
    return items.map(item => ({
      '@type': 'ListItem',
      position: item.position,
      item: {
        '@id': item.item,
        name: item.name,
      },
    }));
  }

  return undefined;
}
function setItemListBreadCrumbsElements(items) {
  if (items && items.length) {
    return items.map(item => ({
      '@type': 'ListItem',
      position: item.position,
      item: item.item,
      name: item.name,
    }));
  }

  return undefined;
}

const _excluded$8 = ['type', 'keyOverride', 'breadcrumb'];

function ProfilePageJsonLd(_ref) {
  let { type = 'ProfilePage', keyOverride, breadcrumb } = _ref,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded$8);

  const data = _extends({}, rest, {
    breadcrumb: Array.isArray(breadcrumb)
      ? {
          '@type': 'BreadcrumbList',
          itemListElement: setItemListElements(breadcrumb),
        }
      : breadcrumb,
  });

  return /*#__PURE__*/ React.createElement(
    JsonLd,
    _extends(
      {
        type: type,
        keyOverride: keyOverride,
      },
      data,
      {
        scriptKey: 'ProfilePage',
      },
    ),
  );
}

const _excluded$9 = ['type', 'keyOverride', 'potentialActions'];

function SiteLinksSearchBoxJsonLd(_ref) {
  let { type = 'WebSite', keyOverride, potentialActions } = _ref,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded$9);

  function setPotentialAction(action) {
    if (action) {
      const { target, queryInput } = action;
      return {
        '@type': 'SearchAction',
        target: `${target}={${queryInput}}`,
        'query-input': `required name=${queryInput}`,
      };
    }

    return undefined;
  }

  const data = _extends({}, rest, {
    potentialAction: potentialActions.map(setPotentialAction),
  });

  return /*#__PURE__*/ React.createElement(
    JsonLd,
    _extends(
      {
        type: type,
        keyOverride: keyOverride,
      },
      data,
      {
        scriptKey: 'jsonld-siteLinksSearchBox',
      },
    ),
  );
}

const _excluded$a = [
  'type',
  'keyOverride',
  'authorName',
  'images',
  'yields',
  'category',
  'cuisine',
  'calories',
  'aggregateRating',
  'video',
  'ingredients',
  'instructions',
];

function RecipeJsonLd(_ref) {
  let {
      type = 'Recipe',
      keyOverride,
      authorName,
      images,
      yields,
      category,
      cuisine,
      calories,
      aggregateRating,
      video,
      ingredients,
      instructions,
    } = _ref,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded$a);

  const data = _extends({}, rest, {
    author: setAuthor(authorName),
    image: images,
    recipeYield: yields,
    recipeCategory: category,
    recipeCuisine: cuisine,
    nutrition: setNutrition(calories),
    aggregateRating: setAggregateRating(aggregateRating),
    video: setVideo(video),
    recipeIngredient: ingredients,
    recipeInstructions: instructions.map(setInstruction),
  });

  return /*#__PURE__*/ React.createElement(
    JsonLd,
    _extends(
      {
        type: type,
        keyOverride: keyOverride,
      },
      data,
      {
        scriptKey: 'recipe',
      },
    ),
  );
}

var buildAddress = address => `
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "${address.streetAddress}",
    "addressLocality": "${address.addressLocality}",
    ${
      address.addressRegion
        ? `"addressRegion": "${address.addressRegion}",`
        : ''
    }
    "postalCode": "${address.postalCode}",
    "addressCountry": "${address.addressCountry}"
  }
`;

const markup = jsonld => ({
  __html: jsonld,
});

var formatIfArray = function formatIfArray(value) {
  return Array.isArray(value)
    ? '[' +
        value.map(function (val) {
          return '"' + val + '"';
        }) +
        ']'
    : '"' + value + '"';
};

var buildOffers = function buildOffers(offers) {
  return (
    '\n  {\n    "@type": "Offer",\n    "priceCurrency": "' +
    offers.priceCurrency +
    '",\n    ' +
    (offers.priceValidUntil
      ? '"priceValidUntil": "' + offers.priceValidUntil + '",'
      : '') +
    '\n    ' +
    (offers.itemCondition
      ? '"itemCondition": "' + offers.itemCondition + '",'
      : '') +
    '\n    ' +
    (offers.availability
      ? '"availability": "' + offers.availability + '",'
      : '') +
    '\n    ' +
    (offers.url ? '"url": "' + offers.url + '",' : '') +
    '\n    ' +
    (offers.seller
      ? '\n      "seller": {\n      "@type": "Organization",\n      "name": "' +
        offers.seller.name +
        '"\n    },\n    '
      : '') +
    '\n    "price": "' +
    offers.price +
    '"\n  }\n'
  );
};

var buildAggregateOffer = function buildAggregateOffer(offer) {
  return (
    '\n  {\n    "@type": "AggregateOffer",\n    "priceCurrency": "' +
    offer.priceCurrency +
    '",\n    ' +
    (offer.highPrice ? '"highPrice": "' + offer.highPrice + '",' : '') +
    '\n    ' +
    (offer.offerCount ? '"offerCount": "' + offer.offerCount + '",' : '') +
    '\n    "lowPrice": "' +
    offer.lowPrice +
    '"\n  }\n'
  );
};

const buildLocation = location => `
  "location": {
    ${location.type ? `"@type": "${location.type}",` : ``}
    ${location.address ? `${buildAddress(location.address)},` : ``}   
    ${location.url ? `"url": "${location.url}",` : ``}
    ${location.sameAs ? `"sameAs": "${location.sameAs}"` : ``}
    ${location.name ? `"name": "${location.name}"` : ``}
  }
`;

const buildPerformer = performer => `
  {    
    "name": "${performer.name}",
    "performer": {
      "@type": "Person",
      "name": "${performer.name}"
    }
  }
`;

const buildWorksPerformed = work => `
  {    
    "@type":"CreativeWork",
    "name": "${work.name}",
    "creator":{
       "@type":"Person",
       "name":"${work.name}"
    }
  }
`;

const buildComposer = composer => `
  {
    "@type": "Person",
    "name": "${composer.name}"
  }
`;

const buildOrganization = organizer => `
  {
    "@type": "Organization",
    "name": "${organizer.name}"
    ${organizer.url ? `,` : ``}
    ${organizer.url ? `"url": "${encodeURI(organizer.url)}"` : ``}
  }
`;

const EventJsonLd = ({
  keyOverride,
  name,
  startDate,
  endDate,
  location,
  images,
  offers,
  aggregateOffer,
  performers,
  eventType,
  eventStatus,
  eventAttendanceMode,
  composers,
  organizers,
  works,
  url,
  description,
}) => {
  const jslonld = `{
    "@context": "https://schema.org",
    "@type": "${eventType ? eventType : 'Event'}",
    ${eventStatus ? `"eventStatus":"${eventStatus}",` : ``}
    ${
      eventAttendanceMode
        ? `"eventAttendanceMode":"${eventAttendanceMode}",`
        : ``
    }
    "startDate": "${startDate}",
    "endDate": "${endDate}",
    ${location ? `${buildLocation(location)},` : ``}
    ${images ? `"image":${formatIfArray(images)},` : ``}
    ${url ? `"url": "${url}",` : ``}
    ${description ? `"description": "${description}",` : ``}
    
    ${
      offers
        ? `"offers": ${
            Array.isArray(offers)
              ? `[${offers.map(offer => `${buildOffers(offer)}`)}]`
              : buildOffers(offers)
          },`
        : ''
    }
    ${
      aggregateOffer && !offers
        ? `"offers": ${buildAggregateOffer(aggregateOffer)},`
        : ''
    }
    ${
      works
        ? `"workPerformed": ${
            Array.isArray(works)
              ? `[${works.map(work => `${buildWorksPerformed(work)}`)}]`
              : buildWorksPerformed(works)
          },`
        : ''
    }
    ${
      composers
        ? `"composer": ${
            Array.isArray(composers)
              ? `[${composers.map(composer => `${buildComposer(composer)}`)}]`
              : buildComposer(composers)
          },`
        : ''
    }
    ${
      organizers
        ? `"organizer": ${
            Array.isArray(organizers)
              ? `[${organizers.map(
                  organizer => `${buildOrganization(organizer)}`,
                )}]`
              : buildOrganization(organizers)
          },`
        : ''
    }
    ${
      performers
        ? `"performer": ${
            Array.isArray(performers)
              ? `[${performers.map(
                  performer => `${buildPerformer(performer)}`,
                )}]`
              : buildPerformer(performers)
          },`
        : ''
    }
    "name": "${name}"
  }`;
  return /*#__PURE__*/ React.createElement(
    Head,
    null,
    /*#__PURE__*/ React.createElement('script', {
      type: 'application/ld+json',
      dangerouslySetInnerHTML: markup(jslonld.replace(/(^[ \t]*\n)/gm, '')),
      key: `jsonld-video${keyOverride ? `-${keyOverride}` : ''}`,
    }),
  );
};

function setContactPoint(contactPoint) {
  if (contactPoint) {
    return _extends({}, contactPoint, {
      '@type': 'ContactPoint',
    });
  }

  return undefined;
}

const _excluded$b = ['type', 'keyOverride', 'contactPoint'];

function CorporateContactJsonLd(_ref) {
  let { type = 'Organization', keyOverride, contactPoint } = _ref,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded$b);

  const data = _extends({}, rest, {
    contactPoint: contactPoint.map(setContactPoint),
  });

  return /*#__PURE__*/ React.createElement(
    JsonLd,
    _extends(
      {
        type: type,
        keyOverride: keyOverride,
      },
      data,
      {
        scriptKey: 'CorporateContact',
      },
    ),
  );
}

function setCreativeWork(creativeWork) {
  if (creativeWork) {
    return _extends({}, creativeWork, {
      '@type': 'CreativeWork',
    });
  }

  return undefined;
}

const _excluded$c = ['type', 'keyOverride', 'hasPart'];

function CollectionPageJsonLd(_ref) {
  let { type = 'CollectionPage', keyOverride, hasPart } = _ref,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded$c);

  const data = _extends({}, rest, {
    hasPart: hasPart.map(setCreativeWork),
  });

  return /*#__PURE__*/ React.createElement(
    JsonLd,
    _extends(
      {
        type: type,
        keyOverride: keyOverride,
      },
      data,
      {
        scriptKey: 'CollectionPage',
      },
    ),
  );
}

const _excluded$d = ['seller'];
function setOffers(offers) {
  function mapOffer(_ref) {
    let { seller } = _ref,
      rest = _objectWithoutPropertiesLoose(_ref, _excluded$d);

    return _extends(
      {},
      rest,
      {
        '@type': 'Offer',
      },
      seller && {
        seller: {
          '@type': 'Organization',
          name: seller.name,
        },
      },
    );
  }

  if (Array.isArray(offers)) {
    return offers.map(mapOffer);
  } else if (offers) {
    return mapOffer(offers);
  }

  return undefined;
}

function setAggregateOffer(aggregateOffer) {
  if (aggregateOffer) {
    return {
      '@type': 'AggregateOffer',
      priceCurrency: aggregateOffer.priceCurrency,
      highPrice: aggregateOffer.highPrice,
      lowPrice: aggregateOffer.lowPrice,
      offerCount: aggregateOffer.offerCount,
      offers: setOffers(aggregateOffer.offers),
    };
  }

  return undefined;
}

function setManufacturer(manufacturer) {
  if (
    manufacturer &&
    (manufacturer.manufacturerName || manufacturer.manufacturerLogo)
  ) {
    return {
      '@type': 'Organization',
      name: manufacturer.manufacturerName,
      logo: setImage(manufacturer.manufacturerLogo),
    };
  }

  return undefined;
}

function setBrand(brand) {
  if (brand) {
    return {
      '@type': 'Brand',
      name: brand,
    };
  }

  return undefined;
}

const _excluded$e = [
  'type',
  'keyOverride',
  'images',
  'brand',
  'reviews',
  'aggregateRating',
  'manufacturerLogo',
  'manufacturerName',
  'offers',
  'aggregateOffer',
  'productName',
];

function ProductJsonLd(_ref) {
  let {
      type = 'Product',
      keyOverride,
      images,
      brand,
      reviews,
      aggregateRating,
      manufacturerLogo,
      manufacturerName,
      offers,
      aggregateOffer,
      productName,
    } = _ref,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded$e);

  const data = _extends({}, rest, {
    image: images,
    brand: setBrand(brand),
    review: setReviews(reviews),
    aggregateRating: setAggregateRating(aggregateRating),
    manufacturer: setManufacturer({
      manufacturerLogo,
      manufacturerName,
    }),
    offers: offers ? setOffers(offers) : setAggregateOffer(aggregateOffer),
    name: productName,
  });

  return /*#__PURE__*/ React.createElement(
    JsonLd,
    _extends(
      {
        type: type,
        keyOverride: keyOverride,
      },
      data,
      {
        scriptKey: 'Product',
      },
    ),
  );
}

const _excluded$f = [
  'type',
  'keyOverride',
  'priceCurrency',
  'price',
  'aggregateRating',
  'review',
];

function SoftwareAppJsonLd(_ref) {
  let {
      type = 'SoftwareApplication',
      keyOverride,
      priceCurrency,
      price,
      aggregateRating,
      review,
    } = _ref,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded$f);

  const data = _extends({}, rest, {
    offers: {
      '@type': 'Offer',
      price,
      priceCurrency: priceCurrency,
    },
    aggregateRating: setAggregateRating(aggregateRating),
    review: setReviews(review),
  });

  return /*#__PURE__*/ React.createElement(
    JsonLd,
    _extends(
      {
        type: type,
        keyOverride: keyOverride,
      },
      data,
      {
        scriptKey: 'SoftwareApp',
      },
    ),
  );
}

const _excluded$g = ['type', 'keyOverride'];

function VideoJsonLd(_ref) {
  let { type = 'Video', keyOverride } = _ref,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded$g);

  const data = setVideo(rest, true);
  return /*#__PURE__*/ React.createElement(
    JsonLd,
    _extends(
      {
        type: type,
        keyOverride: keyOverride,
      },
      data,
      {
        scriptKey: 'Video',
      },
    ),
  );
}

function setProducer(producer) {
  if (producer) {
    return {
      '@type': 'Organization',
      sameAs: producer.url,
      name: producer.name,
    };
  }

  return undefined;
}

function setProvider(provider) {
  if (provider) {
    return {
      '@type': provider.type || 'Organization',
      name: provider.name,
      sameAs: provider.url,
    };
  }

  return undefined;
}

const _excluded$h = [
  'type',
  'keyOverride',
  'aggregateRating',
  'trailer',
  'reviews',
  'image',
  'authorName',
  'provider',
  'producerName',
  'producerUrl',
  'offers',
  'operatingSystemName',
  'platformName',
  'translatorName',
  'languageName',
  'genreName',
  'publisherName',
];

function VideoGameJsonLd(_ref) {
  let {
      type = 'VideoGame',
      keyOverride,
      aggregateRating,
      trailer,
      reviews,
      image,
      authorName,
      provider,
      producerName,
      producerUrl,
      offers,
      operatingSystemName,
      platformName,
      translatorName,
      languageName,
      genreName,
      publisherName,
    } = _ref,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded$h);

  const data = _extends({}, rest, {
    aggregateRating: setAggregateRating(aggregateRating),
    trailer: setVideo(trailer),
    review: setReviews(reviews),
    image: setImage(image),
    author: setAuthor(authorName),
    provider: setProvider(provider),
    producer: setProducer({
      name: producerName,
      url: producerUrl,
    }),
    offers: setOffers(offers),
    operatingSystem: operatingSystemName,
    gamePlatform: platformName,
    translator: translatorName,
    inLanguage: languageName,
    genre: genreName,
    publisher: publisherName,
  });

  return /*#__PURE__*/ React.createElement(
    JsonLd,
    _extends(
      {
        type: type,
        keyOverride: keyOverride,
      },
      data,
      {
        scriptKey: 'VideoGame',
      },
    ),
  );
}

function setContactPoints(contactPoint) {
  if (contactPoint && contactPoint.length) {
    return contactPoint.map(contactPoint =>
      _extends(
        {
          '@type': 'ContactPoint',
        },
        contactPoint,
      ),
    );
  }

  return undefined;
}

const _excluded$i = ['type', 'keyOverride', 'address', 'contactPoints'];

function OrganizationJsonLd(_ref) {
  let { type = 'Organization', keyOverride, address, contactPoints } = _ref,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded$i);

  const data = _extends({}, rest, {
    address: setAddress(address),
    contactPoints: setContactPoints(contactPoints),
  });

  return /*#__PURE__*/ React.createElement(
    JsonLd,
    _extends(
      {
        type: type,
        keyOverride: keyOverride,
      },
      data,
      {
        scriptKey: 'organization',
      },
    ),
  );
}

function setQuestions(questions) {
  if (questions && questions.length) {
    return questions.map(question => ({
      '@type': 'Question',
      name: question.questionName,
      acceptedAnswer: {
        '@type': 'Answer',
        text: question.acceptedAnswerText,
      },
    }));
  }

  return undefined;
}

const _excluded$j = ['type', 'keyOverride', 'mainEntity'];

function FAQPageJsonLd(_ref) {
  let { type = 'FAQPage', keyOverride, mainEntity } = _ref,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded$j);

  const data = _extends({}, rest, {
    mainEntity: setQuestions(mainEntity),
  });

  return /*#__PURE__*/ React.createElement(
    JsonLd,
    _extends(
      {
        type: type,
        keyOverride: keyOverride,
      },
      data,
      {
        scriptKey: 'faq-page',
      },
    ),
  );
}

const _excluded$k = ['type', 'keyOverride'];

function LogoJsonLd(_ref) {
  let { type = 'Organization', keyOverride } = _ref,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded$k);

  return /*#__PURE__*/ React.createElement(
    JsonLd,
    _extends(
      {
        type: type,
        keyOverride: keyOverride,
      },
      rest,
      {
        scriptKey: 'Logo',
      },
    ),
  );
}

const _excluded$l = ['type', 'keyOverride'];

function DatasetJsonLd(_ref) {
  let { type = 'Dataset', keyOverride } = _ref,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded$l);

  return /*#__PURE__*/ React.createElement(
    JsonLd,
    _extends(
      {
        type: type,
        keyOverride: keyOverride,
      },
      rest,
      {
        scriptKey: 'dataset',
      },
    ),
  );
}

const _excluded$m = ['type', 'keyOverride', 'courseName', 'provider'];

function CourseJsonLd(_ref) {
  let { type = 'Course', keyOverride, courseName, provider } = _ref,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded$m);

  const data = _extends(
    {
      name: courseName,
    },
    rest,
    {
      provider: setProvider(provider),
    },
  );

  return /*#__PURE__*/ React.createElement(
    JsonLd,
    _extends(
      {
        type: type,
        keyOverride: keyOverride,
      },
      data,
      {
        scriptKey: 'course',
      },
    ),
  );
}

function BreadCrumbJsonLd({
  type = 'BreadcrumbList',
  keyOverride,
  itemListElements,
}) {
  const data = {
    itemListElement: setItemListBreadCrumbsElements(itemListElements),
  };
  return /*#__PURE__*/ React.createElement(
    JsonLd,
    _extends(
      {
        type: type,
        keyOverride: keyOverride,
      },
      data,
      {
        scriptKey: 'breadcrumb',
      },
    ),
  );
}

const _excluded$n = ['type', 'id', 'keyOverride', 'aggregateRating'];

function BrandJsonLd(_ref) {
  let { type = 'Brand', id, keyOverride, aggregateRating } = _ref,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded$n);

  const data = _extends(
    {
      aggregateRating: setAggregateRating(aggregateRating),
      '@id': id,
    },
    rest,
  );

  return /*#__PURE__*/ React.createElement(
    JsonLd,
    _extends(
      {
        type: type,
        keyOverride: keyOverride,
      },
      data,
      {
        scriptKey: 'brand',
      },
    ),
  );
}

function ArticleJsonLd({
  type = 'Article',
  keyOverride,
  url,
  title,
  images,
  datePublished,
  dateModified,
  authorName,
  publisherName = undefined,
  publisherLogo = undefined,
  description,
}) {
  const data = {
    datePublished,
    description,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    headline: title,
    image: images,
    dateModified: dateModified || datePublished,
    author: setAuthor(authorName),
    publisher: setPublisher(publisherName, publisherLogo),
  };
  return /*#__PURE__*/ React.createElement(
    JsonLd,
    _extends(
      {
        type: type,
        keyOverride: keyOverride,
      },
      data,
      {
        scriptKey: 'article',
      },
    ),
  );
}

function setReviewedBy(reviewedBy) {
  if (reviewedBy) {
    return _extends(
      {
        '@type':
          (reviewedBy == null ? void 0 : reviewedBy.type) || 'Organization',
      },
      reviewedBy,
    );
  }

  return undefined;
}

const _excluded$o = ['keyOverride', 'reviewedBy'];

function WebPageJsonLd(_ref) {
  let { keyOverride, reviewedBy } = _ref,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded$o);

  const data = _extends({}, rest, {
    reviewedBy: setReviewedBy(reviewedBy),
  });

  return /*#__PURE__*/ React.createElement(
    JsonLd,
    _extends(
      {
        keyOverride: keyOverride,
      },
      data,
      {
        type: 'WebPage',
        scriptKey: 'WebPage',
      },
    ),
  );
}

const _excluded$p = ['type', 'keyOverride'];

function SocialProfileJsonLd(_ref) {
  let { type, keyOverride } = _ref,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded$p);

  return /*#__PURE__*/ React.createElement(
    JsonLd,
    _extends(
      {
        type: type,
        keyOverride: keyOverride,
      },
      rest,
      {
        scriptKey: 'social',
      },
    ),
  );
}

function setCost(cost) {
  if (cost) {
    return _extends({}, cost, {
      '@type': 'MonetaryAmount',
    });
  }

  return undefined;
}

function setSupply(supply) {
  if (supply) {
    return supply.map(supplyItem => ({
      '@type': 'HowToSupply',
      name: supplyItem,
    }));
  }

  return undefined;
}

function setTool(tool) {
  if (tool) {
    return tool.map(toolItem => ({
      '@type': 'HowToTool',
      name: toolItem,
    }));
  }

  return undefined;
}

function setStep(step) {
  if (step) {
    return step.map(stepElement => {
      const { itemListElement, image } = stepElement;
      const currentListElements =
        itemListElement == null
          ? void 0
          : itemListElement.map(({ type, text }) => ({
              '@type': type,
              text: text,
            }));
      return _extends({}, stepElement, {
        '@type': 'HowToStep',
        itemListElement: currentListElements,
        image: setImage(image),
      });
    });
  }

  return undefined;
}

const _excluded$q = [
  'type',
  'keyOverride',
  'image',
  'estimatedCost',
  'supply',
  'tool',
  'step',
];

function howToJsonLd(_ref) {
  let {
      type = 'HowTo',
      keyOverride,
      image,
      estimatedCost,
      supply,
      tool,
      step,
    } = _ref,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded$q);

  const data = _extends({}, rest, {
    image: setImage(image),
    estimatedCost: setCost(estimatedCost),
    supply: setSupply(supply),
    tool: setTool(tool),
    step: setStep(step),
  });

  return /*#__PURE__*/ React.createElement(
    JsonLd,
    _extends(
      {
        type: type,
        keyOverride: keyOverride,
      },
      data,
      {
        scriptKey: 'howTo',
      },
    ),
  );
}

export {
  ArticleJsonLd,
  BrandJsonLd,
  BreadCrumbJsonLd as BreadcrumbJsonLd,
  CarouselJsonLd,
  CollectionPageJsonLd,
  CorporateContactJsonLd,
  CourseJsonLd,
  DatasetJsonLd,
  DefaultSeo,
  EventJsonLd,
  FAQPageJsonLd,
  howToJsonLd as HowToJsonLd,
  JobPostingJsonLd,
  LocalBusinessJsonLd,
  LogoJsonLd,
  NewsArticleJsonLd,
  NextSeo,
  OrganizationJsonLd,
  ProductJsonLd,
  ProfilePageJsonLd,
  QAPageJsonLd,
  RecipeJsonLd,
  SiteLinksSearchBoxJsonLd,
  SocialProfileJsonLd,
  SoftwareAppJsonLd,
  VideoGameJsonLd,
  VideoJsonLd,
  WebPageJsonLd,
};
