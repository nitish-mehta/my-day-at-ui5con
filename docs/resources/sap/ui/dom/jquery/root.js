/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/thirdparty/jquery","./uiarea","./control","jquery.sap.global","sap/ui/Global"],function(t,e,r){"use strict";function i(t,e){return t.getUIArea().getInterface()}t.fn.root=function(t){if(t){sap.ui.getCore().setRoot(this.get(0),t);return this}var e=this.control();if(e.length>0){return e.map(i)}var r=this.uiarea();if(r.length>0){return r}this.each(function(t){sap.ui.getCore().createUIArea(this)});return this};return t});