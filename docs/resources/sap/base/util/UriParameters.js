/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([],function(){"use strict";var e=function(e){this.mParams={};var t=e||"";if(t.indexOf("#")>=0){t=t.slice(0,t.indexOf("#"))}if(t.indexOf("?")>=0){t=t.slice(t.indexOf("?")+1);var r=t.split("&"),i={},n,o,a;for(var s=0;s<r.length;s++){n=r[s].split("=");o=decodeURIComponent(n[0]);a=n.length>1?decodeURIComponent(n[1].replace(/\+/g," ")):"";if(o){if(!Object.prototype.hasOwnProperty.call(i,o)){i[o]=[]}i[o].push(a)}}this.mParams=i}};e.prototype={};e.prototype.get=function(e,t){var r=Object.prototype.hasOwnProperty.call(this.mParams,e)?this.mParams[e]:[];return t===true?r:r[0]||null};return e});