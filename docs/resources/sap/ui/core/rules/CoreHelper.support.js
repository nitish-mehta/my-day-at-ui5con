/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global"],function(e){"use strict";var t={nodeHasUI5ParentControl:function(t,r){var n=["sap.ui.core.HTML"],a=e(t).control()[0];if(!a){return false}var f=a.getMetadata().getName(),u=n.indexOf(f)===-1,i=r.getElements().indexOf(a)>-1;return u&&i},getExternalStyleSheets:function(){return Array.from(document.styleSheets).filter(function(e){var t=sap.ui.getCore().getConfiguration().getTheme(),r="/themes/"+t+"/library.css",n=!e.href||!(e.href.indexOf(r)!==-1),a=!!e.rules;return n&&a})},getStyleSheetName:function(e){return e.href||"Inline"},getStyleSource:function(e){var t;if(e.href){t=e.href.substr(e.href.lastIndexOf("/"),e.href.length-1)}else{t=" <style> tag "}return t}};return t},true);