/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","./library","sap/ui/core/Control","sap/ui/core/InvisibleText","sap/ui/core/EnabledPropagator","sap/ui/core/library","sap/ui/Device","./LinkRenderer"],function(e,t,r,i,a,s,o,n){"use strict";var p=s.TextDirection;var l=s.TextAlign;var u=r.extend("sap.m.Link",{metadata:{interfaces:["sap.ui.core.IShrinkable","sap.ui.core.IFormContent"],library:"sap.m",designtime:"sap/m/designtime/Link.designtime",properties:{text:{type:"string",group:"Data",defaultValue:""},enabled:{type:"boolean",group:"Behavior",defaultValue:true},target:{type:"string",group:"Behavior",defaultValue:null},width:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},href:{type:"sap.ui.core.URI",group:"Data",defaultValue:null},validateUrl:{type:"boolean",group:"Data",defaultValue:false},wrapping:{type:"boolean",group:"Appearance",defaultValue:false},textAlign:{type:"sap.ui.core.TextAlign",group:"Appearance",defaultValue:l.Initial},textDirection:{type:"sap.ui.core.TextDirection",group:"Appearance",defaultValue:p.Inherit},subtle:{type:"boolean",group:"Behavior",defaultValue:false},emphasized:{type:"boolean",group:"Behavior",defaultValue:false}},associations:{ariaDescribedBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaDescribedBy"},ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}},events:{press:{allowPreventDefault:true}}}});a.call(u.prototype);u.prototype.onBeforeRendering=function(){};u.prototype.onsapspace=function(e){if(this.getEnabled()||this.getHref()){e.setMarked();e.preventDefault()}};u.prototype.onkeyup=function(t){if(t.which===e.sap.KeyCodes.SPACE){this._handlePress(t);if(this.getHref()&&!t.isDefaultPrevented()){t.preventDefault();t.setMarked();var r=document.createEvent("MouseEvents");r.initEvent("click",false,true);this.getDomRef().dispatchEvent(r)}}};u.prototype._handlePress=function(e){if(this.getEnabled()){e.setMarked();if(!this.firePress()||!this.getHref()){e.preventDefault()}}else{e.preventDefault()}};u.prototype.onsapenter=u.prototype._handlePress;if(o.support.touch){u.prototype.ontap=u.prototype._handlePress}else{u.prototype.onclick=u.prototype._handlePress}u.prototype.ontouchstart=function(e){if(this.getEnabled()){e.setMarked()}};u.prototype.setText=function(e){var t=this.$();this.setProperty("text",e,true);e=this.getProperty("text");if(this.writeText){this.writeText(e)}else{t.text(e)}if(e){t.attr("tabindex","0")}else{t.attr("tabindex","-1")}return this};u.prototype.setHref=function(t){var r=this._isHrefValid(t);this.setProperty("href",t,true);if(!r){this.$().removeAttr("href");e.sap.log.warning(this+": The href tag of the link was not set since it's not valid.");return this}if(this.getEnabled()){t=this.getProperty("href");if(!t){this.$().removeAttr("href")}else{this.$().attr("href",t)}}return this};u.prototype.setSubtle=function(e){this.setProperty("subtle",e,true);var t=this.$();if(t.length){t.toggleClass("sapMLnkSubtle",e);if(e){u._addToDescribedBy(t,this._sAriaLinkSubtleId)}else{u._removeFromDescribedBy(t,this._sAriaLinkSubtleId)}}if(e&&!u.prototype._sAriaLinkSubtleId){u.prototype._sAriaLinkSubtleId=i.getStaticId("sap.m","LINK_SUBTLE")}return this};u.prototype.setEmphasized=function(e){this.setProperty("emphasized",e,true);var t=this.$();if(t.length){t.toggleClass("sapMLnkEmphasized",e);if(e){u._addToDescribedBy(t,this._sAriaLinkEmphasizedId)}else{u._removeFromDescribedBy(t,this._sAriaLinkEmphasizedId)}}if(e&&!u.prototype._sAriaLinkEmphasizedId){u.prototype._sAriaLinkEmphasizedId=i.getStaticId("sap.m","LINK_EMPHASIZED")}return this};u.prototype.setWrapping=function(e){this.setProperty("wrapping",e,true);this.$().toggleClass("sapMLnkWrapping",e);return this};u.prototype.setEnabled=function(e){e=this.validateProperty("enabled",e);if(e!==this.getProperty("enabled")){this.setProperty("enabled",e,true);var t=this.$();t.toggleClass("sapMLnkDsbl",!e);if(e){t.attr("disabled",false);if(this.getText()){t.attr("tabindex","0")}else{t.attr("tabindex","-1")}t.removeAttr("aria-disabled");if(this.getHref()){t.attr("href",this.getHref())}}else{t.attr("disabled",true);t.attr("tabindex","-1");t.attr("aria-disabled",true);t.removeAttr("href")}}return this};u.prototype.setWidth=function(e){this.setProperty("width",e,true);this.$().toggleClass("sapMLnkMaxWidth",!e);this.$().css("width",e);return this};u.prototype.setTarget=function(e){this.setProperty("target",e,true);if(!e){this.$().removeAttr("target")}else{this.$().attr("target",e)}return this};u.prototype._isHrefValid=function(t){return this.getValidateUrl()?e.sap.validateUrl(t):true};u._addToDescribedBy=function(e,t){var r=e.attr("aria-describedby");if(r){e.attr("aria-describedby",r+" "+t)}else{e.attr("aria-describedby",t)}};u._removeFromDescribedBy=function(e,t){var r=e.attr("aria-describedby");if(r&&r.indexOf(t)!==-1){r=r.replace(t,"");if(r.length>1){e.attr("aria-describedby",r)}else{e.removeAttr("aria-describedby")}}};u.prototype.getAccessibilityInfo=function(){return{role:"link",type:sap.ui.getCore().getLibraryResourceBundle("sap.m").getText("ACC_CTR_TYPE_LINK"),description:this.getText()||this.getHref()||"",focusable:this.getEnabled(),enabled:this.getEnabled()}};u.prototype.getFormDoNotAdjustWidth=function(){return true};return u});