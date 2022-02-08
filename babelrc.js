const plugins = [];

if (process.env.CI === true) {
  plugins.push("istanbul",);
}

module.exports = {
  presets: ["next/babel",],
  plugins,
};
