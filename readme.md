<p align="center">
  <img src="https://cdn.secure-api.org/images/turbo-title_400.png" width="50%" /><br>
</p>

# Titanium Turbo


[![Twitter Follow](https://img.shields.io/twitter/follow/brentonhouse?label=Follow%20%40brentonhouse%20on%20twitter&style=social)](https://twitter.com/brentonhouse)
[![LinkedIn Follow](https://img.shields.io/badge/LinkedIn-_Connect_with_%40brentonhouse_-blue?logo=linkedin&style=flat-square)](https://www.linkedin.com/in/brentonhouse/)
![Github Followers](https://img.shields.io/github/followers/brentonhouse?label=Follow%20%40brentonhouse%20on%20GitHub&style=social)


![GitHub stars](https://img.shields.io/github/stars/brentonhouse/titanium-turbo?style=social)
![GitHub forks](https://img.shields.io/github/forks/brentonhouse/titanium-turbo?style=social)
![GitHub watchers](https://img.shields.io/github/watchers/brentonhouse/titanium-turbo?style=social)
[![@titanium/turbo](https://img.shields.io/npm/v/@titanium/turbo.png)](https://www.npmjs.com/package/@titanium/turbo)
[![Dependabot Status](https://api.dependabot.com/badges/status?host=github&repo=brentonhouse/titanium-turbo)](https://dependabot.com)

> _**Turbo is not an official Axway product.**  
> It is an experiment by [Brenton House](https://brenton.house) using open-source projects.  You are welcome to try it out and [leave feedback](https://github.com/brentonhouse/titanium-turbo/issues)!_


* [📝 Description](#-description)
* [🚀 Getting Started](#-getting-started)
* [✨Features](#features)
* [🔗 Related Links](#-related-links)
* [📚Learn More](#learn-more)
* [📣 Feedback](#-feedback)
* [©️ Legal](#️-legal)

## 📝 Description

Titanium Turbo is a fork of **`Titanium Alloy`** that adds a lot of enhancements and customizations for rapid development.

This version of Titanium Turbo is based on **`Titanium Alloy 1.15.0`**

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

* [x] Supports installing npm packages in root of project for use in mobile  [[TIMOB-26352]](https://jira.appcelerator.org/browse/TIMOB-26352)  [[Alloy PR]](https://github.com/appcelerator/alloy/pull/950) ![Exclusive Turbo Feature](https://img.shields.io/badge/turbo-exclusive-blue.png) 
* [x] Support for the following XML attributes in `textField`, `label`, and `textArea`: [[ALOY-1547]](https://jira.appcelerator.org/browse/ALOY-1547)  ![Exclusive Turbo Feature](https://img.shields.io/badge/turbo-exclusive-blue.png) 
  - fontSize
  - fontFamily
  - fontStyle
  - fontWeight
  - textStyle
* [x] Replaced Underscore.js with Lodash 4.17.12  [[ALOY-1168]](https://jira.appcelerator.org/browse/ALOY-1168)
* [x] Updated babel.js to 7.x  [[ALOY-1629]](https://jira.appcelerator.org/browse/ALOY-1629) ![Has been merged into Alloy](https://img.shields.io/badge/alloy-merged-green.png)
* [x] Enhanced support for babel config files:  `.babelrc`, `.babelrc.js` and `babel.config.js`  ![Exclusive Turbo Feature](https://img.shields.io/badge/turbo-exclusive-blue.png) 
* [x] Added support for `camelCase`, `snake_case`, and `kabab-case` in XML views.  [[ALOY-1647]](https://jira.appcelerator.org/browse/ALOY-1647)  ![Exclusive Turbo Feature](https://img.shields.io/badge/turbo-exclusive-blue.png) 
* [x] Added plugin property `compileConfig.dir.resourcesAlloy`  ![Exclusive Turbo Feature](https://img.shields.io/badge/turbo-exclusive-blue.png) 
* [x] Updated moment to 2.24.0  [[ALOY-1682]](https://jira.appcelerator.org/browse/ALOY-1682)  ![Has been merged into Alloy](https://img.shields.io/badge/alloy-merged-green.png)
* [x] Added backbone 1.4.0  [[ALOY-1648]](https://jira.appcelerator.org/browse/ALOY-1648)  ![Has been merged into Alloy](https://img.shields.io/badge/alloy-merged-green.png)
* [x] Made default backbone version: 1.4.0
* [x] Added support for xml namespaced attributes per platform (e.g. `ios:text` or `android:text`) [[ALOY-1646]](https://jira.appcelerator.org/browse/ALOY-1646)  ![Has been merged into Alloy](https://img.shields.io/badge/alloy-merged-green.png)
* [x] Added support for xml attributes with dotted notation (e.g. `font.fontSize`)  [[ALOY-1363]](https://jira.appcelerator.org/browse/ALOY-1363) ![Has been merged into Alloy](https://img.shields.io/badge/alloy-merged-green.png)
* [x] Added support for using `$.args` in XML views.  [[ALOY-1316]](https://jira.appcelerator.org/browse/ALOY-1316)   ![Has been merged into Alloy](https://img.shields.io/badge/alloy-merged-green.png)
* [x] Added support for using `$.*` in XML views. -- Anything that starts with "$." in an Alloy XML View will be used literally and not treated as a string.  ![Exclusive Turbo Feature](https://img.shields.io/badge/turbo-exclusive-blue.png) 
* [x] Added support for using `turbo.*` in XML views. -- Anything that starts with "turbo." in an Alloy XML View will be used literally and not treated as a string.  **[Required workaround for `node_modules` support to LiveView]**  [[TIMOB-27206]](https://jira.appcelerator.org/browse/TIMOB-27206)  ![Exclusive Turbo Feature](https://img.shields.io/badge/turbo-exclusive-blue.png) 
* [x] Added support for `__init()` function in controller that will be called before view is built. -- Allows `$.*` variables to be created and used in XML views.  ![Exclusive Turbo Feature](https://img.shields.io/badge/turbo-exclusive-blue.png) 
* [x] Added support for `visibility` property in XML Views with possible values of:  `collapse`, `expand`, and `visible`,  `hidden`  -- Allows collapsing of view in XML.  [[TIMOB-27307]](https://jira.appcelerator.org/browse/TIMOB-27307)  ![Exclusive Turbo Feature](https://img.shields.io/badge/turbo-exclusive-blue.png) 
* [x] Added constants: `Ti.UI.VISIBILITY_COLLAPSE`, `Ti.UI.VISIBILITY_EXPAND`, `Ti.UI.VISIBILITY_HIDDEN`, and `Ti.UI.VISIBILITY_VISIBLE`  ![Exclusive Turbo Feature](https://img.shields.io/badge/turbo-exclusive-blue.png) 
* [x] Added support for `modelName` XML attribute to be used with with `dataCollection` to assign variable name to current model [Defaults to `__currentModel`]  ![Exclusive Turbo Feature](https://img.shields.io/badge/turbo-exclusive-blue.png) 
* [x] Added support for `dataName` XML attribute to be used with with `dataCollection` to assign variable name to `model.__transform` [Defaults to `$model`] -- Allows developer to reference current model properties like `$model.myproperty` ![Exclusive Turbo Feature](https://img.shields.io/badge/turbo-exclusive-blue.png) 
* [x] Added support for adding code to XML View attributes when surrounded by '~'  [[ALOY-1699]](https://jira.appcelerator.org/browse/ALOY-1699)  ![Exclusive Turbo Feature](https://img.shields.io/badge/turbo-exclusive-blue.png) 
* [x] Added support for `script` element in XML View.  Add code by body or `src` attribute. [[ALOY-1700]](https://jira.appcelerator.org/browse/ALOY-1700)  [[Alloy PR]](https://github.com/appcelerator/alloy/pull/937)  ![Exclusive Turbo Feature](https://img.shields.io/badge/turbo-exclusive-blue.png) 
* [x] Added value alias `center` for `Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER` when used with `verticalAlign` XML attribute [[ALOY-1703]](https://jira.appcelerator.org/browse/ALOY-1703)  ![Exclusive Turbo Feature](https://img.shields.io/badge/turbo-exclusive-blue.png) 
* [x] Added property alias `text` for `Ti.UI.Button.title` when used as XML attribute  ![Exclusive Turbo Feature](https://img.shields.io/badge/turbo-exclusive-blue.png) 
* [x] Added property alias `src` for `Ti.UI.ImageView.image` when used as XML attribute  ![Exclusive Turbo Feature](https://img.shields.io/badge/turbo-exclusive-blue.png) 
* [x] Added support for using underscore (instead of lodash) with this tiapp.xml property:  `<property name="use-underscore"type="bool">true</property>`  ![Exclusive Turbo Feature](https://img.shields.io/badge/turbo-exclusive-blue.png) 
* [x] Added support for installing widgets via npm (without naming restrictions) [[ALOY-1704]](https://jira.appcelerator.org/browse/ALOY-1704) ![Exclusive Turbo Feature](https://img.shields.io/badge/turbo-exclusive-blue.png) 
* [x] Added support for using `WPATH()` in xml view attributes: [[ALOY-1253]](https://jira.appcelerator.org/browse/ALOY-1253)  [[Alloy PR]](https://github.com/appcelerator/alloy/pull/948)  ![Exclusive Turbo Feature](https://img.shields.io/badge/turbo-exclusive-blue.png) 
* [x] Added support for using `~/` as a shortcut for WPATH() in xml view attributes: [[ALOY-1714]](https://jira.appcelerator.org/browse/ALOY-1714) [[Alloy PR]](https://github.com/appcelerator/alloy/pull/951)   ![Exclusive Turbo Feature](https://img.shields.io/badge/turbo-exclusive-blue.png) 
* [x] Added support for using widget as primary control in xml view [[ALOY-1256]](https://jira.appcelerator.org/browse/ALOY-1256) [[Alloy PR]](https://github.com/appcelerator/alloy/pull/949)  ![Exclusive Turbo Feature](https://img.shields.io/badge/turbo-exclusive-blue.png) 
* [x] Added support for StackLayout control (with shortcut alias of `stack` and orientation property that defaults to `vertical`) in JavaScript and xml views  ![Exclusive Turbo Feature](https://img.shields.io/badge/turbo-exclusive-blue.png) 
* [x] Added support for VerticalLayout control (with shortcut alias of `vertical`) in JavaScript and xml views  ![Exclusive Turbo Feature](https://img.shields.io/badge/turbo-exclusive-blue.png) 
* [x] Added support for HorizontalLayout control (with shortcut alias of `horizontal`) in JavaScript and xml views  ![Exclusive Turbo Feature](https://img.shields.io/badge/turbo-exclusive-blue.png) 
* [x] Added support for AbsoluteLayout control (with shortcut alias of `absolute`) in JavaScript and xml views  ![Exclusive Turbo Feature](https://img.shields.io/badge/turbo-exclusive-blue.png) 
* [x] Added support for defining the primary entry point for the application (defaults to `index`).  Currently search order: `Alloy.main` → `Alloy.CFG.main` → Titanium Property: `app.main`. [[ALOY-1549]](https://jira.appcelerator.org/browse/ALOY-1549)  ![Exclusive Turbo Feature](https://img.shields.io/badge/turbo-exclusive-blue.png) 
* [x] Added support for `<style>` tag in XML views.  Also supports the `src` attribute (like the `<script>` tag) which allows users to reference a widget-wide `app.tss` file! [[ALOY-1729]](https://jira.appcelerator.org/browse/ALOY-1729)  ![Exclusive Turbo Feature](https://img.shields.io/badge/turbo-exclusive-blue.png) 
* [x] Partial workaround for Titanium and Alloy issue where relative path require statements are broken.  This only fixes static paths.  Fix for dynamic paths will be coming in upcoming release of `Turbo`.  [[TIMOB-28037]](https://jira.appcelerator.org/browse/TIMOB-28037)  ![Exclusive Turbo Feature](https://img.shields.io/badge/turbo-exclusive-blue.png) 


## 🔗 Related Links

⭐  [Geek Mobile Toolkit](https://www.npmjs.com/package/@geek/mobile) - Toolkit for creating, building, and managing mobile app projects.   
⭐  [Titanium Turbo Template (Default)](https://www.npmjs.com/package/@titanium/template-turbo-default) - Template for default Turbo app.  Based on the basic Alloy Template + some extra goodies.   
⭐  [Titanium Turbo Template (Next)](https://www.npmjs.com/package/@titanium/template-turbo-next) - Template for Titanium Turbo app (with extras).  Based on the default Turbo Template + some extras.   
⭐  [Titanium Turbo Template (Fully Loaded)](https://www.npmjs.com/package/@titanium/template-turbo-fully-loaded) - Template for Titanium Turbo app with all the bells and whistles!    
⭐  [Titanium Mobile](https://www.npmjs.com/package/titanium) - Open-source tool for building powerful, cross-platform native apps with JavaScript.   
⭐  [Alloy](https://www.npmjs.com/package/alloy) - MVC framework built on top of Titanium Mobile.   
⭐  [Appcelerator](https://www.npmjs.com/package/appcelerator) - Installer for the Appcelerator Platform tool   

## 📚Learn More

⭐  [Axway Developer Blog](https://devblog.axway.com)   
⭐  [Axway Developer YouTube Channel](https://youtube.com/axwaydev)   
⭐  [Axway Developer Portal](https://developer.axway.com)   

## 📣 Feedback

Have an idea or a comment?  [Join in the conversation here](https://github.com/brentonhouse/titanium-turbo/issues)! 

## ©️ Legal

Alloy is developed by Appcelerator and the community and is Copyright © 2012-Present by Appcelerator, Inc. All Rights Reserved.

Alloy is made available under the Apache Public License, version 2. See their license file for more information.

Appcelerator is a registered trademark of Appcelerator, Inc. Titanium is a registered trademark of Appcelerator, Inc. Please see the LEGAL information about using trademarks, privacy policy, terms of usage and other legal information at http://www.appcelerator.com/legal.