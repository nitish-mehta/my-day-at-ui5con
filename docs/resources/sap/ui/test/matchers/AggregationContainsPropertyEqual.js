/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","./Matcher"],function(e,t){"use strict";return t.extend("sap.ui.test.matchers.AggregationContainsPropertyEqual",{metadata:{publicMethods:["isMatching"],properties:{aggregationName:{type:"string"},propertyName:{type:"string"},propertyValue:{type:"any"}}},isMatching:function(t){var r=this.getAggregationName(),a=this.getPropertyName(),o=this.getPropertyValue(),i=t["get"+e.sap.charToUpperCase(r,0)];if(!i){this._oLogger.error("Control '"+t+"' does not have an aggregation called '"+r+"'");return false}var n=i.call(t);var g=e.isArray(n)?n:[n];var s=g.some(function(t){var r=t["get"+e.sap.charToUpperCase(a,0)];if(!r){return false}return r.call(t)===o});if(!s){this._oLogger.debug("Control '"+t+"' has no property '"+a+"' with the value '"+o+"' in the aggregation '"+r+"'")}return s}})},true);