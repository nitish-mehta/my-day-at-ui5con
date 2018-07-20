/*!
* UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
*/
sap.ui.define(["jquery.sap.global","./library","./SliderUtilities","./SliderTooltipBase","sap/ui/core/Control","sap/ui/core/library","./delegate/ValueStateMessage","./SliderTooltipRenderer"],function(e,t,a,o,i,l,r,s){"use strict";var u=l.ValueState;var p=o.extend("sap.m.SliderTooltip",{metadata:{library:"sap.m",properties:{value:{type:"float",group:"Data",defaultValue:0,bindable:"bindable"},min:{type:"float",group:"Data",defaultValue:0},max:{type:"float",group:"Data",defaultValue:100},editable:{type:"boolean",defaultValue:false},step:{type:"float",group:"Data",defaultValue:1},valueState:{type:"sap.ui.core.ValueState",group:"Appearance",defaultValue:u.None},width:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null}},associations:{ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}},events:{change:{parameters:{value:{type:"float"}}}}}});p.prototype.init=function(){this._oValueStateMessage=new r(this);this._fLastValidValue=0};p.prototype.getValueStateText=function(){return""};p.prototype.getFocusDomRef=function(){return this.$("input")};p.prototype.getDomRefForValueStateMessage=function(){return this.getDomRef()};p.prototype.setValue=function(e){e=this.validateProperty("value",e);o.prototype.setValue.call(this,e);return this.setProperty("value",e,true)};p.prototype.sliderValueChanged=function(e){if(this.getDomRef()){this.getFocusDomRef().val(e)}this._fLastValidValue=e;this.setValueState(u.None)};p.prototype.setEditable=function(e){e=this.validateProperty("editable",e);if(this.getDomRef()){this.getFocusDomRef().toggleClass(a.CONSTANTS.TOOLTIP_CLASS+"NotEditable")}return this.setProperty("editable",e,true)};p.prototype.setValueState=function(e){var t,o;e=this.validateProperty("valueState",e);this.setProperty("valueState",e,true);t=e===u.Error;o=this.getDomRef()&&t;this._oValueStateMessage[o?"open":"close"]();this.$().toggleClass(a.CONSTANTS.TOOLTIP_CLASS+"ErrorState",t);return this};p.prototype.onfocusout=function(e){var t=parseFloat(this.getFocusDomRef().val());this._validateValue(t)};p.prototype.onsapenter=function(e){var t=parseFloat(this.getFocusDomRef().val());this._validateValue(t)};p.prototype.onsapescape=function(e){this.sliderValueChanged(this._fLastValidValue);this.setValueState(u.None)};p.prototype._validateValue=function(e){if(this._isValueValid(e)){this.sliderValueChanged(e);this.fireChange({value:e})}else{this.setValueState(u.Error)}};p.prototype._isValueValid=function(e){return!(isNaN(e)||e<this.getMin()||e>this.getMax())};return p});