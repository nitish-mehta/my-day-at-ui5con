/*
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/Device"],function(e){"use strict";var t={};var r=sap.ui.getCore().getLibraryResourceBundle("sap.m");t.render=function(t,r){t.write("<div");t.writeControlData(r);t.addClass("sapMColorPalette");t.writeClasses();t.writeAttribute("tabIndex","0");t.write(">");if(r._getShowDefaultColorButton()){this.renderDefaultColorButton(t,r);this.renderSeparator(t)}this.renderSwatches(t,r);if(r._getShowMoreColorsButton()){this.renderSeparator(t);this.renderMoreColorsButton(t,r);if(e.system.phone){this.renderSeparator(t)}}t.write("</div>")};t.renderSwatches=function(e,t){var i=t.getColors();e.write("<div");e.addClass("sapMColorPaletteContent");e.writeClasses();e.writeAccessibilityState(t,{role:"region",label:r.getText("COLOR_PALETTE_SWATCH_CONTAINER_TITLE")});e.write(">");i.forEach(function(r,i){this.renderSquare(e,t,r,i)},this);e.write("</div>")};t.renderSquare=function(e,t,i,o){var a=t._ColorsHelper.getNamedColor(i),s=r.getText("COLOR_PALETTE_PREDEFINED_COLOR",[o+1,a||r.getText("COLOR_PALETTE_PREDEFINED_COLOR_CUSTOM")]);e.write("<div");e.addClass("sapMColorPaletteSquare");e.writeClasses();e.writeAttribute("data-sap-ui-color",i);e.writeAttribute("tabindex","-1");e.writeAttribute("title",s);e.writeAccessibilityState(t,{role:"button",label:s});e.write(">");e.write("<div");e.addStyle("background-color",i);e.writeStyles();e.write("></div>");e.write("</div>")};t.renderSeparator=function(e){e.write("<div");e.addClass("sapMColorPaletteSeparator");e.writeClasses();e.write(">");e.write("<hr/>");e.write("</div>")};t.renderDefaultColorButton=function(e,t){e.renderControl(t._getDefaultColorButton())};t.renderMoreColorsButton=function(e,t){e.renderControl(t._getMoreColorsButton())};return t},true);