/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([],function(){"use strict";var e=function(r,t,f,n,u){if(typeof f=="boolean"){n=f;f=undefined}if(!u){u=0}if(!f){f=10}if(u>f){return false}if(r===t){return true}var i=typeof r==="number"&&typeof t==="number"&&isNaN(r)&&isNaN(t);if(i){return true}if(Array.isArray(r)&&Array.isArray(t)){if(!n&&r.length!==t.length){return false}if(r.length>t.length){return false}for(var a=0;a<r.length;a++){if(!e(r[a],t[a],f,n,u+1)){return false}}return true}if(typeof r=="object"&&typeof t=="object"){if(!r||!t){return false}if(r.constructor!==t.constructor){return false}if(!n&&Object.keys(r).length!==Object.keys(t).length){return false}if(r instanceof Node){return r.isEqualNode(t)}if(r instanceof Date){return r.valueOf()===t.valueOf()}for(var a in r){if(!e(r[a],t[a],f,n,u+1)){return false}}return true}return false};return e});