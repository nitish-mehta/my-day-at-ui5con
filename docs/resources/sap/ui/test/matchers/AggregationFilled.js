/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","./Matcher"],function(e,t){"use strict";return t.extend("sap.ui.test.matchers.AggregationFilled",{metadata:{publicMethods:["isMatching"],properties:{name:{type:"string"}}},isMatching:function(t){var r=this.getName(),a=t["get"+e.sap.charToUpperCase(r,0)];if(!a){this._oLogger.error("Control '"+t+"' does not have an aggregation called '"+r+"'");return false}var i=a.call(t);var g=e.isArray(i)?i:[i];var n=!!g.length;if(!n){this._oLogger.debug("Control '"+t+"' aggregation '"+r+"' is empty")}return n}})},true);