/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","sap/ui/core/Renderer"],function(e,t){"use strict";var i={},r={MAIN_CLASS:"sapMSliderTooltipContainer"};i.render=function(e,t){var i=t.getAssociatedTooltipsAsControls();e.write("<div");e.writeControlData(t);e.addStyle("width",t.getWidth());e.writeStyles();e.writeClasses();e.write(">");e.write("<div");e.writeAttribute("id",t.getId()+"-container");e.addStyle("left","0%");e.addStyle("right","0%");e.addClass(r.MAIN_CLASS);if(!t.getEnabled()){e.addClass(r.MAIN_CLASS+"Disabled")}e.writeClasses();e.writeStyles();e.write(">");if(i&&i.length){i.forEach(function(t){e.renderControl(t)})}e.write("</div>");e.write("</div>")};return i},true);