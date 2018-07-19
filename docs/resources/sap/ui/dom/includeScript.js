/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/assert"],function(e){"use strict";function t(e){var t={};if(e){for(var n in e){if(e.hasOwnProperty(n)){t[n]=e[n]}}}return t}function n(e,t,n,r){var i=document.createElement("SCRIPT");i.src=e;i.type="text/javascript";if(t&&typeof t==="object"){for(var o in t){if(t[o]!=null){i.setAttribute(o,t[o])}}}function f(){if(typeof n==="function"){n()}i.removeEventListener("load",f);i.removeEventListener("error",a)}function a(){if(typeof r==="function"){r()}i.removeEventListener("load",f);i.removeEventListener("error",a)}if(typeof n==="function"||typeof r==="function"){i.addEventListener("load",f);i.addEventListener("error",a)}var u=t&&t.id,s=u&&document.getElementById(u);if(s&&s.tagName==="SCRIPT"){s.parentNode.removeChild(s)}document.head.appendChild(i)}return function r(i,o,f,a){var u;if(typeof i==="string"){u=typeof o==="string"?{id:o}:o;n(i,u,f,a)}else{e(typeof i==="object"&&i.url,"vUrl must be an object and requires a URL");u=t(i.attributes);if(i.id){u.id=i.id}return new Promise(function(e,t){n(i.url,u,e,t)})}}});