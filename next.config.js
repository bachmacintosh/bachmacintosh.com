const dateOptions = {
  dateStyle: "short",
  timeStyle: "short",
  hour12: false,
  timeZone: "America/New_York",
};
module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  images: { domains: ["s4.anilist.co",], loader: "custom", },
  env: {
    version: "0.4 Beta1",
    buildTime: new Date().toLocaleString("en-US", dateOptions,),
  },
};
