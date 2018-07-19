/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/thirdparty/jquery","sap/ui/Global"],function(e){"use strict";function t(e){return sap.ui.getCore().getUIArea(this.id)!=null}function i(e,t){return sap.ui.getCore().getUIArea(this.id)}e.fn.uiarea=function(e){var r=this.slice("[id]").filter(t).map(i).get();return typeof e==="number"?r[e]:r};return e});