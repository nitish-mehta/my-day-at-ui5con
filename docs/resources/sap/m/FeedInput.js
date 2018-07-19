/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","./library","sap/ui/core/Control","sap/ui/core/IconPool","sap/m/TextArea","sap/m/Button","./FeedInputRenderer"],function(t,e,o,r,i,s,a){"use strict";var n=e.ButtonType;var u=o.extend("sap.m.FeedInput",{metadata:{library:"sap.m",designtime:"sap/m/designtime/FeedInput.designtime",properties:{enabled:{type:"boolean",group:"Behavior",defaultValue:true},maxLength:{type:"int",group:"Behavior",defaultValue:0},placeholder:{type:"string",group:"Appearance",defaultValue:"Post something here"},value:{type:"string",group:"Data",defaultValue:null},icon:{type:"sap.ui.core.URI",group:"Data",defaultValue:null},showIcon:{type:"boolean",group:"Behavior",defaultValue:true},iconDensityAware:{type:"boolean",group:"Appearance",defaultValue:true},buttonTooltip:{type:"sap.ui.core.TooltipBase",group:"Accessibility",defaultValue:"Submit"},ariaLabelForPicture:{type:"string",group:"Accessibility",defaultValue:null}},events:{post:{parameters:{value:{type:"string"}}}}}});u.prototype.init=function(){var t=sap.ui.getCore().getLibraryResourceBundle("sap.m");this.setProperty("placeholder",t.getText("FEEDINPUT_PLACEHOLDER"),true);this.setProperty("buttonTooltip",t.getText("FEEDINPUT_SUBMIT"),true)};u.prototype.exit=function(){if(this._oTextArea){this._oTextArea.destroy()}if(this._oButton){this._oButton.destroy()}if(this._oImageControl){this._oImageControl.destroy()}};u.prototype.setIconDensityAware=function(t){this.setProperty("iconDensityAware",t,true);var e=sap.ui.require("sap/m/Image");if(this._getImageControl()instanceof e){this._getImageControl().setDensityAware(t)}return this};u.prototype.setMaxLength=function(t){this.setProperty("maxLength",t,true);this._getTextArea().setMaxLength(t);return this};u.prototype.setValue=function(t){this.setProperty("value",t,true);this._getTextArea().setValue(t);this._enablePostButton();return this};u.prototype.setPlaceholder=function(t){this.setProperty("placeholder",t,true);this._getTextArea().setPlaceholder(t);return this};u.prototype.setEnabled=function(t){this.setProperty("enabled",t,true);this._getTextArea().setEnabled(t);this._enablePostButton();return this};u.prototype.setButtonTooltip=function(t){this.setProperty("buttonTooltip",t,true);this._getPostButton().setTooltip(t);return this};u.prototype._getTextArea=function(){if(!this._oTextArea){this._oTextArea=new i(this.getId()+"-textArea",{rows:3,value:null,maxLength:this.getMaxLength(),placeholder:this.getPlaceholder(),height:"100%",liveChange:t.proxy(function(t){var e=t.getParameter("value");this.setProperty("value",e,true);this._enablePostButton()},this)});this._oTextArea.setParent(this)}return this._oTextArea};u.prototype._getPostButton=function(){if(!this._oButton){this._oButton=new s(this.getId()+"-button",{enabled:false,type:n.Default,icon:"sap-icon://feeder-arrow",tooltip:this.getButtonTooltip(),press:t.proxy(function(){this._oTextArea.focus();this.firePost({value:this.getValue()});this.setValue(null)},this)});this._oButton.setParent(this)}return this._oButton};u.prototype._enablePostButton=function(){var t=this._isControlEnabled();var e=this._getPostButton();e.setEnabled(t)};u.prototype._isControlEnabled=function(){var e=this.getValue();return this.getEnabled()&&t.type(e)==="string"&&e.trim().length>0};u.prototype._getImageControl=function(){var t=this.getIcon()||r.getIconURI("person-placeholder"),o=this.getId()+"-icon",i={src:t,alt:this.getAriaLabelForPicture(),densityAware:this.getIconDensityAware(),decorative:false,useIconTooltip:false},s=["sapMFeedInImage"];this._oImageControl=e.ImageHelper.getImageControl(o,this._oImageControl,this,i,s);return this._oImageControl};return u});