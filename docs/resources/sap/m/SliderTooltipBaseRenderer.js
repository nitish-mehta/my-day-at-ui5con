/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","sap/ui/core/Renderer"],function(e,r){"use strict";var t={};t.CSS_CLASS="sapMSliderTooltip";t.render=function(e,r){e.write("<div");e.writeControlData(r);e.writeClasses();e.write(">");this.renderTooltipContent(e,r);e.write("</div>")};t.renderTooltipContent=function(e,r){};return t},true);