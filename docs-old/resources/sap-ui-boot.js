/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
(function(){"use strict";var e,t,r;e=document.getElementById("sap-ui-bootstrap");if(e){t=/^(?:.*\/)?resources\//.exec(e.getAttribute("src"));if(t){r=t[0]}}if(r==null){throw new Error("sap-ui-boot.js: could not identify script tag!")}function i(e,t){var i=e.length,n=0;function o(e){i--;if(e.type==="error"){n++}e.target.removeEventListener("load",o);e.target.removeEventListener("error",o);if(i===0&&n===0&&t){t()}}for(var s=0;s<e.length;s++){var a=document.createElement("script");a.addEventListener("load",o);a.addEventListener("error",o);a.src=r+e[s];document.head.appendChild(a)}}i(["sap/ui/thirdparty/baseuri.js","sap/ui/thirdparty/es6-promise.js","sap/ui/thirdparty/es6-string-methods.js"],function(){i(["ui5loader.js"],function(){sap.ui.loader.config({async:true});i(["ui5loader-autoconfig.js"])})})})();