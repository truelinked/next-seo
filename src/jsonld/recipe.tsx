import React, { FC } from 'react';
import Head from 'next/head';

import markup from '../utils/markup';
import formatAuthorName from '../utils/formatAuthorName';
import buildVideo from '../utils/buildVideo';
import { buildAggregateRating } from '../utils/buildAggregateRating';

import { Video, AggregateRating } from '../types';
import escapeJsonLd from '../utils/escapeJsonLd';

type Instruction = {
  name?: string;
  text: string;
  url?: string;
  image?: string;
};

export const buildInstruction = (instruction: Instruction) => `{
  "@type": "HowToStep",
  ${instruction.name ? `"name": "${escapeJsonLd(instruction.name)}",` : ''}
  ${instruction.image ? `"image": "${instruction.image}",` : ''}
  ${instruction.url ? `"url": "${instruction.url}",` : ''}
  "text": "${escapeJsonLd(instruction.text)}"
}`;

export interface RecipeJsonLdProps {
  name: string;
  description: string;
  authorName: string | string[];
  ingredients: string[];
  instructions: Instruction[];
  images?: string[];
  datePublished?: string;
  prepTime?: string;
  cookTime?: string;
  totalTime?: string;
  keywords?: string;
  yields?: string;
  category?: string;
  cuisine?: string;
  calories?: number;
  aggregateRating?: AggregateRating;
  video?: Video;
}

const RecipeJsonLd: FC<RecipeJsonLdProps> = ({
  name,
  description,
  authorName,
  images = [],
  datePublished,
  prepTime,
  cookTime,
  totalTime,
  keywords,
  yields,
  category,
  cuisine,
  calories,
  ingredients,
  instructions,
  aggregateRating,
  video,
}) => {
  const jslonld = `{
    "@context": "https://schema.org/",
    "@type": "Recipe",
    "name": "${escapeJsonLd(name)}",
    "description": "${escapeJsonLd(description)}",
    "datePublished": "${datePublished}",
    "author": ${formatAuthorName(authorName)},
    "image": [
      ${images.map(image => `"${image}"`).join(',')}
    ],
    ${prepTime ? `"prepTime": "${prepTime}",` : ``}
    ${cookTime ? `"cookTime": "${cookTime}",` : ``}
    ${totalTime ? `"totalTime": "${totalTime}",` : ``}
    ${keywords ? `"keywords": "${escapeJsonLd(keywords)}",` : ``}
    ${yields ? `"recipeYield": "${escapeJsonLd(yields)}",` : ``}
    ${category ? `"recipeCategory": "${escapeJsonLd(category)}",` : ``}
    ${cuisine ? `"recipeCuisine": "${escapeJsonLd(cuisine)}",` : ``}
    ${
      calories
        ? `"nutrition": { "@type": "NutritionInformation", "calories": "${calories} calories" },`
        : ``
    }
    ${aggregateRating ? buildAggregateRating(aggregateRating) : ''}
    ${video ? `"video": ${buildVideo(video)},` : ''}
    "recipeIngredient": [
      ${ingredients.map(ingredient => `"${ingredient}"`).join(',')}
    ],
    "recipeInstructions": [
      ${instructions.map(buildInstruction).join(',')}
    ]
  }`;

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={markup(jslonld)}
        key="jsonld-recipe"
      />
    </Head>
  );
};

export default RecipeJsonLd;
