/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","./library","sap/ui/core/Control","sap/ui/core/EnabledPropagator","sap/ui/core/IconPool","sap/ui/core/theming/Parameters","./SwitchRenderer"],function(t,e,i,s,a,r,n){"use strict";var o=e.touch;var u=e.SwitchType;var h=i.extend("sap.m.Switch",{metadata:{library:"sap.m",properties:{state:{type:"boolean",group:"Misc",defaultValue:false},customTextOn:{type:"string",group:"Misc",defaultValue:""},customTextOff:{type:"string",group:"Misc",defaultValue:""},enabled:{type:"boolean",group:"Data",defaultValue:true},name:{type:"string",group:"Misc",defaultValue:""},type:{type:"sap.m.SwitchType",group:"Appearance",defaultValue:u.Default}},associations:{ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}},events:{change:{parameters:{state:{type:"boolean"}}}},designtime:"sap/m/designtime/Switch.designtime"}});a.insertFontFaceStyle();s.apply(h.prototype,[true]);h.prototype._slide=function(t){if(t>h._OFFPOSITION){t=h._OFFPOSITION}else if(t<h._ONPOSITION){t=h._ONPOSITION}if(this._iCurrentPosition===t){return}this._iCurrentPosition=t;this.getDomRef("inner").style[sap.ui.getCore().getConfiguration().getRTL()?"right":"left"]=t+"px";this._setTempState(Math.abs(t)<h._SWAPPOINT)};h.prototype._setTempState=function(t){if(this._bTempState===t){return}this._bTempState=t;this.getDomRef("handle").setAttribute("data-sap-ui-swt",t?this._sOn:this._sOff)};h.prototype._setDomState=function(t){var e=this.getRenderer().CSS_CLASS,i=t?this._sOn:this._sOff,s=this.getDomRef();if(!s){return}var a=this.$("switch"),r=this.getDomRef("inner"),n=this.getDomRef("handle"),o=null;if(this.getName()){o=this.getDomRef("input");o.setAttribute("checked",t);o.setAttribute("value",i)}n.setAttribute("data-sap-ui-swt",i);this._getInvisibleElement().text(this.getInvisibleElementText(t));if(t){a.removeClass(e+"Off").addClass(e+"On");s.setAttribute("aria-checked","true")}else{a.removeClass(e+"On").addClass(e+"Off");s.setAttribute("aria-checked","false")}if(sap.ui.getCore().getConfiguration().getAnimation()){a.addClass(e+"Trans")}r.style.cssText=""};h.prototype._getInvisibleElement=function(){return this.$("invisible")};h.prototype.getInvisibleElementId=function(){return this.getId()+"-invisible"};h.prototype.getInvisibleElementText=function(t){var e=sap.ui.getCore().getLibraryResourceBundle("sap.m");var i="";switch(this.getType()){case u.Default:if(t){i=this.getCustomTextOn().trim()||e.getText("SWITCH_ON")}else{i=this.getCustomTextOff().trim()||e.getText("SWITCH_OFF")}break;case u.AcceptReject:if(t){i=e.getText("SWITCH_ARIA_ACCEPT")}else{i=e.getText("SWITCH_ARIA_REJECT")}break}return i};h._TRANSITIONTIME=Number(r.get("_sap_m_Switch_TransitionTime"))||0;h._ONPOSITION=Number(r.get("_sap_m_Switch_OnPosition"));h._OFFPOSITION=Number(r.get("_sap_m_Switch_OffPosition"));h._SWAPPOINT=Math.abs((h._ONPOSITION-h._OFFPOSITION)/2);h.prototype.onBeforeRendering=function(){var t=sap.ui.getCore().getLibraryResourceBundle("sap.m");this._sOn=this.getCustomTextOn()||t.getText("SWITCH_ON");this._sOff=this.getCustomTextOff()||t.getText("SWITCH_OFF")};h.prototype.ontouchstart=function(e){var i=e.targetTouches[0],s=this.getRenderer().CSS_CLASS,a=this.$("inner");e.setMarked();if(o.countContained(e.touches,this.getId())>1||!this.getEnabled()||e.button){return}this._iActiveTouchId=i.identifier;this._bTempState=this.getState();this._iStartPressPosX=i.pageX;this._iPosition=a.position().left;this._bDragging=false;t.sap.delayedCall(0,this,"focus");this.$("switch").addClass(s+"Pressed").removeClass(s+"Trans")};h.prototype.ontouchmove=function(e){e.setMarked();e.preventDefault();var i,s,a=o;if(!this.getEnabled()||e.button){return}t.sap.assert(a.find(e.touches,this._iActiveTouchId),"missing touchend");i=a.find(e.changedTouches,this._iActiveTouchId);if(!i||Math.abs(i.pageX-this._iStartPressPosX)<6){return}this._bDragging=true;s=(this._iStartPressPosX-i.pageX)*-1+this._iPosition;if(sap.ui.getCore().getConfiguration().getRTL()){s=-s}this._slide(s)};h.prototype.ontouchend=function(e){e.setMarked();var i,s=o,a=t.sap.assert;if(!this.getEnabled()||e.button){return}a(this._iActiveTouchId!==undefined,"expect to already be touching");i=s.find(e.changedTouches,this._iActiveTouchId);if(i){a(!s.find(e.touches,this._iActiveTouchId),"touchend still active");this.$("switch").removeClass(this.getRenderer().CSS_CLASS+"Pressed");this._setDomState(this._bDragging?this._bTempState:!this.getState());t.sap.delayedCall(h._TRANSITIONTIME,this,function(){var t=this.getState();this.setState(this._bDragging?this._bTempState:!t);if(t!==this.getState()){this.fireChange({state:this.getState()})}})}};h.prototype.ontouchcancel=h.prototype.ontouchend;h.prototype.onsapselect=function(e){var i;if(this.getEnabled()){e.setMarked();e.preventDefault();this.setState(!this.getState());i=this.getState();t.sap.delayedCall(h._TRANSITIONTIME,this,function(){this.fireChange({state:i})})}};h.prototype.setState=function(t){this.setProperty("state",t,true);this._setDomState(this.getState());return this};h.prototype.getAccessibilityInfo=function(){var t=sap.ui.getCore().getLibraryResourceBundle("sap.m"),e=this.getState(),i=t.getText("ACC_CTR_STATE_CHECKED")+" "+this.getInvisibleElementText(e);return{role:"checkbox",type:t.getText("ACC_CTR_TYPE_CHECKBOX"),description:i.trim(),focusable:this.getEnabled(),enabled:this.getEnabled()}};return h});