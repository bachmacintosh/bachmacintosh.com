const dateOptions = {
  dateStyle: "short",
  timeStyle: "short",
  hour12: false,
  timeZone: "America/New_York",
};
module.exports = {
  reactStrictMode: true,
  images: {
    loader: "cloudinary",
    path: "https://res.cloudinary.com/bachman-io/",
  },
  env: {
    version: "0.2",
    buildTime: new Date().toLocaleString("en-US", dateOptions,),
  },
};
