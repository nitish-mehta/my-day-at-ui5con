/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./isPlainObject"],function(e){"use strict";var i=function(){var r,f,n,t,o,a,s=arguments[0]||{},u=1,c=arguments.length,l=false;if(typeof s==="boolean"){l=s;s=arguments[u]||{};u++}if(typeof s!=="object"&&typeof s!=="function"){s={}}for(;u<c;u++){o=arguments[u];for(t in o){r=s[t];n=o[t];if(s===n){continue}if(l&&n&&(e(n)||(f=Array.isArray(n)))){if(f){f=false;a=Array.isArray(r)?r:[]}else{a=r&&e(r)?r:{}}s[t]=i(l,a,n)}else{s[t]=n}}}return s};return i});