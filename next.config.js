const dateOptions = {
  dateStyle: "long",
  timeStyle: "short",
  hour12: true,
  timeZone: "America/New_York",
};
module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  images: { domains: ["s4.anilist.co",], loader: "custom", },
  env: {
    baseUrl: "https://bachmacintosh.com",
    version: "0.4 Beta",
    buildTime: new Date().toLocaleString("en-US", dateOptions,),
  },
};
