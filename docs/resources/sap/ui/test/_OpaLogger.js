/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global"],function(e){"use strict";var t=[];var o=e.sap.log.Level.DEBUG;return{setLevel:function(a){var n=a&&a.toUpperCase();var r=n&&e.sap.log.Level[n];o=r||o;t.forEach(function(t){e.sap.log.setLevel(o,t)})},getLogger:function(a){t.push(a);var n=e.sap.log.getLogger(a,o);n.timestamp=function(t){if(console.timeStamp&&this.getLevel()>=e.sap.log.Level.DEBUG){console.timeStamp(t)}};return n},getLevel:function(){return o}}},true);