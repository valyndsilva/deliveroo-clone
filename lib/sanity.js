import sanityClient from "@sanity/client";
import createImageUrlBuilder from "@sanity/image-url";
export const client = sanityClient({
  projectId: "6nq5c8vn",
  dataset: "production",
  useCdn: true,
  apiVersion: "v1",
});

// Set up a helper function for generating Image URLs (extracting URL from the image) with only the asset reference data in your documents. Read more: https://www.sanity.io/docs/image-url
const builder = createImageUrlBuilder(client);
export const urlFor = (source) => builder.image(source); //helper function
