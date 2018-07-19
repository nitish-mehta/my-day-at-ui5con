/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/Log"],function(e){"use strict";return function(){var t=Object.getOwnPropertyDescriptor(Document.prototype,"activeElement");if(!t){e.warning("activeElementFix: Unable to retrieve property descriptor for 'Document.prototype.activeElement'");return}var r=t.get;if(!r){e.warning("activeElementFix: Unable to retrieve getter of property 'Document.prototype.activeElement'");return}Object.defineProperty(Document.prototype,"activeElement",{configurable:true,enumerable:true,get:function(){try{return r.call(this)}catch(e){return null}}})}});