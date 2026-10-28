import { groq } from 'next-sanity';

export const productsQuery = groq`*[_type == "product"] | order(_createdAt desc) {
  _id,
  name,
  "slug": slug.current,
  price,
  originalPrice,
  badge,
  "category": category->title,
  "images": images[].asset->url,
  description,
  sizes,
  colors,
  isFeatured,
  inStock
}`;

export const featuredProductsQuery = groq`*[_type == "product" && isFeatured == true] | order(_createdAt desc)[0...8] {
  _id,
  name,
  "slug": slug.current,
  price,
  originalPrice,
  badge,
  "category": category->title,
  "images": images[].asset->url,
  description,
  sizes,
  colors,
  isFeatured,
  inStock
}`;

export const categoriesQuery = groq`*[_type == "category"] | order(title asc) {
  _id,
  title,
  "slug": slug.current,
  description,
  "image": image.asset->url
}`;

export const heroBannerQuery = groq`*[_type == "banner"][0] {
  _id,
  headline,
  subtitle,
  tag,
  ctaText,
  ctaLink,
  "imageUrl": image.asset->url
}`;
