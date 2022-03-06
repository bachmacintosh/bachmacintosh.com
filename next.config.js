const dateOptions = {
  dateStyle: "long",
  timeStyle: "short",
  hour12: true,
  timeZone: "America/New_York",
};
const isDeployPreview = process.env.NETLIFY
  && process.env.CONTEXT === "deploy-preview";
module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  images: { domains: ["s4.anilist.co",], loader: "custom", },
  env: {
    baseUrl: "https://bachmacintosh.com",
    version: "0.5 Beta",
    buildTime: new Date().toLocaleString("en-US", dateOptions,),
    isDeployPreview,
  },
};
