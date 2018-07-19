/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","sap/ui/thirdparty/URI"],function(r,t){"use strict";var a=(new t).search(true);var e=["false",undefined].indexOf(a.opaFrameIEStackTrace)<0;function n(){var r=new Error;var t="No stack trace available";if(r.stack){t=r.stack}else if(e){try{throw r}catch(r){t=r.stack}}return t.replace(/^Error\s/,"")}function i(r){return r.toString().replace(/\"/g,"'")}function c(t){try{return Array.prototype.map.call(t,a).join("; ")}catch(r){return"'"+t+"'"}function a(t){if(r.isFunction(t)){return"'"+i(t)+"'"}if(r.isArray(t)){var e=Array.prototype.map.call(t,a);return"["+e.join(", ")+"]"}if(r.isPlainObject(t)){return JSON.stringify(t)}return"'"+t.toString()+"'"}}return{resolveStackTrace:n,functionToString:i,argumentsToString:c}},true);