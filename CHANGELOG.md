# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Calendar Versioning](https://calver.org/).

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

[2022.03.27]: https://github.com/bachmacintosh/bachmacintosh.com/compare/v2022.03.25...v2022.03.27
[2022.03.25]: https://github.com/bachmacintosh/bachmacintosh.com/releases/tag/v2022.03.25
