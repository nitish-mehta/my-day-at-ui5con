/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","./BarInPageEnabler","./library","sap/ui/core/Control","sap/ui/core/ResizeHandler","sap/ui/Device","./BarRenderer"],function(t,e,i,r,s,o,a){"use strict";var n=i.BarDesign;var p=r.extend("sap.m.Bar",{metadata:{interfaces:["sap.m.IBar"],library:"sap.m",properties:{enableFlexBox:{type:"boolean",group:"Misc",defaultValue:false,deprecated:true},translucent:{type:"boolean",group:"Appearance",defaultValue:false,deprecated:true},design:{type:"sap.m.BarDesign",group:"Appearance",defaultValue:n.Auto}},aggregations:{contentLeft:{type:"sap.ui.core.Control",multiple:true,singularName:"contentLeft"},contentMiddle:{type:"sap.ui.core.Control",multiple:true,singularName:"contentMiddle"},contentRight:{type:"sap.ui.core.Control",multiple:true,singularName:"contentRight"}},associations:{ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}},designtime:"sap/m/designtime/Bar.designtime"}});p.prototype.onBeforeRendering=function(){this._removeAllListeners()};p.prototype.onAfterRendering=function(){this._handleResize()};p.prototype.init=function(){this.data("sap-ui-fastnavgroup","true",true)};p.prototype.exit=function(){this._removeAllListeners();if(this._oflexBox){this._oflexBox.destroy();this._oflexBox=null}this._$MidBarPlaceHolder=null;this._$RightBar=null;this._$LeftBar=null};p._aResizeHandlers=["_sResizeListenerId","_sResizeListenerIdMid","_sResizeListenerIdRight","_sResizeListenerIdLeft"];p.prototype._removeAllListeners=function(){var t=this;p._aResizeHandlers.forEach(function(e){t._removeListenerFailsave(e)})};p.prototype._removeListenerFailsave=function(t){if(this[t]){s.deregister(this[t]);this[t]=null}};p.prototype._handleResize=function(){this._removeAllListeners();var e=!!this.getContentLeft().length,i=!!this.getContentMiddle().length,r=!!this.getContentRight().length;if(!this.getVisible()){return}if(!e&&!i&&!r){return}this._$LeftBar=this.$("BarLeft");this._$RightBar=this.$("BarRight");this._$MidBarPlaceHolder=this.$("BarPH");this._updatePosition(e,i,r);this._sResizeListenerId=s.register(this.getDomRef(),t.proxy(this._handleResize,this));if(this.getEnableFlexBox()){return}if(e){this._sResizeListenerIdLeft=s.register(this._$LeftBar[0],t.proxy(this._handleResize,this))}if(i){this._sResizeListenerIdMid=s.register(this._$MidBarPlaceHolder[0],t.proxy(this._handleResize,this))}if(r){this._sResizeListenerIdRight=s.register(this._$RightBar[0],t.proxy(this._handleResize,this))}};p.prototype._updatePosition=function(t,e,i){if(!t&&!i&&e){return}if(t&&!e&&!i){return}if(!t&&!e&&i){return}var r=this.$().outerWidth(true);this._$RightBar.css({width:""});this._$LeftBar.css({width:""});this._$MidBarPlaceHolder.css({position:"",width:"",visibility:"hidden"});var s=this._$RightBar.outerWidth(true);if(s>r){if(t){this._$LeftBar.css({width:"0px"})}if(e){this._$MidBarPlaceHolder.css({width:"0px"})}this._$RightBar.css({width:r+"px"});return}var o=this._getBarContainerWidth(this._$LeftBar);if(r<o+s){o=r-s;this._$LeftBar.css({width:o+"px"});this._$MidBarPlaceHolder.css({width:"0px"});return}this._$MidBarPlaceHolder.css(this._getMidBarCss(s,r,o))};p.prototype._getMidBarCss=function(t,e,i){var r=this._$MidBarPlaceHolder.outerWidth(true),s=sap.ui.getCore().getConfiguration().getRTL(),o=s?"right":"left",a={visibility:""};if(this.getEnableFlexBox()){r=e-i-t-parseInt(this._$MidBarPlaceHolder.css("margin-left"),10)-parseInt(this._$MidBarPlaceHolder.css("margin-right"),10);a.position="absolute";a.width=r+"px";a[o]=i;return a}var n=e-i-t,p=e/2-r/2,l=i>p,h=e/2+r/2,d=e-t<h;if(n>0&&(l||d)){a.position="absolute";a.width=n+"px";a.left=s?t:i}return a};p.prototype._getBarContainerWidth=function(e){var i,r=0,s=e.children(),a=0;if(o.browser.webkit||o.browser.firefox||o.browser.edge){for(i=0;i<s.length;i++){a+=t(s[i]).outerWidth(true)}r=e.outerWidth(true)}else{var n;for(i=0;i<s.length;i++){n=window.getComputedStyle(s[i]);if(n.width=="auto"){a+=t(s[i]).width()+1}else{a+=parseFloat(n.width)}a+=parseFloat(n.marginLeft);a+=parseFloat(n.marginRight);a+=parseFloat(n.paddingLeft);a+=parseFloat(n.paddingRight)}var p=window.getComputedStyle(e[0]);r+=parseFloat(p.width);r+=parseFloat(p.marginLeft);r+=parseFloat(p.marginRight);r+=parseFloat(p.paddingLeft);r+=parseFloat(p.paddingRight)}if(r<a){r=a}return r};var l=e.extend("sap.m.BarInAnyContentEnabler",{});l.mContexts={dialogFooter:{contextClass:"sapMFooter-CTX",tag:"Footer"}};l.prototype.getContext=function(){var t=e.prototype.getContext.call();for(var i in l.mContexts){t[i]=l.mContexts[i]}return t};p.prototype.getContext=l.prototype.getContext;p.prototype.isContextSensitive=l.prototype.isContextSensitive;p.prototype.setHTMLTag=l.prototype.setHTMLTag;p.prototype.getHTMLTag=l.prototype.getHTMLTag;p.prototype.applyTagAndContextClassFor=l.prototype.applyTagAndContextClassFor;p.prototype._applyContextClassFor=l.prototype._applyContextClassFor;p.prototype._applyTag=l.prototype._applyTag;p.prototype._getContextOptions=l.prototype._getContextOptions;p.prototype._setRootAccessibilityRole=l.prototype._setRootAccessibilityRole;p.prototype._getRootAccessibilityRole=l.prototype._getRootAccessibilityRole;return p});