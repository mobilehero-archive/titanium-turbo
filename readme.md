<p align="center">
  <img src="https://cdn.secure-api.org/images/turbo-title_400.png" /><br>
  <a href="https://www.npmjs.com/package/@titanium/turbo">
  	<img src="https://img.shields.io/npm/v/@titanium/turbo.png" /> 
  </a>
</p>

# Titanium Turbo

<!-- ![https://www.npmjs.com/package/@titanium/turbo](https://img.shields.io/npm/v/@titanium/turbo.png) -->

> _Turbo is not an official Axway product.  It is an open-source project that is supported exclusively by the Titanium development community._



- [📝 Description](#-Description)
- [🚀 Getting Started](#-Getting-Started)
- [✨Features](#Features)
- [🔗 Related Links](#-Related-Links)
- [📚Learn More](#Learn-More)
- [📣 Feedback](#-Feedback)
- [©️ Legal](#️-Legal)

## 📝 Description

Titanium Turbo is a variation of **`Titanium Alloy`** that adds some enhancements and customizations for rapid development.

This version of Titanium Turbo is based on **`Titanium Alloy 1.14.0-1`**

## 🚀 Getting Started

1. Create new Titanium Alloy project
2. Install `Titanium Turbo` in root of project

```
npm install --save-dev @titanium/turbo
```

3. Install `Titanium Turbo Plugin` in root of project

```
npm install --save-dev @titanium/plugin-turbo
```

4. Build or Run app as you would normally.

## ✨Features

> See `changelog.md` for history of changes

* [x] Supports installing npm packages in root of project for use in mobile  [[TIMOB-26352]](https://jira.appcelerator.org/browse/TIMOB-26352)
* [x] - Support for the following XML attributes in `textField`, `label`, and `textArea`: [[ALOY-1547]](https://jira.appcelerator.org/browse/ALOY-1547)
  - fontSize
  - fontFamily
  - fontStyle
  - fontWeight
  - textStyle
* [x] Replaced Underscore.js with Lodash 4.17.11  [[ALOY-1168]](https://jira.appcelerator.org/browse/ALOY-1168)
* [x] Updated babel.js to 7.x  [[ALOY-1629]](https://jira.appcelerator.org/browse/ALOY-1629) ![Has been merged into Alloy](https://img.shields.io/badge/alloy-merged-blue.png)
* [x] Enhanced support for babel config files:  `.babelrc`, `.babelrc.js` and `babel.config.js`
* [x] Added support for `camelCase`, `snake_case`, and `kabab-case` in XML views.  [[ALOY-1647]](https://jira.appcelerator.org/browse/ALOY-1647)
* [x] Added plugin property `compileConfig.dir.resourcesAlloy`
* [x] Updated moment to 2.24.0  [[ALOY-1682]](https://jira.appcelerator.org/browse/ALOY-1682)
* [x] Added backbone 1.4.0  [[ALOY-1648]](https://jira.appcelerator.org/browse/ALOY-1648)
* [x] Made default backbone version: 1.4.0
* [x] Added support for xml namespaced attributes per platform (e.g. `ios:text` or `android:text`) [[ALOY-1646]](https://jira.appcelerator.org/browse/ALOY-1646)  ![Has been merged into Alloy](https://img.shields.io/badge/alloy-merged-blue.png)
* [x] Added support for xml attributes with dotted notation (e.g. `font.fontSize`)  [[ALOY-1363]](https://jira.appcelerator.org/browse/ALOY-1363) ![Has been merged into Alloy](https://img.shields.io/badge/alloy-merged-blue.png)
* [x] Added support for using `$.args` in XML views.  [[ALOY-1316]](https://jira.appcelerator.org/browse/ALOY-1316)   ![Has been merged into Alloy](https://img.shields.io/badge/alloy-merged-blue.png)
* [x] Added support for using `$.*` in XML views. -- Anything that starts with "$." in an Alloy XML View will be used literally and not treated as a string.
* [x] Added support for using `turbo.*` in XML views. -- Anything that starts with "turbo." in an Alloy XML View will be used literally and not treated as a string.



## 🔗 Related Links

* [Geek Mobile Toolkit](https://www.npmjs.com/package/@geek/mobile) - Toolkit for creating, building, and managing mobile app projects.
* [Titanium Turbo Template (Default)](https://www.npmjs.com/package/@titanium/template-turbo-default) - Template for default Turbo app.  Based on the basic Alloy Template + some extra goodies.
- [Titanium Mobile](https://www.npmjs.com/package/titanium) - Open-source tool for building powerful, cross-platform native apps with JavaScript.
* [Alloy](https://www.npmjs.com/package/alloy) - MVC framework built on top of Titanium Mobile.
* [Appcelerator](https://www.npmjs.com/package/appcelerator) - Installer for the Appcelerator Platform tool

## 📚Learn More

* [Axway Developer Portal](https://developer.axway.com)

## 📣 Feedback

Have an idea or a comment?  [Join in the conversation here](https://github.com/brentonhouse/titanium-turbo/issues)! 

## ©️ Legal

Alloy is developed by Appcelerator and the community and is Copyright © 2012-Present by Appcelerator, Inc. All Rights Reserved.

Alloy is made available under the Apache Public License, version 2. See their license file for more information.

Appcelerator is a registered trademark of Appcelerator, Inc. Titanium is a registered trademark of Appcelerator, Inc. Please see the LEGAL information about using trademarks, privacy policy, terms of usage and other legal information at http://www.appcelerator.com/legal.