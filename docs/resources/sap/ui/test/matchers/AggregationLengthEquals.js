/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","./Matcher"],function(e,t){"use strict";return t.extend("sap.ui.test.matchers.AggregationLengthEquals",{metadata:{publicMethods:["isMatching"],properties:{name:{type:"string"},length:{type:"int"}}},isMatching:function(t){var a=this.getName(),r=t["get"+e.sap.charToUpperCase(a,0)];if(!r){this._oLogger.error("Control '"+t+"' does not have an aggregation called '"+a+"'");return false}var i=r.call(t);var n=e.isArray(i)?i:[i];var g=n.length;var s=this.getLength();var o=g===s;if(!o){this._oLogger.debug("Control '"+t+"' has "+g+" Objects in the aggregation '"+a+"' but it should have "+s)}return o}})},true);