/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/Log","sap/base/util/getObject"],function(e,t){"use strict";function n(e,t,n){Object.defineProperty(e,t,{value:n,writable:true,configurable:true})}var r=function(e,t,r){var u={configurable:true,get:function(){n(e,t,undefined);var u=r();n(e,t,u);return u},set:function(r){n(e,t,r)}};Object.defineProperty(e,t,u)};return r});