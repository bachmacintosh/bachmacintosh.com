// @ts-check
const dateOptions = {
  dateStyle: "long",
  timeStyle: "short",
  hour12: true,
  timeZone: "America/New_York",
};
const isDeployPreview = process.env.CF_PAGES
  && process.env.CF_PAGES_BRANCH === "develop";

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: { domains: ["s4.anilist.co",], loader: "custom", },
  env: {
    baseUrl: "https://bachmacintosh.com",
    version: "2022.06.28",
    buildTime: new Date().toLocaleString("en-US", dateOptions,),
    isDeployPreview,
  },
};

module.exports = nextConfig;
