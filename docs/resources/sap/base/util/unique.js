/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/assert"],function(r){"use strict";var a=function(a){r(a instanceof Array,"unique: a must be an array");var e=a.length;if(e>1){a.sort();var n=0;for(var i=1;i<e;i++){if(a[i]!==a[n]){a[++n]=a[i]}}if(++n<e){a.splice(n,e-n)}}return a};return a});