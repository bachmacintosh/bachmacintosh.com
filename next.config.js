// @ts-check
const dateOptions = {
  dateStyle: "long",
  timeStyle: "short",
  hour12: true,
  timeZone: "America/New_York",
};
const isDeployPreview = process.env.NETLIFY
  && process.env.CONTEXT === "deploy-preview";

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: { domains: ["s4.anilist.co",], loader: "custom", },
  env: {
    baseUrl: "https://bachmacintosh.com",
    version: "2022.03.27",
    buildTime: new Date().toLocaleString("en-US", dateOptions,),
    isDeployPreview,
  },
};

module.exports = nextConfig;
