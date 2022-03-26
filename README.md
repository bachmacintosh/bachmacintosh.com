# bachmacintosh.com

A website live at https://bachmacintosh.com

| Item                                                         | Status                                                                                                                                                                                                        |
|--------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [CI](https://en.wikipedia.org/wiki/Continuous_integration)                                                       | [![Tests](https://github.com/bachmacintosh/bachmacintosh.com/actions/workflows/test_main.yml/badge.svg?branch=main&event=push)](https://github.com/bachmacintosh/bachmacintosh.com/actions/workflows/test_main.yml) |
| [CodeQL](https://codeql.github.com/)                         | [![CodeQL](https://github.com/bachmacintosh/bachmacintosh.com/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/bachmacintosh/bachmacintosh.com/actions/workflows/codeql-analysis.yml)     |
| [Netlify](https://www.netlify.com/)                          | [![Netlify Status](https://api.netlify.com/api/v1/badges/7ab2190c-7a11-4335-bd35-f6cbb49f1a24/deploy-status)](https://app.netlify.com/sites/bachmacintosh/deploys)                                                                                                                                                                                                              |

## Development

Create a `.env.local` file with values from the `ENVIRONMENT_VARIABLES` file.

Install Dependencies

```shell
$ npm install
```

Available Commands

```shell
# run dev server
$ npm run dev

# Build an optimized Next.js App
$ npm run build

# Start serving using the Next.js server
$ npm run start

# run ESLint
$ npm run lint

# run ESLint, fix anything that can be done automatically
$ npm run lint:fix

# run Cypress in-browser
# Terminal 1
$ npm run build
$ npm run start

# Terminal 2
$ npm run cypress

# run Cypress headless
$ npm run cypress:headless
```

## Contributing

Please see [SECURITY.md](https://github.com/bachmacintosh/bachmacintosh.com/blob/main/SECURITY.md) for reporting security vulnerabilities, and [CONTRIBUTING.md](https://github.com/bachmacintosh/bachmacintosh.com/blob/main/CONTRIBUTING.md) for all other contributions to the Project. All contributions should be made in line with our [Code of Conduct](https://github.com/bachmacintosh/bachmacintosh.com/blob/main/CODE_OF_CONDUCT.md). Thank You!