# Titanium Turbo - Release Notes

Titanium Turbo is a variation of Titanium Alloy that adds some enhancements and customizations for rapid development.

## [1.14.0-12] - 2019-08-06

### Added
- Added support for visibility property in XML Views with possible values of:  `collapse`, `hidden`, and `visible`.
- Added constants: `Ti.UI.VISIBILITY_COLLAPSE`, `Ti.UI.VISIBILITY_HIDDEN`, and `Ti.UI.VISIBILITY_VISIBLE`
- Added support for `model` XML attribute to be used with with `dataCollection` to assign variable name to model
- Added support for adding code to XML View attributes when surrounded by '~'
- Added support for `Code` element in XML View.  Add code by body or `src` attribute.

## [1.14.0-11] - 2019-08-02

### Updated
- Updated lodash to v4.17.15


## [1.14.0-10] - 2019-07-11

### Added
- Added support for `$.*` in Alloy Views XML attributes.  Anything that starts with `$.` will not be treated as a string.

## [1.14.0-9] - 2019-07-09

### Updated
- Updated lodash to v4.17.12

## [1.14.0-8] - 2019-07-03

### Added
- Added functionality from [AlloyXL](https://github.com/jasonkneen/AlloyXL) into `Alloy.createController`
- Added support for `require('/turbo')` as an alternate for Alloy and Alloy.Globals 
- Added `turbo` as a supported variable for use in Alloy XML views - [See JIRA Ticket](https://jira.appcelerator.org/browse/TIMOB-27206)

## [1.14.0-6] - 2019-07-01

### Updated
- Updated version of @titanium/module-copier

## [1.14.0-5] - 2019-06-26

### Updated
- Used new function in module-copier

## [1.14.0-4] - 2019-06-26

### Updated
- Updated version of @titanium/module-copier

## [1.14.0-3] - 2019-06-28

### Updated
- Updated version of @titanium/module-copier

## [1.14.0-2] - 2019-06-17

### Updated
- Increment version after update of diff version

## [1.14.0-1] - 2019-06-17

### Updated
- Merged in latest changes from Alloy

## [1.13.10-4] - 2019-06-07

### Updated
- Updated version of @titanium/module-copier

## [1.13.10-4] - 2019-06-05

### Updated
- Updated backbone sorting from Alloy

## [1.13.10-3] - 2019-06-04

### Updated
- Updated moment to 1.4.0

## [1.13.10-2] - 2019-06-04

### Added
- Added backbone version: 1.4.0
- Added underscore.js (1.9.1) for any legacy support

### Updated
- Made default backbone version: 1.4.0


## [1.13.10-1] - 2019-06-03

### Updated
- Merged in latest changes from Alloy

## [1.13.10-0] - 2019-05-20

### Updated
- Merged in latest changes from Alloy 1.13.10

## [1.13.9-1] - 2019-05-20

### Updated
- Added check if __init is function

## [1.13.9-0] - 2019-04-11

### Added
- Merged in latest changes from Alloy 1.13.9

## [1.13.8-6] - 2019-03-11

### Added
- Added support for using `$.*` variables in XML views.  [[[ALOY-1316]](https://jira.appcelerator.org/browse/ALOY-1316)
- Added support for calling `__init()` function in controllers before rest of user code


## [1.13.8-5] - 2019-03-07

### Updated
- Merged in latest changes from Alloy

## [1.13.8-4] - 2019-03-05

### Updated
- Merged in latest changes from Alloy

## [1.13.8-3] - 2019-02-28

### Added
- Added support for using `$.args` in XML views.  [[[ALOY-1316]](https://jira.appcelerator.org/browse/ALOY-1316)

## [1.13.8-2] - 2019-02-27

### Added
- Added support for xml namespaced attributes per platform (e.g. `ios:text` or `android:text`)  [[ALOY-1646]](https://jira.appcelerator.org/browse/ALOY-1646)
- Added support for xml attributes with dotted notation (e.g. `font.fontSize`)  [[ALOY-1363]](https://jira.appcelerator.org/browse/ALOY-1363)

## [1.13.8-0] - 2019-02-22 - Initial Release

### Added
- Based on Titanium Alloy 1.13.8
- Support for the following XML attributes in views:  `fontSize`, `fontFamily`, `fontStyle`, `fontWeight`, `textStyle` [[ALOY-1547]](https://jira.appcelerator.org/browse/ALOY-1547)
- Made default backbone version: 1.3.3
- Replaced Underscore.js with Lodash 4.17.11  [[ALOY-1168]](https://jira.appcelerator.org/browse/ALOY-1168)
- Updated babel.js to 7.x [[ALOY-1629]](https://jira.appcelerator.org/browse/ALOY-1629)
- Added support for babel config files:  `.babelrc`, `.babelrc.js` and `babel.config.js`
- Added support for `camelCase`, `snake_case`, and `kabab-case` in XML views.  [[ALOY-1647]](https://jira.appcelerator.org/browse/ALOY-1647)
- Added plugin property `compileConfig.dir.resourcesAlloy`
- Added ability to use Node.js modules installed in root directory of project [[TIMOB-26352]](https://jira.appcelerator.org/browse/TIMOB-26352)


