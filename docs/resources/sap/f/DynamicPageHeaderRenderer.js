/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([],function(){"use strict";var e={};e.render=function(e,a){var t=a._getState();e.write("<header");e.writeControlData(a);e.writeAccessibilityState({role:"region"});e.addClass("sapContrastPlus");e.addClass("sapFDynamicPageHeader");if(t.headerHasContent){e.addClass("sapFDynamicPageHeaderWithContent")}if(t.headerPinnable){e.addClass("sapFDynamicPageHeaderPinnable")}e.writeClasses();e.write(">");this._renderHeaderContent(e,t);e.renderControl(t.collapseButton);if(t.headerPinnable){e.renderControl(t.pinButton)}e.write("</header>")};e._renderHeaderContent=function(e,a){if(a.headerHasContent){e.write("<div");e.addClass("sapFDynamicPageHeaderContent");e.writeClasses();e.write(">");a.content.forEach(e.renderControl);e.write("</div>")}};return e},true);