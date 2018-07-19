/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","sap/ui/test/_OpaLogger","sap/ui/test/autowaiter/_XHRWaiter","sap/ui/test/autowaiter/_timeoutWaiter","sap/ui/test/autowaiter/_promiseWaiter","sap/ui/test/autowaiter/_navigationContainerWaiter","sap/ui/test/autowaiter/_UIUpdatesWaiter"],function(t,a,e,i,r,o,u){"use strict";var n=a.getLogger("sap.ui.test.autowaiter._autoWaiter");var s=[o,u,e,r,i];return{hasToWait:function(){var t=false;s.forEach(function(a){if(!t&&a.hasPending()){t=true}});if(!t){n.timestamp("opa.autoWaiter.syncPoint");n.debug("AutoWaiter syncpoint")}return t},extendConfig:function(t){s.forEach(function(a){if(a.extendConfig){a.extendConfig(t)}})}}},true);