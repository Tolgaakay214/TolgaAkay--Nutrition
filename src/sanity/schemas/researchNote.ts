import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'researchNote',
  title: 'Research Note',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'title' }, validation: (r) => r.required() }),
    defineField({ name: 'publishedAt', type: 'datetime' }),
    defineField({ name: 'body', type: 'array', of: [{ type: 'block' }] })
  ]
});
