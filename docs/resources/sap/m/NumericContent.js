/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","./library","sap/ui/core/Control","sap/ui/core/IconPool","sap/m/Image","./NumericContentRenderer","jquery.sap.keycodes"],function(t,e,o,i,a,n){"use strict";var r=o.extend("sap.m.NumericContent",{metadata:{library:"sap.m",properties:{animateTextChange:{type:"boolean",group:"Behavior",defaultValue:true},formatterValue:{type:"boolean",group:"Data",defaultValue:false},icon:{type:"sap.ui.core.URI",group:"Appearance",defaultValue:null},iconDescription:{type:"string",group:"Accessibility",defaultValue:null},indicator:{type:"sap.m.DeviationIndicator",group:"Appearance",defaultValue:"None"},nullifyValue:{type:"boolean",group:"Behavior",defaultValue:true},scale:{type:"string",group:"Appearance",defaultValue:null},size:{type:"sap.m.Size",group:"Appearance",defaultValue:"Auto"},truncateValueTo:{type:"int",group:"Appearance",defaultValue:4},value:{type:"string",group:"Data",defaultValue:null},valueColor:{type:"sap.m.ValueColor",group:"Appearance",defaultValue:"Neutral"},width:{type:"sap.ui.core.CSSSize",group:"Appearance",defaultValue:null},withMargin:{type:"boolean",group:"Appearance",defaultValue:true},state:{type:"sap.m.LoadState",group:"Behavior",defaultValue:"Loaded"}},events:{press:{}}}});r.prototype.init=function(){this._rb=sap.ui.getCore().getLibraryResourceBundle("sap.m");this.setTooltip("{AltText}")};r.prototype.onBeforeRendering=function(){this.$().unbind("mouseenter",this._addTooltip);this.$().unbind("mouseleave",this._removeTooltip)};r.prototype.onAfterRendering=function(){this.$().bind("mouseenter",this._addTooltip.bind(this));this.$().bind("mouseleave",this._removeTooltip.bind(this));if(e.LoadState.Loaded==this.getState()||this.getAnimateTextChange()){t.sap.byId(this.getId()).animate({opacity:"1"},1e3)}};r.prototype._addTooltip=function(){this.$().attr("title",this.getTooltip_AsString())};r.prototype._removeTooltip=function(){this.$().attr("title",null)};r.prototype.exit=function(){if(this._oIcon){this._oIcon.destroy()}};r.prototype.getAltText=function(){var t=this.getValue();var o=this.getScale();var i;var a=this._rb.getText(("SEMANTIC_COLOR_"+this.getValueColor()).toUpperCase());var n="";if(this.getNullifyValue()){i="0"}else{i=""}if(this.getIconDescription()){n=n.concat(this.getIconDescription());n=n.concat("\n")}if(t){n=n.concat(t+o)}else{n=n.concat(i)}n=n.concat("\n");if(this.getIndicator()&&this.getIndicator()!==e.DeviationIndicator.None){n=n.concat(this._rb.getText(("NUMERICCONTENT_DEVIATION_"+this.getIndicator()).toUpperCase()));n=n.concat("\n")}n=n.concat(a);return n};r.prototype.getTooltip_AsString=function(){var t=this.getTooltip();var e=this.getAltText();if(typeof t==="string"||t instanceof String){e=t.split("{AltText}").join(e).split("((AltText))").join(e);return e}if(t){return t}else{return""}};r.prototype.setIcon=function(e){var o=!t.sap.equal(this.getIcon(),e);if(o){if(this._oIcon){this._oIcon.destroy();this._oIcon=undefined}if(e){this._oIcon=i.createControlByURI({id:this.getId()+"-icon-image",src:e},a)}}this._setPointerOnIcon();return this.setProperty("icon",e)};r.prototype._setPointerOnIcon=function(){if(this._oIcon&&this.hasListeners("press")){this._oIcon.addStyleClass("sapMPointer")}else if(this._oIcon&&this._oIcon.hasStyleClass("sapMPointer")){this._oIcon.removeStyleClass("sapMPointer")}};r.prototype.ontap=function(t){this.$().focus();this.firePress();t.preventDefault()};r.prototype.onkeyup=function(e){if(e.which===t.sap.KeyCodes.ENTER||e.which===t.sap.KeyCodes.SPACE){this.firePress();e.preventDefault()}};r.prototype.onkeydown=function(e){if(e.which===t.sap.KeyCodes.SPACE){e.preventDefault()}};r.prototype.attachEvent=function(t,e,i,a){o.prototype.attachEvent.call(this,t,e,i,a);if(this.hasListeners("press")){this.$().attr("tabindex",0).addClass("sapMPointer");this._setPointerOnIcon()}return this};r.prototype.detachEvent=function(t,e,i){o.prototype.detachEvent.call(this,t,e,i);if(!this.hasListeners("press")){this.$().removeAttr("tabindex").removeClass("sapMPointer");this._setPointerOnIcon()}return this};r.prototype._parseFormattedValue=function(t){var e=t.replace(String.fromCharCode(8206),"").replace(String.fromCharCode(8207),"");return{scale:e.replace(/[+-., \d]*(.*)$/g,"$1").trim().replace(/\.$/,""),value:e.replace(/([+-., \d]*).*$/g,"$1").trim()}};return r});