/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","./SplitContainer","./library","sap/ui/Device","./SplitAppRenderer"],function(e,t,i,n,o){"use strict";var p=t.extend("sap.m.SplitApp",{metadata:{library:"sap.m",properties:{homeIcon:{type:"any",group:"Misc",defaultValue:null}},events:{orientationChange:{parameters:{landscape:{type:"boolean"}}}},designtime:"sap/m/designtime/SplitApp.designtime"}});p.prototype.init=function(){if(t.prototype.init){t.prototype.init.apply(this,arguments)}this.addStyleClass("sapMSplitApp");e.sap.initMobile({viewport:!this._debugZoomAndScroll,statusBar:"default",hideBrowser:true,preventScroll:!this._debugZoomAndScroll,rootId:this.getId()})};p.prototype.onBeforeRendering=function(){if(t.prototype.onBeforeRendering){t.prototype.onBeforeRendering.apply(this,arguments)}e.sap.initMobile({homeIcon:this.getHomeIcon()})};p.prototype.onAfterRendering=function(){if(t.prototype.onAfterRendering){t.prototype.onAfterRendering.apply(this,arguments)}var i=this.getDomRef().parentNode;if(i&&!i._sapui5_heightFixed){i._sapui5_heightFixed=true;while(i&&i!==document.documentElement){var n=e(i);if(n.attr("data-sap-ui-root-content")){break}if(!i.style.height){i.style.height="100%"}i=i.parentNode}}};p.prototype._onOrientationChange=function(){this.fireOrientationChange({landscape:n.orientation.landscape})};return p});