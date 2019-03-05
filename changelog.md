# Titanium Turbo - Release Notes

Titanium Turbo is a fork of Titanium Alloy that adds some enhancements and customizations for rapid development.

## [1.13.8-4] - 2019-03-05

### Updated
- Merged in latest changes from Alloy

## [1.13.8-3] - 2019-02-28

### Added
- Added support for using `$.args` in XML views.  [[[ALOY-1316]](https://jira.appcelerator.org/browse/ALOY-1316)

## [1.13.8-2] - 2019-02-27

### Added
- Added support for xml namespaced attributes per platform (e.g. `ios:text` or `android:text`)
- Added support for xml attributes with dotted notation (e.g. `font.fontSize`) 

## [1.13.8-0] - 2019-02-22 - Initial Release

### Added
- Based on Titanium Alloy 1.13.8
- Support for the following XML attributes in views:  `fontSize`, `fontFamily`, `fontStyle`, `fontWeight`, `textStyle` [[ALOY-1547]](https://jira.appcelerator.org/browse/ALOY-1547)
- Made default backbone version: 1.3.3
- Replaced Underscore.js with Lodash 4.17.11  [[ALOY-1168]](https://jira.appcelerator.org/browse/ALOY-1168)
- Updated babel.js to 7.x [[ALOY-1629]](https://jira.appcelerator.org/browse/ALOY-1629)
- Added support for babel config files:  `.babelrc`, `.babelrc.js` and `babel.config.js`
- Added support for `camelCase`, `snake_case`, and `kabab-case` in XML views
- Added plugin property `compileConfig.dir.resourcesAlloy`
- Added ability to use Node.js modules installed in root directory of project [[TIMOB-26352]](https://jira.appcelerator.org/browse/TIMOB-26352)


