/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/thirdparty/jquery"],function(e){"use strict";return function(){if(!e.browser){e.browser=function(e){var r=/(webkit)[ \/]([\w.]+)/,i=/(opera)(?:.*version)?[ \/]([\w.]+)/,t=/(msie) ([\w.]+)/,n=/(mozilla)(?:.*? rv:([\w.]+))?/,e=e.toLowerCase(),o=r.exec(e)||i.exec(e)||t.exec(e)||e.indexOf("compatible")<0&&n.exec(e)||[],a={};if(o[1]){a[o[1]]=true;a.version=o[2]||"0";if(a.webkit){a.safari=true}}return a}(window.navigator.userAgent)}}});