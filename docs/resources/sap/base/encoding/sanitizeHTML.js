/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/assert","sap/base/util/URLWhiteList","sap/ui/thirdparty/caja-html-sanitizer"],function(i,t){"use strict";var e=function(e,a){i(window.html&&window.html.sanitize,"Sanitizer should have been loaded");a=a||{uriRewriter:function(i){if(t.validate(i)){return i}}};var n=a.tagPolicy||window.html.makeTagPolicy(a.uriRewriter,a.tokenPolicy);return window.html.sanitizeWithPolicy(e,n)};return e});