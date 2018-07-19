/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./toHex"],function(e){"use strict";var r=/[\x00-\x2c\x2f\x3a-\x40\x5b-\x5e\x60\x7b-\uffff]/g,f={};var n=function(r){var n=f[r];if(!n){var t=r.charCodeAt(0);if(t<128){n="%"+e(t,2)}else if(t<2048){n="%"+e(t>>6|192,2)+"%"+e(t&63|128,2)}else{n="%"+e(t>>12|224,2)+"%"+e(t>>6&63|128,2)+"%"+e(t&63|128,2)}f[r]=n}return n};var t=function(e){return e.replace(r,n)};return t});