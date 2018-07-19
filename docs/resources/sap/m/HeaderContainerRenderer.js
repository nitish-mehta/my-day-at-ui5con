/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","sap/ui/core/library"],function(t,e){"use strict";var r=e.Orientation;var i={};i.render=function(e,i){var a=i.getTooltip_AsString();var d=i.getOrientation();if(d){d=t.sap.encodeCSS(d)}var s=t.sap.encodeCSS("sapMHdrCntrBG"+i.getBackgroundDesign());e.write("<div");e.writeControlData(i);if(a&&typeof a==="string"){e.writeAttributeEscaped("title",a)}e.addClass("sapMHdrCntr");e.addClass(d);if(i.getShowDividers()){e.addClass("sapMHrdrCntrDvdrs")}e.writeClasses();if(i.getHeight()){e.addStyle("height",i.getHeight())}else{e.addStyle("height",i.getOrientation()===r.Horizontal?"auto":"100%")}if(i.getWidth()){e.addStyle("width",i.getWidth())}else{e.addStyle("width",i.getOrientation()===r.Horizontal?"100%":"auto")}e.writeStyles();var n="";var o=i.getContent();for(var l=0;o&&l<o.length;l++){n+=o[l].getId()+" "}e.writeAttribute("aria-labelledby",n);e.write(">");e.write("<div");e.writeAttributeEscaped("id",i.getId()+"-scroll-area");e.addClass("sapMHdrCntrCntr");e.addClass(d);e.addClass(s);e.writeClasses();e.write(">");e.renderControl(i.getAggregation("_scrollContainer"));e.write("</div>");var g=i.getAggregation("_prevButton");if(g){e.write("<div");e.writeAttributeEscaped("id",i.getId()+"-prev-button-container");e.addClass("sapMHdrCntrBtnCntr");e.addClass("sapMHdrCntrLeft");e.addClass(d);e.writeClasses();e.write(">");e.renderControl(g);e.write("</div>")}g=i.getAggregation("_nextButton");if(g){e.write("<div");e.writeAttributeEscaped("id",i.getId()+"-next-button-container");e.addClass("sapMHdrCntrBtnCntr");e.addClass("sapMHdrCntrRight");e.addClass(d);e.writeClasses();e.write(">");e.renderControl(g);e.write("</div>")}e.write("<div");e.writeAttribute("id",i.getId()+"-after");e.writeAttribute("tabindex","0");e.write("/>");e.write("</div>")};return i},true);