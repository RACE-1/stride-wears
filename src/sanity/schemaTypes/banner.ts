import { defineField, defineType } from 'sanity';

export const banner = defineType({
  name: 'banner',
  title: 'Hero Banner',
  type: 'document',
  fields: [
    defineField({
      name: 'headline',
      title: 'Headline (e.g. "ENGINEERED FOR FLIGHT")',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle / Description',
      type: 'text',
    }),
    defineField({
      name: 'tag',
      title: 'Tag / Category (e.g. "JUST DROPPED")',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Banner Image',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'ctaText',
      title: 'CTA Button Text',
      type: 'string',
      initialValue: 'Shop Now',
    }),
    defineField({
      name: 'ctaLink',
      title: 'CTA Button Link',
      type: 'string',
      initialValue: '/products',
    }),
  ],
});
