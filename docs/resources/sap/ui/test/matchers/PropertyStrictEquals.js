/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","./Matcher"],function(e,t){"use strict";return t.extend("sap.ui.test.matchers.PropertyStrictEquals",{metadata:{publicMethods:["isMatching"],properties:{name:{type:"string"},value:{type:"any"}}},isMatching:function(t){var a=this.getName(),r=t["get"+e.sap.charToUpperCase(a,0)];if(!r){this._oLogger.error("Control '"+t+"' does not have a property '"+a+"'");return false}var s=r.call(t);var i=s===this.getValue();if(!i){this._oLogger.debug("Control '"+t+"' property '"+a+"' has value '"+s+"' but should have value '"+this.getValue()+"'")}return i}})});