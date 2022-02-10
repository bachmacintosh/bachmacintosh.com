const dateOptions = {
  dateStyle: "short",
  timeStyle: "short",
  hour12: false,
};
module.exports = {
  reactStrictMode: true,
  images: {
    loader: "cloudinary",
    path: "https://res.cloudinary.com/bachman-io/",
  },
  env: { buildTime: new Date().toLocaleString("en-US", dateOptions,), },
};
