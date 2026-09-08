// Phase 2 (optional): Sanity content schema for Articles.
// Not wired up yet — see /README.md "Migrating to Sanity" for how to
// activate this. Mirrors the MDX frontmatter used in /src/content/articles
// so migrating existing content is a straightforward one-time import.

import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'article',
  title: 'Article',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'title' }, validation: (r) => r.required() }),
    defineField({ name: 'excerpt', type: 'text', rows: 2, validation: (r) => r.max(240).required() }),
    defineField({
      name: 'category',
      type: 'string',
      options: {
        list: [
          'Transition Cow Nutrition',
          'Dairy Nutrition',
          'Rumen Function',
          'Feed Additives',
          'Minerals & DCAD',
          'Forage & TMR Management',
          'Metabolic Disorders',
          'Research Reviews',
          'Farm Management',
          'Technical Notes'
        ]
      }
    }),
    defineField({ name: 'coverImage', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'publishedAt', type: 'datetime' }),
    defineField({ name: 'featured', type: 'boolean', initialValue: false }),
    defineField({
      name: 'body',
      type: 'array',
      of: [
        { type: 'block' },
        { type: 'image', options: { hotspot: true } },
        { type: 'table' },
        {
          type: 'object',
          name: 'calloutBlock',
          title: 'Callout',
          fields: [
            { name: 'title', type: 'string' },
            { name: 'text', type: 'text' }
          ]
        },
        {
          type: 'object',
          name: 'practicalTakeaway',
          title: 'Practical Takeaway',
          fields: [{ name: 'text', type: 'text' }]
        }
      ]
    }),
    defineField({
      name: 'references',
      title: 'References',
      type: 'array',
      of: [{ type: 'string' }]
    }),
    defineField({ name: 'seoTitle', type: 'string' }),
    defineField({ name: 'seoDescription', type: 'text', rows: 2 })
  ]
});
