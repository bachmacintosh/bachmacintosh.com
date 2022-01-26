const errorOnProd = process.env.NETLIFY ? 'error' : 'warn';
module.exports = {
  extends: "next/core-web-vitals",
  rules: {
    "no-console": errorOnProd,
    "semi": ["error", "always",],
    "comma-dangle": ["error", "always",],
  },
};