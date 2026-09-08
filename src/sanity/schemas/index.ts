import article from './article';
import researchNote from './researchNote';
import guide from './guide';
import resource from './resource';
import author from './author';

// Phase 2: import this into a Sanity Studio config (`sanity.config.ts`) once
// you're ready to migrate off MDX. See /README.md.
export const schemaTypes = [article, researchNote, guide, resource, author];
