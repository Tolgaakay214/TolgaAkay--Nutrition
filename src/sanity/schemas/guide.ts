import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'guide',
  title: 'Technical Guide',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'title' }, validation: (r) => r.required() }),
    defineField({ name: 'summary', type: 'text', rows: 2 }),
    defineField({ name: 'coverImage', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'pdfFile', title: 'PDF File', type: 'file' }),
    defineField({ name: 'pages', type: 'number' }),
    defineField({ name: 'tags', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'featured', type: 'boolean', initialValue: false }),
    defineField({ name: 'body', type: 'array', of: [{ type: 'block' }, { type: 'image' }, { type: 'table' }] }),
    defineField({ name: 'references', type: 'array', of: [{ type: 'string' }] })
  ]
});
