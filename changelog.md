# Titanium Turbo - Release Notes

Titanium Turbo is a fork of Titanium Alloy that adds some enhancements and customizations for rapid development.

## [Unreleased]

### Added
- Added support for xml namespaced attributes per platform (e.g. `ios:text` or `android:text`)
- Added support for xml attributes with dotted notation (e.g. `font.fontSize`)

## [1.13.8-0] - 2019-02-22 - Initial Release

### Added
- Based on Titanium Alloy 1.13.8
- Support for the following XML attributes in views:  `fontSize`, `fontFamily`, `fontStyle`, `fontWeight`, `textStyle`
  - Made default backbone version: 1.3.3
- Replaced Underscore.js with Lodash 4.17.11
- Updated babel.js to 7.x
- Added support for babel config files:  `.babelrc`, `.babelrc.js` and `babel.config.js`
- Added support for camelCase, snake_case, and kabab-case in XML views
- Added plugin property `compileConfig.dir.resourcesAlloy`
- Added ability to use Node.js modules installed in root directory of project