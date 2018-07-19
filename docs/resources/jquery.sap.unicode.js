/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","sap/ui/Device"],function(i,e){"use strict";var r,n;if(!String.prototype.normalize&&!e.browser.mobile){n=sap.ui.requireSync("sap/base/strings/normalize-polyfill");n.apply();r=n.isStringNFC}else{r=function(i){return i.normalize("NFC")===i}}i.sap.isStringNFC=r;return i});