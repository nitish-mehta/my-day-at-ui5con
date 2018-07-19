/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","./ServiceFactory"],function(e,t){"use strict";var r=Object.create(null);var n=Object.create(null);n.register=function(n,s){e.sap.assert(n,"sServiceFactoryName must not be empty, null or undefined");e.sap.assert(s instanceof t,"oServiceFactory must be an instance of sap.ui.core.service.ServiceFactory");r[n]=s;return this};n.unregister=function(t){e.sap.assert(t,"sServiceFactoryName must not be empty, null or undefined");delete r[t];return this};n.get=function(e){return r[e]};return n},true);