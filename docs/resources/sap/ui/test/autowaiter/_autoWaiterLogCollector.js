/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global"],function(n){"use strict";var t=[];var e={onLogEntry:function(n){if(n.component.match(/^sap.ui.test.autowaiter.*#hasPending$/)){t.push(n.message)}}};return{start:function(){n.sap.log.addLogListener(e)},getAndClearLog:function(){var n=t.join("\n");t.length=0;return n},stop:function(){t.length=0;n.sap.log.removeLogListener(e)}}},true);