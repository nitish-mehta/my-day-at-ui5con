/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","./NavContainer","./library","./AppRenderer"],function(e,t,n,a){"use strict";var o=t.extend("sap.m.App",{metadata:{library:"sap.m",properties:{homeIcon:{type:"any",group:"Misc",defaultValue:null},backgroundColor:{type:"string",group:"Appearance",defaultValue:null},backgroundImage:{type:"sap.ui.core.URI",group:"Appearance",defaultValue:null},backgroundRepeat:{type:"boolean",group:"Appearance",defaultValue:false},backgroundOpacity:{type:"float",group:"Appearance",defaultValue:1}},events:{orientationChange:{deprecated:true,parameters:{landscape:{type:"boolean"}}}}}});o.prototype.init=function(){t.prototype.init.apply(this,arguments);this.addStyleClass("sapMApp");e.sap.initMobile({viewport:!this._debugZoomAndScroll,statusBar:"default",hideBrowser:true,preventScroll:!this._debugZoomAndScroll,rootId:this.getId()});e(window).bind("resize",e.proxy(this._handleOrientationChange,this))};o.prototype.onBeforeRendering=function(){if(t.prototype.onBeforeRendering){t.prototype.onBeforeRendering.apply(this,arguments)}e.sap.initMobile({homeIcon:this.getHomeIcon()})};o.prototype.onAfterRendering=function(){if(t.prototype.onAfterRendering){t.prototype.onAfterRendering.apply(this,arguments)}var n=this.getDomRef().parentNode;while(n&&n!==document.documentElement){var a=e(n);if(a.attr("data-sap-ui-root-content")){break}if(!n.style.height){n.style.height="100%"}n=n.parentNode}};o.prototype.exit=function(){e(window).unbind("resize",this._handleOrientationChange);if(this._sInitTimer){e.sap.clearDelayedCall(this._sInitTimer)}};o.prototype._handleOrientationChange=function(){var t=e(window);var n=t.width()>t.height();if(this._oldIsLandscape!==n){this.fireOrientationChange({landscape:n});this._oldIsLandscape=n}};o.prototype.setBackgroundOpacity=function(t){if(t>1||t<0){e.sap.log.warning("Invalid value "+t+" for App.setBackgroundOpacity() ignored. Valid values are: floats between 0 and 1.");return this}this.$("BG").css("opacity",t);return this.setProperty("backgroundOpacity",t,true)};return o});