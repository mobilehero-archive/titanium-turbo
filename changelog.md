# Titanium Turbo - Release Notes

Titanium Turbo is a variation of Titanium Alloy that adds some enhancements and customizations for rapid development.

## [2.0.0] - 2020-10-07

### Added 

- Changing versioning to move independent of versions of Titanium Alloy.  Will avoid having to publish as a pre-release on npm.

## [1.15.1-6] - 2020-09-01

### Updated

- Partial fix fo issue with Titanium and Alloy where relative path require statements were broken on iOS.  [TIMOB-28037]
- Updated lodash to v4.17.20


## [1.15.1-1] - 2020-07-01

### Added

- Added all sorts of new stuff.  Need to update docs with changes later.

## [1.14.6-5] - 2020-04-04

### Added

- Support for `<style>` tag in XML views!  Also supports the `src` element which then allows using a widget-wide `app.tss` file.

## [1.14.6-3] - 2020-03-06

### Added

- Added initial support for Alloy now being able to be require `require('turbo')` - more awesomeness to come!

## [1.14.6-2] - 2012-02-28

### Updated

- Fixed issue if file skipped due to being ignored by babel config (still needs fix in SDK though)

## [1.14.6-1] - 2012-02-21

### Updated

- Updated to latest version of Alloy


## [1.14.5-5] - 2012-02-21

### Updated

- Fixed issue with Widgets/Require being used inside a Tab

## [1.14.5-4] - 2020-01-30

### Added

- Added support for StackLayout control (with shortcut alias of `stack` and orientation property that defaults to `vertical`) in JavaScript and xml views
- Added support for VerticalLayout control (with shortcut alias of `vertical`) in JavaScript and xml views
- Added support for HorizontalLayout control (with shortcut alias of `horizontal`) in JavaScript and xml views
- Added support for AbsoluteLayout control (with shortcut alias of `absolute`) in JavaScript and xml views
- Added alias support for ImageView and Image to JavaScript and xml views
- Added support for defining the primary entry point for the application (defaults to `index`).  Currently search order: `Alloy.main` → `Alloy.CFG.main` → Titanium Property: `app.main`. 


## [1.14.5-2] - 2020-01-23

### Added

- Added support for StackLayout element (with shortcut alias of `stack` and orientation property that defaults to `vertical`) in xml views
- Added support for VerticalLayout element (with shortcut alias of `vertical`) in xml views
- Added support for HorizontalLayout element (with shortcut alias of `horizontal`) in xml views
- Added support for AbsoluteLayout element (with shortcut alias of `absolute`) in xml views


## [1.14.5-1] - 2020-01-06

### Added

- Added lots of widget goodies!
- Added support for installing widgets via npm (without naming restrictions)
- Added support for using widgets as primary control in xml view
- Added support for using WPATH in xml view attributes
- Added support for using ~/ shortcut instead of WPATH in xml view attributes
  

## [1.14.5-0] - 2019-12-9

### Updated

- Updated to latest version of Alloy


## [1.14.1-18] - 2019-11-25

### Updated

- Bug fixes for databinding


## [1.14.1-17] - 2019-10-24

### Updated

- Updated to latest version of Alloy


## [1.14.1-16] - 2019-10-11

### Added

- Added `open` and `close` functions to Controller for opening/closing Controller views

## [1.14.1-15] - 2019-10-03

### Updated

- Updated to latest version of Alloy with PR-940

## [1.14.1-14] - 2019-10-03

### Updated

- Renamed XML View element `code` to `script`

## [1.14.1-13] - 2019-10-01

### Updated

- Fixed issue with Alloy View/Controller filenames that contained hyphens [ALOY-1706]

## [1.14.1-12] - 2019-10-01

### Updated
- Updated to latest version of Alloy with PR-911 for ALOY-1633
  

## [1.14.1-7] - 2019-09-05

### Updated
- Updated to latest version of @titanium/module-copier
  

## [1.14.1-5] - 2019-09-05

### Added

- Added some aliases to lodash for backwards compatibility with underscore.js.
  

## [1.14.1-4] - 2019-09-05

### Added

- Added `use-underscore` support in tiapp.xml for using underscore.js instead of lodash.

## [1.14.1-3] - 2019-09-05

### Added

- Added `allowReturnOutsideFunction` to allow support of some older npm modules

## [1.14.1-2] - 2019-08-30

### Added

- Added value alias `center` for `Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER` when used with `verticalAlign` XML attribute
- Added property alias `text` for `Ti.UI.Button.title` when used as XML attribute
- Added property alias `src` for `Ti.UI.ImageView.image` when used as XML attribute

## [1.14.1-1] - 2019-08-27

### Added

- Added support for `controllerId` in event args for events created in controllers.

## [1.14.1-0] - 2019-08-27

### Updated

- Merged in latest changes from Alloy


## [1.14.0-13] - 2019-08-07

### Updated

- Changed the `model` attribute (used with `dataCollection`) to `modelName`  [Defaults to `__currentModel`]
- Added `dataName` (to be used with `dataCollection`) to assign variable name to the current `model.__transformed` variable [Defaults to `$model`]

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
'
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


