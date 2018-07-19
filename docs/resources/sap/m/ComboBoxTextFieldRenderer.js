/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","./InputBaseRenderer","sap/ui/core/Renderer"],function(t,e,a){"use strict";var i=a.extend(e);i.CSS_CLASS_COMBOBOXTEXTFIELD="sapMComboBoxTextField";i.writeInnerAttributes=function(t,e){t.writeAttribute("autocomplete","off");t.writeAttribute("autocorrect","off");t.writeAttribute("autocapitalize","off");t.writeAttribute("type","text")};i.writeOuterAttributes=function(t,e){if(sap.ui.getCore().getConfiguration().getAccessibility()){t.writeAttribute("role","combobox")}};i.getAriaRole=function(){};i.getAccessibilityState=function(t){var a=e.getAccessibilityState.call(this,t);a.autocomplete="both";return a};i.addOuterStyles=function(t,e){t.addStyle("max-width",e.getMaxWidth())};i.addOuterClasses=function(t,e){var a=i.CSS_CLASS_COMBOBOXTEXTFIELD;t.addClass(a);if(!e.getEnabled()){t.addClass(a+"Disabled")}if(!e.getEditable()){t.addClass(a+"Readonly")}};i.addPaddingClass=t.noop;i.addInnerClasses=function(t,e){var a=i.CSS_CLASS_COMBOBOXTEXTFIELD;t.addClass(a+"Inner");if(!e.getEditable()){t.addClass(a+"InnerReadonly")}if(e.getShowButton()){t.addClass(a+"InnerWidthExtraPadding")}};i.addValueStateClasses=function(t,e){var a=i.CSS_CLASS_COMBOBOXTEXTFIELD;t.addClass(a+"State");t.addClass(a+e.getValueState())};i.writeDecorations=function(t,e){if(e.getShowButton()){this.renderButton(t,e)}};i.renderButton=function(t,e){var a=e.getId(),i=a+"-arrow",r=sap.ui.getCore().getConfiguration().getAccessibility(),n=e.getAggregation("_buttonLabelText");t.write('<span tabindex="-1" ');t.writeAttribute("id",i);if(r){t.writeAttribute("role","button");t.writeAttribute("aria-labelledby",n.getId())}this.addButtonClasses(t,e);t.writeClasses();t.write(">");r&&t.renderControl(n);t.write("</span>")};i.addButtonClasses=function(t,e){var a=i.CSS_CLASS_COMBOBOXTEXTFIELD+"Arrow";t.addClass(a);if(!e.getEnabled()){t.addClass(a+"Disabled")}};return i},true);