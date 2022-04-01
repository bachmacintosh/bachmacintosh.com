# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Calendar Versioning](https://calver.org/).

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

[2022.03.31]: https://github.com/bachmacintosh/bachmacintosh.com/compare/v2022.03.27...v2022.03.31
[2022.03.27]: https://github.com/bachmacintosh/bachmacintosh.com/compare/v2022.03.25...v2022.03.27
[2022.03.25]: https://github.com/bachmacintosh/bachmacintosh.com/releases/tag/v2022.03.25
