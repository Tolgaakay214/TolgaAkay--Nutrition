import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  fields: [
    defineField({ name: 'name', type: 'string', initialValue: 'Tolga Akay' }),
    defineField({ name: 'bio', type: 'text' }),
    defineField({ name: 'photo', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'linkedin', type: 'url' })
  ]
});
