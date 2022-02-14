const dateOptions = {
  dateStyle: "short",
  timeStyle: "short",
  hour12: false,
  timeZone: "America/New_York",
};
module.exports = {
  reactStrictMode: true,
  images: { domains: ["s4.anilist.co",], loader: "custom", },
  env: {
    version: "0.3",
    buildTime: new Date().toLocaleString("en-US", dateOptions,),
  },
};
