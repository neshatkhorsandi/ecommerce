import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = sanityClient({
  projectId: 'zquksltr', // sanity knows which product id to connect us with
  dataset: 'production', // so we know if were in prod or dev
  apiVersion: '2022-03-10',
  useCdn: true,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});

// use sanity images
const builder = imageUrlBuilder(client);
// getting the url for images
export const urlFor = (source) => builder.image(source);
