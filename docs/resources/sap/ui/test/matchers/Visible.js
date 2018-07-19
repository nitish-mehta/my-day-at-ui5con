/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./Matcher"],function(e){"use strict";return e.extend("sap.ui.test.matchers.Visible",{isMatching:function(e){if(!e.getDomRef()){this._oLogger.debug("Control '"+e+"'' is not rendered");return false}var i=e.$().is(":visible");if(!i){this._oLogger.debug("Control '"+e+"' is not visible")}return i}})});