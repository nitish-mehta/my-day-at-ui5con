/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Renderer","sap/m/library","sap/ui/core/library"],function(e,i,a){"use strict";var t=a.TextDirection;var s=i.LabelDesign;var l={};l.render=function(e,i){var a=l,r=i.getTextDirection(),d=i.getTextAlign(),n=i.getWidth(),p=i.getText(),g=i.getTooltip_AsString(),o=i.getLabelForRendering(),b=o?"label":"span",f=i.isDisplayOnly(),c=i.getVAlign();e.write("<"+b);e.writeControlData(i);e.addClass("sapMLabel");e.addClass("sapUiSelectable");if(i.isWrapping()){e.addClass("sapMLabelWrapped")}if(i.getDesign()==s.Bold){e.addStyle("font-weight","bold")}if(i.isRequired()){e.addClass("sapMLabelRequired")}if(o){sap.ui.core.LabelEnablement.writeLabelForAttribute(e,i)}else if(i.getParent()instanceof sap.m.Toolbar){e.addClass("sapMLabelTBHeader")}if(r!==t.Inherit){e.writeAttribute("dir",r.toLowerCase())}if(n){e.addStyle("width",n)}else{e.addClass("sapMLabelMaxWidth")}if(d){d=a.getTextAlign(d,r);if(d){e.addStyle("text-align",d)}}if(p==""){e.addClass("sapMLabelNoText")}if(f){e.addClass("sapMLabelDisplayOnly")}if(c!=sap.ui.core.VerticalAlign.Inherit){e.addStyle("vertical-align",c.toLowerCase())}e.writeStyles();e.writeClasses();if(g){e.writeAttributeEscaped("title",g)}e.write(">");e.write('<bdi id="'+i.getId()+'-bdi" >');if(p){e.writeEscaped(p)}e.write("</bdi>");e.write("</"+b+">");if(!o&&i.isDisplayOnly&&i.isDisplayOnly()){e.write('<span id="'+i.getId()+'-colon" class="sapUiPseudoInvisibleText">:</span>')}};l.getTextAlign=e.getTextAlign;return l},true);