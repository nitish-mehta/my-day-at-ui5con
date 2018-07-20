/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","./FlexBoxStylingHelper","sap/m/library"],function(e,t,s){"use strict";var a=s.FlexDirection;var i=s.FlexRendertype;if(!e.support.flexBoxLayout&&!e.support.newFlexBoxLayout&&!e.support.ie10FlexBoxLayout){e.sap.log.warning("This browser does not support flexible box layouts natively.")}var l={};l.render=function(e,s){if(s.getRenderType()===i.List){e.write("<ul")}else{e.write("<div")}e.writeControlData(s);var r=s.getParent();if(r&&r.isA("sap.m.FlexBox")){e.addClass("sapMFlexItem");var n=s.getLayoutData();if(n instanceof sap.m.FlexItemData){t.setFlexItemStyles(e,n)}if(r.getRenderType()===i.List){e.write("<li")}}else if(s.getFitContainer()){e.addClass("sapMFlexBoxFit")}e.addClass("sapMFlexBox");if(s.getDisplayInline()){e.addClass("sapMFlexBoxInline")}if(s.getDirection()===a.Column||s.getDirection()===a.ColumnReverse){e.addClass("sapMVBox")}else{e.addClass("sapMHBox")}if(s.getDirection()===a.RowReverse||s.getDirection()===a.ColumnReverse){e.addClass("sapMFlexBoxReverse")}e.addClass("sapMFlexBoxJustify"+s.getJustifyContent());e.addClass("sapMFlexBoxAlignItems"+s.getAlignItems());e.addClass("sapMFlexBoxWrap"+s.getWrap());e.addClass("sapMFlexBoxAlignContent"+s.getAlignContent());e.addClass("sapMFlexBoxBG"+s.getBackgroundDesign());e.writeClasses();if(s.getHeight()){e.addStyle("height",s.getHeight())}if(s.getWidth()){e.addStyle("width",s.getWidth())}e.writeStyles();var d=s.getTooltip_AsString();if(d){e.writeAttributeEscaped("title",d)}e.write(">");l.renderItems(s,e);if(s.getRenderType()===i.List){e.write("</ul>")}else{e.write("</div>")}};l.renderItems=function(e,t){var s=e.getItems(),a="";for(var r=0;r<s.length;r++){if(s[r].isA("sap.m.FlexBox")||e.getRenderType()===i.Bare){a=""}else if(e.getRenderType()===i.List){a="li"}else{a="div"}l.renderItem(s[r],a,t)}};l.renderItem=function(s,a,i){if(a){i.write("<"+a);if(s instanceof sap.m.ScrollContainer){i.addClass("sapMFlexBoxScroll")}if(!s.getVisible()){i.addClass("sapUiHiddenPlaceholder")}}var r=s.getLayoutData();if(a&&!r){s.setAggregation("layoutData",new sap.m.FlexItemData,true);r=s.getLayoutData()}if(!(r instanceof sap.m.FlexItemData)){e.sap.log.warning(r+" set on "+s+" is not of type sap.m.FlexItemData")}else{if(a&&r.getId()){i.writeAttributeEscaped("id",r.getId())}if(r.getStyleClass()){l.addItemClass(e.sap.encodeHTML(r.getStyleClass()),s,a,i)}l.addItemClass("sapMFlexItemAlign"+r.getAlignSelf(),s,a,i);l.addItemClass("sapMFlexBoxBG"+r.getBackgroundDesign(),s,a,i);if(a){t.setFlexItemStyles(i,r)}}l.addItemClass("sapMFlexItem",s,a,i);if(a){i.writeStyles();i.writeClasses();i.write(">")}i.renderControl(s);if(a){i.write("</"+a+">")}};l.addItemClass=function(e,t,s,a){if(s){a.addClass(e)}else{t.addStyleClass(e)}};return l},true);