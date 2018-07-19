/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","sap/ui/test/_OpaLogger","sap/ui/test/_opaCorePlugin"],function(a,e,t){"use strict";var i=e.getLogger("sap.ui.test.autowaiter._navigationContainerWaiter#hasPending");function n(){var e="sap.m.NavContainer";var n=a.sap.getObject(e);if(sap.ui.lazyRequire._isStub(e)||!n){return false}return t.getAllControls(n).some(function(a){if(a._bNavigating){i.debug("The NavContainer "+a+" is currently navigating")}return a._bNavigating})}return{hasPending:n}});