/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./toHex"],function(r){"use strict";var e=/[\x00-\x2b\x2d\x2f\x3a-\x40\x5b-\x5e\x60\x7b-\xff\u2028\u2029]/g,x={};var u=function(e){var u=x[e];if(!u){var n=e.charCodeAt(0);if(n<256){u="\\x"+r(n,2)}else{u="\\u"+r(n,4)}x[e]=u}return u};var n=function(r){return r.replace(e,u)};return n});