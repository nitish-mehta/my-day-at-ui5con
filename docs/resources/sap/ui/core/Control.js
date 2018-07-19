/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","./CustomStyleClassSupport","./Element","./UIArea","./RenderManager","./ResizeHandler","./BusyIndicatorUtils","./BlockLayerUtils"],function(t,e,i,s,o,r,a,l){"use strict";var n=i.extend("sap.ui.core.Control",{metadata:{stereotype:"control",abstract:true,publicMethods:["placeAt","attachBrowserEvent","detachBrowserEvent","getControlsByFieldGroup","triggerValidateFieldGroup","checkFieldGroupIds"],library:"sap.ui.core",properties:{blocked:{type:"boolean",defaultValue:false},busy:{type:"boolean",defaultValue:false},busyIndicatorDelay:{type:"int",defaultValue:1e3},busyIndicatorSize:{type:"sap.ui.core.BusyIndicatorSize",defaultValue:"Medium"},visible:{type:"boolean",group:"Appearance",defaultValue:true},fieldGroupIds:{type:"string[]",defaultValue:[]}},events:{validateFieldGroup:{enableEventBubbling:true,parameters:{fieldGroupIds:{type:"string[]"}}}}},constructor:function(t,e){this.bAllowTextSelection=true;i.apply(this,arguments);this.bOutput=this.getDomRef()!=null},renderer:null});n.prototype.clone=function(){var t=i.prototype.clone.apply(this,arguments);if(this.aBindParameters){for(var e=0,s=this.aBindParameters.length;e<s;e++){var o=this.aBindParameters[e];t.attachBrowserEvent(o.sEventType,o.fnHandler,o.oListener!==this?o.oListener:undefined)}}t.bAllowTextSelection=this.bAllowTextSelection;return t};e.apply(n.prototype);n.prototype.isActive=function(){return t.sap.domById(this.sId)!=null};n.prototype.invalidate=function(t){var e;if(this.bOutput&&(e=this.getUIArea())){if(!this._bIsBeingDestroyed){e.addInvalidatedControl(this)}}else{var i=this.getParent();if(i&&(this.bOutput||!(this.getVisible&&this.getVisible()===false))){i.invalidate(this)}}};n.prototype.rerender=function(){s.rerenderControl(this)};n.prototype.getDomRef=function(t){if(this.bOutput===false&&!this.oParent){return null}return i.prototype.getDomRef.call(this,t)};n.prototype.allowTextSelection=function(t){this.bAllowTextSelection=t;return this};n.prototype.attachBrowserEvent=function(t,e,i){if(t&&typeof t==="string"){if(typeof e==="function"){if(!this.aBindParameters){this.aBindParameters=[]}i=i||this;var s=e.bind(i);this.aBindParameters.push({sEventType:t,fnHandler:e,oListener:i,fnProxy:s});if(!this._sapui_bInAfterRenderingPhase){this.$().bind(t,s)}}}return this};n.prototype.detachBrowserEvent=function(t,e,i){if(t&&typeof t==="string"){if(typeof e==="function"){var s=this.$(),o,r;i=i||this;if(this.aBindParameters){for(o=this.aBindParameters.length-1;o>=0;o--){r=this.aBindParameters[o];if(r.sEventType===t&&r.fnHandler===e&&r.oListener===i){this.aBindParameters.splice(o,1);s.unbind(t,r.fnProxy)}}}}}return this};n.prototype.getRenderer=function(){return o.getRenderer(this)};n.prototype.placeAt=function(e,s){var o=sap.ui.getCore();if(o.isInitialized()){var r=e;if(typeof r==="string"){r=o.byId(e)}var a=false;if(!(r instanceof i)){r=o.createUIArea(e);a=true}if(!r){return this}if(!a){var l=r.getMetadata().getAggregation("content");var n=true;if(l){if(!l.multiple||l.type!="sap.ui.core.Control"){n=false}}else if(!r.addContent||!r.insertContent||!r.removeAllContent){n=false}if(!n){t.sap.log.warning("placeAt cannot be processed because container "+r+" does not have an aggregation 'content'.");return this}}if(typeof s==="number"){r.insertContent(this,s)}else{s=s||"last";switch(s){case"last":r.addContent(this);break;case"first":r.insertContent(this,0);break;case"only":r.removeAllContent();r.addContent(this);break;default:t.sap.log.warning("Position "+s+" is not supported for function placeAt.")}}}else{var c=this;o.attachInitEvent(function(){c.placeAt(e,s)})}return this};n.prototype.onselectstart=function(t){if(!this.bAllowTextSelection){t.preventDefault();t.stopPropagation()}};n.prototype.onBeforeRendering=function(){};n.prototype.onAfterRendering=function(){};n.prototype.getIdForLabel=function(){return this.getId()};n.prototype.destroy=function(t){if(this.bIsDestroyed){return}this._bIsBeingDestroyed=true;this._cleanupBusyIndicator();r.deregisterAllForControl(this.getId());if(!this.getVisible()){var e=document.getElementById(o.createInvisiblePlaceholderId(this));if(e&&e.parentNode){e.parentNode.removeChild(e)}}i.prototype.destroy.call(this,t)};var c={onBeforeRendering:function(){y.call(this)},onAfterRendering:function(){if(this.getBlocked()&&this.getDomRef()&&!this.getDomRef("blockedLayer")){this._oBlockState=l.block(this,this.getId()+"-blockedLayer",this._sBlockSection);t(this._oBlockState.$blockLayer.get(0)).addClass("sapUiBlockLayerOnly")}if(this.getBusy()&&this.getDomRef()&&!this._busyIndicatorDelayedCallId&&!this.getDomRef("busyIndicator")){var e=this.getBusyIndicatorDelay();if(e){this._busyIndicatorDelayedCallId=t.sap.delayedCall(e,this,u)}else{u.call(this)}}}};function u(){if(!this.getBusy()){return}var e=this.$(this._sBusySection);if(this._busyIndicatorDelayedCallId){t.sap.clearDelayedCall(this._busyIndicatorDelayedCallId);delete this._busyIndicatorDelayedCallId}if(!e||e.length===0){t.sap.log.warning("BusyIndicator could not be rendered. The outer control instance is not valid anymore.");return}if(this._sBlockSection===this._sBusySection){if(this._oBlockState){a.addHTML(this._oBlockState,this.getBusyIndicatorSize());l.toggleAnimationStyle(this._oBlockState,true);this._oBusyBlockState=this._oBlockState}else{h.call(this)}}else{h.call(this)}}function d(){this._oBlockState=l.block(this,this.getId()+"-blockedLayer",this._sBlockSection);t(this._oBlockState.$blockLayer.get(0)).addClass("sapUiBlockLayerOnly")}function h(){this._oBusyBlockState=l.block(this,this.getId()+"-busyIndicator",this._sBusySection);a.addHTML(this._oBusyBlockState,this.getBusyIndicatorSize())}function y(){l.unblock(this._oBlockState);l.unblock(this._oBusyBlockState);delete this._oBlockState;delete this._oBusyBlockState}function f(t){if(t){y.call(this);return}var e=this.$(this._sBusySection);e.removeClass("sapUiLocalBusy");e.removeAttr("aria-busy");if(this._sBlockSection===this._sBusySection){if(!this.getBlocked()&&!this.getBusy()){y.call(this)}else if(this.getBlocked()){l.toggleAnimationStyle(this._oBlockState||this._oBusyBlockState,false);this._oBlockState=this._oBusyBlockState}else if(this._oBusyBlockState){l.unblock(this._oBusyBlockState);delete this._oBusyBlockState}}else if(this._oBusyBlockState){l.unblock(this._oBusyBlockState);delete this._oBusyBlockState}}n.prototype.setBlocked=function(e,i){if(!!e==this.getProperty("blocked")){return this}this._sBlockSection=i||this._sBlockSection;this.setProperty("blocked",e,true);if(e){this.addDelegate(c,false,this)}else{this.removeDelegate(c)}if(!this.getDomRef()){return this}if(e){if(this._sBlockSection===this._sBusySection){if(!this._oBusyBlockState&&!this._oBlockState){d.call(this)}else{t.sap.log.info("The control is already busy. Hence, no new block-layer was created for the shared section.")}}else{d.call(this)}}else{if(this._sBlockSection===this._sBusySection){if(!this.getBlocked()&&!this.getBusy()){y.call(this)}else if(this.getBusy()){t.sap.log.info("The control is already busy. Hence, no new block-layer was created for the shared section.")}}else if(this._oBlockState){l.unblock(this._oBlockState);delete this._oBlockState}}return this};n.prototype.setBusy=function(e,i){if(!!e==this.getProperty("busy")){return this}this._sBusySection=i||this._sBusySection;this.setProperty("busy",e,true);if(e){this.addDelegate(c,false,this)}else{this.removeDelegate(c);if(this._busyIndicatorDelayedCallId){t.sap.clearDelayedCall(this._busyIndicatorDelayedCallId);delete this._busyIndicatorDelayedCallId}}if(!this.getDomRef()){return this}if(e){if(this.getBusyIndicatorDelay()<=0){u.call(this)}else{this._busyIndicatorDelayedCallId=t.sap.delayedCall(this.getBusyIndicatorDelay(),this,u)}}else{f.call(this)}return this};n.prototype.isBusy=n.prototype.getBusy;n.prototype.setBusyIndicatorDelay=function(t){this.setProperty("busyIndicatorDelay",t,true);return this};n.prototype._cleanupBusyIndicator=function(){if(this._busyIndicatorDelayedCallId){t.sap.clearDelayedCall(this._busyIndicatorDelayedCallId);delete this._busyIndicatorDelayedCallId}f.call(this,true)};n.prototype.getControlsByFieldGroupId=function(t){return this.findAggregatedObjects(true,function(e){if(e instanceof n){return e.checkFieldGroupIds(t)}return false})};n.prototype.checkFieldGroupIds=function(t){if(typeof t==="string"){if(t===""){return this.checkFieldGroupIds([])}return this.checkFieldGroupIds(t.split(","))}var e=this._getFieldGroupIds();if(Array.isArray(t)){var i=0;for(var s=0;s<t.length;s++){if(e.indexOf(t[s])>-1){i++}}return i===t.length}else if(!t&&e.length>0){return true}return false};n.prototype.triggerValidateFieldGroup=function(t){this.fireValidateFieldGroup({fieldGroupIds:t})};return n});