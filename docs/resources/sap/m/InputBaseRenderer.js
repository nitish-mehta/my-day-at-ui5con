/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Renderer","sap/ui/core/library","sap/ui/Device"],function(e,t,i){"use strict";var a=t.TextDirection;var r=t.ValueState;var s={};s.render=function(t,s){var n=s.getValueState(),d=s.getTextDirection(),l=e.getTextAlign(s.getTextAlign(),d),u=sap.ui.getCore().getConfiguration().getAccessibility();t.write("<div");t.writeControlData(s);this.addOuterStyles(t,s);this.addControlWidth(t,s);t.writeStyles();t.addClass("sapMInputBase");this.addPaddingClass(t,s);this.addCursorClass(t,s);this.addOuterClasses(t,s);if(!s.getEnabled()){t.addClass("sapMInputBaseDisabled")}if(!s.getEditable()){t.addClass("sapMInputBaseReadonly")}if(n!==r.None){this.addValueStateClasses(t,s)}t.writeClasses();this.writeOuterAttributes(t,s);var o=s.getTooltip_AsString();if(o){t.writeAttributeEscaped("title",o)}t.write(">");this.prependInnerContent(t,s);if(s.bShowLabelAsPlaceholder){t.write("<span");t.writeAttribute("id",s.getId()+"-placeholder");if(l){t.addStyle("text-align",l)}this.addPlaceholderClasses(t,s);this.addPlaceholderStyles(t,s);t.writeClasses();t.writeStyles();t.write(">");t.writeEscaped(s._getPlaceholder());t.write("</span>")}t.write("<div ");t.addClass("sapMInputDivWrapper");if(!s.getEnabled()){t.addClass("sapMInputBaseDisabledInner")}else if(!s.getEditable()){t.addClass("sapMInputBaseReadonlyInner")}t.writeClasses();this.addWrapperStyles(t,s);t.writeStyles();t.write(">");this.openInputTag(t,s);this.writeInnerId(t,s);if(s.getName()){t.writeAttributeEscaped("name",s.getName())}if(!s.bShowLabelAsPlaceholder&&s._getPlaceholder()){t.writeAttributeEscaped("placeholder",s._getPlaceholder())}if(s.getMaxLength&&s.getMaxLength()>0){t.writeAttribute("maxlength",s.getMaxLength())}if(!s.getEnabled()){t.writeAttribute("disabled","disabled")}else if(!s.getEditable()){t.writeAttribute("readonly","readonly")}if(d!=a.Inherit){t.writeAttribute("dir",d.toLowerCase())}this.writeInnerValue(t,s);if(u){this.writeAccessibilityState(t,s)}if(i.browser.mozilla){if(o){t.writeAttributeEscaped("x-moz-errormessage",o)}else{t.writeAttribute("x-moz-errormessage"," ")}}this.writeInnerAttributes(t,s);t.addClass("sapMInputBaseInner");if(n!==r.None){this.addValueStateInnerClasses(t,s)}this.addInnerClasses(t,s);t.writeClasses();if(l){t.addStyle("text-align",l)}this.addInnerStyles(t,s);t.writeStyles();t.write(">");this.writeInnerContent(t,s);this.closeInputTag(t,s);t.write("</div>");this.writeDecorations(t,s);if(u){this.renderAriaLabelledBy(t,s);this.renderAriaDescribedBy(t,s)}t.write("</div>")};s.getAriaRole=function(e){return"textbox"};s.getAriaLabelledBy=function(e){if(this.getLabelledByAnnouncement(e)){return e.getId()+"-labelledby"}};s.getLabelledByAnnouncement=function(e){return e._getPlaceholder()||""};s.renderAriaLabelledBy=function(e,t){var i=this.getLabelledByAnnouncement(t);if(i){e.write("<span");e.writeAttribute("id",t.getId()+"-labelledby");e.writeAttribute("aria-hidden","true");e.addClass("sapUiInvisibleText");e.writeClasses();e.write(">");e.writeEscaped(i.trim());e.write("</span>")}};s.getAriaDescribedBy=function(e){if(this.getDescribedByAnnouncement(e)){return e.getId()+"-describedby"}};s.getDescribedByAnnouncement=function(e){return e.getTooltip_AsString()||""};s.renderAriaDescribedBy=function(e,t){var i=this.getDescribedByAnnouncement(t);if(i){e.write("<span");e.writeAttribute("id",t.getId()+"-describedby");e.writeAttribute("aria-hidden","true");e.addClass("sapUiInvisibleText");e.writeClasses();e.write(">");e.writeEscaped(i.trim());e.write("</span>")}};s.getAccessibilityState=function(e){var t=this.getAriaLabelledBy(e),i=this.getAriaDescribedBy(e),a=this.getAriaRole(e),s={};if(a){s.role=a}if(e.getValueState()===r.Error){s.invalid=true}if(t){s.labelledby={value:t.trim(),append:true}}if(i){s.describedby={value:i.trim(),append:true}}return s};s.writeAccessibilityState=function(e,t){e.writeAccessibilityState(t,this.getAccessibilityState(t))};s.openInputTag=function(e,t){e.write("<input")};s.writeInnerValue=function(e,t){e.writeAttributeEscaped("value",t.getValue())};s.addCursorClass=function(e,t){};s.addPaddingClass=function(e,t){e.addClass("sapMInputBaseWidthPadding")};s.addOuterStyles=function(e,t){};s.addControlWidth=function(e,t){if(t.getWidth()){e.addStyle("width",t.getWidth())}};s.addOuterClasses=function(e,t){};s.writeOuterAttributes=function(e,t){};s.addInnerStyles=function(e,t){};s.addWrapperStyles=function(e,t){};s.addInnerClasses=function(e,t){};s.writeInnerAttributes=function(e,t){};s.prependInnerContent=function(e,t){};s.writeInnerContent=function(e,t){};s.writeDecorations=function(e,t){};s.closeInputTag=function(e,t){};s.addPlaceholderStyles=function(e,t){};s.addPlaceholderClasses=function(e,t){e.addClass("sapMInputBasePlaceholder")};s.addValueStateInnerClasses=function(e,t){e.addClass("sapMInputBaseStateInner");e.addClass("sapMInputBase"+t.getValueState()+"Inner")};s.addValueStateClasses=function(e,t){e.addClass("sapMInputBaseState");e.addClass("sapMInputBase"+t.getValueState())};s.writeInnerId=function(e,t){e.writeAttribute("id",t.getId()+"-inner")};return s},true);