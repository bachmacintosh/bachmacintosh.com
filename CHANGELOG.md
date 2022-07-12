# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Calendar Versioning](https://calver.org/).

## [2022.07.12]

### Changed
* Dependency Updates
  * @headlessui/react - 1.6.4 to 1.6.5
  * @types/react - 18.0.8 to 18.0.15
  * Google APIs - 100.0.0 to 105.0.0
  * React - 18.1.0 to 18.2.0
  * Tailwind CSS - 3.0.24 to 3.1.4
* ESLint rules updated to match upcoming Manual of Style
* Site Version is now loaded from an Environment Variable

### Fixed
* Various code style linting errors
* Blog post rendering errors

## [2022.06.28]

### Added
* Static HTML Export back to GitHub Actions since Cloudflare Pages currently uses a static export
* Missing `export` command

### Changed
* Dependency Updates
  * @headlessui/react - 1.6.0 to 1.6.4
  * @tailwindcss/forms - 0.5.0 to 0.5.2
  * @types/node - 17.0.31 to 18.0.0
  * @typescript-eslint/eslint-plugin - 5.21.0 to 5.30.0
  * @typescript-eslint/parser - 5.21.0 to 5.30.0
  * Autoprefixer - 10.4.5 to 10.4.7
  * ESLint - 8.14.0 to 8.18.0
  * eslint-config-next - 12.1.5 to 12.2.0
  * Next.js - 12.1.5 to 12.2.0
  * next-sitemap - 2.5.20 to 3.1.7
  * PostCSS - 8.4.13 to 8.4.14
  * react-youtube - 9.0.1 to 9.0.2
  * TypeScript - 4.6.4 to 4.7.4
* Site now hosted on CloudFlare Pages
* Version in footer now links to the CHANGELOG in GitHub
* Deploy Preview logic is now relying on Cloudflare Pages environment variables instead of Netlify

### Removed
* Netlify badge and scheduled GitHub Action
* Unneeded IDE config file

### Fixed
* Button rounding/border radius

## [2022.05.04]

### Changed
* Dependency Updates
  * @types/node - 17.0.29 to 17.0.31
  * PostCSS - 8.4.12 to 8.4.13
  * react-youtube - 8.3.0 to 9.0.1
  * TypeScript - 4.6.3 to 4.6.4

### Removed
* Contentful SDK dependency, as it was not being used in code

### Fixed
* Some radicals were not displaying properly on the WaniKani page

## [2022.04.28]

### Added
* Videos page to showcase the 50 latest videos I'm featured in
* Media page to link to Videos for now

### Changed
* Added Media page to navigation
* Dependency Updates
  * @headlessui/react - 1.5.0 to 1.6.0
  * React - 18.0.0 to 18.1.0
  * react-youtube - 8.2.1 to 8.3.0

### Removed
* Cypress and its tests/artifacts

## [2022.04.27]

### Changed
* The method for fetching AniList anime now expects a new "AMV Hell (Re)Watches" list
* Dependabot now runs monthly
* Updated the YouTube section of the home page to feature videos I'm featured in
* Dependency Updates
  * @contentful/rich-text-react-renderer - 15.12.0 to 15.12.1
  * @contentful/rich-text-types - 15.12.0 to 15.12.1
  * @popperjs/core - 2.11.4 to 2.11.5
  * @types/node - 17.0.23 to 17.0.29
  * @types/react - 17.0.43 to 18.0.6
  * @typescript-eslint/eslint-plugin - 5.18.0 to 5.21.0
  * @typescript-eslint/parser - 5.18.0 to 5.21.0
  * Autoprefixer - 10.4.4 to 10.4.5
  * Contentful - 9.1.18 to 9.1.26
  * Cypress - 9.5.3 to 9.5.4
  * ESLint - 8.12.0 to 8.14.0
  * eslint-config-next - 12.1.4 to 12.1.5
  * Next.js - 12.1.4 to 12.1.5
  * next-seo - 5.3.0 to 5.4.0
  * next-sitemap - 2.5.17 to 2.5.20
  * react-markdown - 8.0.2 to 8.0.3
  * react-youtube - 7.14.0 to 8.2.1
  * Tailwind CSS - 3.0.23 to 3.0.24

### Removed
* Cypress tests in GitHub actions will eventually be replaced with Jest tests

## [2022.04.04]

### Changed
* Dependabot now allows up to 20 open Pull Requests
* Dependency Updates
  * Cypress - 9.5.2 to 9.5.3
  * eslint-config-next - 12.1.1 to 12.1.4
  * Google APIs - 99.0.0 to 100.0.0
  * Next.js - 12.1.1 to 12.1.4
  * next-sitemap - 2.5.14 to 2.5.17
  * next-seo - 5.2.0 to 5.3.0
  * React - 17 to 18
  * react-markdown - 8.0.1 to 8.0.2
  * @typescript-eslint/eslint-plugin - 5.16.0 to 5.18.0
  * @typescript-eslint/parser - 5.16.0 to 5.18.0

## [2022.03.31]

### Changed
* Types are now declared instead of exported in `additional.d.ts`
* Test and CodeQL GitHub Actions now run on the `develop` branch in addition to `main`
* Updated badges in README to include the `develop` branch
* Dependency Updates
  * ESLint - 8.11.0 to 8.12.0
  * eslint-config-next - 12.1.0 to 12.1.1
  * Google APIs - 97.0.0 to 99.0.0
  * Next.js - 12.1.0 to 12.1.1
  * next-seo - 5.1.0 to 5.2.0
  * next-sitemap - 2.5.12 to 2.5.14
  * TypeScript - 4.6.2 to 4.6.3
  * @contentful/rich-text-react-renderer - 15.11.1 to 15.12.0
  * @contentful/rich-text-types - 15.11.1 to 15.12.0
  * @types/node - 17.0.22 to 17.0.23
  * @types/react - 17.0.41 to 17.0.43

## [2022.03.27]

### Added
* `LongContentView` for pages with long-form content, for easier readability; max width is `4xl` instead of `7xl`.

### Changed
* Contentful Blog Posts and Pages now use `LongContentView`
* Changelog Page now uses `LongContentView`
* Cypress environment variables are now set in main environment instead of `cypress.env.json`
* Dependabot now targets the `develop` branch on the project's repository
* README updates
  1. Update language to indicate the site is live
  2. Removed documentation on `cypress.env.json` (see above)
  3. Removed `export` and `export:netlify` from commands list (see below)

### Removed
* `export` and `export:netlify` commands since this Next.js site cannot be exported to static HTML

## [2022.03.25]

### Added
* CHANGELOG.md
* Changelog Page that renders contents of CHANGELOG.md
* Link to Changelog Page in Footer from version number
* Markdown component to render Markdown using our own components
* Packages `react-markdown` and `remark-gfm`

### Changed
* Hyperlink component's `href` prop is now optional
* Site Version now uses Calendar Versioning (CalVer)
* Footer now indicates date when site was "last built" instead of "last updated," for clarity

[2022.07.12]: https://github.com/bachmacintosh/bachmacintosh.com/compare/v2022.06.28...v2022.07.12
[2022.06.28]: https://github.com/bachmacintosh/bachmacintosh.com/compare/v2022.05.04...v2022.06.28
[2022.05.04]: https://github.com/bachmacintosh/bachmacintosh.com/compare/v2022.04.28...v2022.05.04
[2022.04.28]: https://github.com/bachmacintosh/bachmacintosh.com/compare/v2022.04.27...v2022.04.28
[2022.04.27]: https://github.com/bachmacintosh/bachmacintosh.com/compare/v2022.04.04...v2022.04.27
[2022.04.04]: https://github.com/bachmacintosh/bachmacintosh.com/compare/v2022.03.31...v2022.04.04
[2022.03.31]: https://github.com/bachmacintosh/bachmacintosh.com/compare/v2022.03.27...v2022.03.31
[2022.03.27]: https://github.com/bachmacintosh/bachmacintosh.com/compare/v2022.03.25...v2022.03.27
[2022.03.25]: https://github.com/bachmacintosh/bachmacintosh.com/releases/tag/v2022.03.25
