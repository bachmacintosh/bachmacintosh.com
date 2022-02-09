# bachmacintosh.com

A website that will soon be live at https://bachmacintosh.com

| Item                                                         | Status                                                                                                                                                                                                              |
|--------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [CI](https://en.wikipedia.org/wiki/Continuous_integration)                                                       | [![Tests](https://github.com/bachmacintosh/bachmacintosh.com/actions/workflows/test_main.yml/badge.svg?branch=main&event=push)](https://github.com/bachmacintosh/bachmacintosh.com/actions/workflows/test_main.yml) |
| [CodeQL](https://codeql.github.com/)                         | [![CodeQL](https://github.com/bachmacintosh/bachmacintosh.com/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/bachmacintosh/bachmacintosh.com/actions/workflows/codeql-analysis.yml)           |
| [Netlify](https://www.netlify.com/)                          | (soon)                                                                                                                                                                                                              |

## Development

Create a `.env.local` file with values from the `ENVIRONMENT_VARIABLES` file.

Create a `cypress.env.json` file with values from the `cypress.env-example.json` file.

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

# Export Static HTML
$ npm run export

# Combine build and export for deploying to Netlify
$ npm run export:netlify

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
```

## Contributing

Please see [SECURITY.md](https://github.com/bachmacintosh/bachmacintosh.com/blob/main/SECURITY.md) for reporting security vulnerabilities, and [CONTRIBUTING.md](https://github.com/bachmacintosh/bachmacintosh.com/blob/main/CONTRIBUTING.md) for all other contributions to the Project. All contributions should be made in line with our [Code of Conduct](https://github.com/bachmacintosh/bachmacintosh.com/blob/main/CODE_OF_CONDUCT.md). Thank You!