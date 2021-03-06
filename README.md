# bachmacintosh.com

A website live at https://bachmacintosh.com

| Branch   | main                                                                                                                                                                                                                  | develop                                                                                                                                                                                                                  |
|----------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Tests    | [![Tests](https://github.com/bachmacintosh/bachmacintosh.com/actions/workflows/test_main.yml/badge.svg?branch=main)](https://github.com/bachmacintosh/bachmacintosh.com/actions/workflows/test_main.yml)              | [![Tests](https://github.com/bachmacintosh/bachmacintosh.com/actions/workflows/test_main.yml/badge.svg?branch=develop)](https://github.com/bachmacintosh/bachmacintosh.com/actions/workflows/test_main.yml)              |
| [CodeQL] | [![CodeQL](https://github.com/bachmacintosh/bachmacintosh.com/actions/workflows/codeql-analysis.yml/badge.svg?branch=main)](https://github.com/bachmacintosh/bachmacintosh.com/actions/workflows/codeql-analysis.yml) | [![CodeQL](https://github.com/bachmacintosh/bachmacintosh.com/actions/workflows/codeql-analysis.yml/badge.svg?branch=develop)](https://github.com/bachmacintosh/bachmacintosh.com/actions/workflows/codeql-analysis.yml) |

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

# Build an optimized Next.js App without linting via ESLint
$ npm run build:ci

# Start serving using the Next.js server
$ npm run start

# run ESLint
$ npm run lint

# run ESLint, fix anything that can be done automatically
$ npm run lint:fix
```

## Contributing

Please see [SECURITY.md](https://github.com/bachmacintosh/bachmacintosh.com/blob/main/SECURITY.md) for reporting security vulnerabilities, and [CONTRIBUTING.md](https://github.com/bachmacintosh/bachmacintosh.com/blob/main/CONTRIBUTING.md) for all other contributions to the Project. All contributions should be made in line with our [Code of Conduct](https://github.com/bachmacintosh/bachmacintosh.com/blob/main/CODE_OF_CONDUCT.md). Thank You!

[CodeQL]: https://codeql.github.com/