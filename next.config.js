// @type Intl.DateTimeFormatOptions
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
    version: process.env.SITE_VERSION ?? "???",
    buildTime: new Date().toLocaleString("en-US", dateOptions,),
    isDeployPreview,
  },
};

module.exports = nextConfig;
