/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/thirdparty/jquery","jquery.sap.global","sap/ui/Global"],function(t){"use strict";t.fn.control=function(a,r){var i=this.map(function(){var a;if(r){var i=t(this).closest("[data-sap-ui],[data-sap-ui-related]");a=i.attr("data-sap-ui-related")||i.attr("id")}else{a=t(this).closest("[data-sap-ui]").attr("id")}return sap.ui.getCore().byId(a)});return i.get(a)};return t});