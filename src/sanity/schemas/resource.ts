import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'resource',
  title: 'Resource',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'title' }, validation: (r) => r.required() }),
    defineField({ name: 'description', type: 'text', rows: 2 }),
    defineField({
      name: 'format',
      type: 'string',
      options: { list: ['Interactive', 'PDF', 'Worksheet'] }
    }),
    defineField({ name: 'file', type: 'file' })
  ]
});
