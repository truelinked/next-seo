import { Review, Author, Publisher, ReviewRating } from '../types';
import escapeJsonLd from './escapeJsonLd';

export const buildReviewRating = (rating: ReviewRating) =>
  rating
    ? `"reviewRating": {
          "@type": "Rating",
          ${rating.bestRating ? `"bestRating": "${rating.bestRating}",` : ''}
          ${rating.worstRating ? `"worstRating": "${rating.worstRating}",` : ''}
          "ratingValue": "${rating.ratingValue}"
        }`
    : '';

export const buildAuthor = (author: Author) => `
  "author": {
      "@type": "${author.type}",
      "name": "${escapeJsonLd(author.name)}"
  },
`;

export const buildPublisher = (publisher: Publisher) => `
  "publisher": {
      "@type": "${publisher.type}",
      "name": "${escapeJsonLd(publisher.name)}"
  },
`;

export const buildReviews = (reviews: Review[]) => `
  "review": [
    ${reviews.map(
      review => `{
        "@type": "Review",
        ${review.author ? buildAuthor(review.author) : ''}
        ${review.publisher ? buildPublisher(review.publisher) : ''}
        ${
          review.datePublished
            ? `"datePublished": "${review.datePublished}",`
            : ''
        }
        ${review.reviewBody ? `"reviewBody": "${review.reviewBody}",` : ''}
        ${review.name ? `"name": "${review.name}",` : ''}
        ${buildReviewRating(review.reviewRating)}
    }`,
    )}
  ],
`;
