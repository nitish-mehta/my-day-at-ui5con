/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/util/isWindow"],function(r){"use strict";var t=function(t){var e,n={}.hasOwnProperty;if(typeof t!=="object"||t.nodeType||r(t)){return false}if(t.constructor&&!n.call(t,"constructor")&&!n.call(t.constructor.prototype||{},"isPrototypeOf")){return false}for(e in t){}return e===undefined||n.call(t,e)};return t});