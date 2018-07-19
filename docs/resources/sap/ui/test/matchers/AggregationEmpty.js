/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./Matcher","./AggregationLengthEquals"],function(t,e){"use strict";var i=new e({length:0});return t.extend("sap.ui.test.matchers.AggregationEmpty",{metadata:{publicMethods:["isMatching"],properties:{name:{type:"string"}}},isMatching:function(t){i.setName(this.getName());return i.isMatching(t)}})},true);