/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","./library","sap/ui/core/Control","sap/ui/core/library","sap/m/ShellRenderer"],function(e,t,a,r,o){"use strict";var i=r.TitleLevel;var p=a.extend("sap.m.Shell",{metadata:{library:"sap.m",properties:{title:{type:"string",group:"Misc",defaultValue:null},logo:{type:"sap.ui.core.URI",group:"Appearance",defaultValue:null},showLogout:{type:"boolean",group:"Behavior",defaultValue:true},headerRightText:{type:"string",group:"Data",defaultValue:null},appWidthLimited:{type:"boolean",group:"Appearance",defaultValue:true},backgroundColor:{type:"sap.ui.core.CSSColor",group:"Appearance",defaultValue:null},backgroundImage:{type:"sap.ui.core.URI",group:"Appearance",defaultValue:null},backgroundRepeat:{type:"boolean",group:"Appearance",defaultValue:false},backgroundOpacity:{type:"float",group:"Appearance",defaultValue:1},homeIcon:{type:"object",group:"Misc",defaultValue:null},titleLevel:{type:"sap.ui.core.TitleLevel",group:"Appearance",defaultValue:i.H1}},defaultAggregation:"app",aggregations:{app:{type:"sap.ui.core.Control",multiple:false}},events:{logout:{}}}});p.prototype.init=function(){sap.ui.getCore().attachThemeChanged(e.proxy(function(){var t=this.$("hdr");if(t.length){t.find(".sapMShellLogo").remove();var a=o.getLogoImageHtml(this);t.prepend(e(a))}},this));e.sap.initMobile({statusBar:"default",hideBrowser:true})};p.prototype.onAfterRendering=function(){var t=this.getDomRef().parentNode,a;if(t&&!t._sapui5_heightFixed){t._sapui5_heightFixed=true;while(t&&t!==document.documentElement){a=e(t);if(a.attr("data-sap-ui-root-content")){break}if(!t.style.height){t.style.height="100%"}t=t.parentNode}}this.$("content").css("height","")};p.prototype.ontap=function(e){if(e.target.className&&e.target.className.indexOf&&e.target.className.indexOf("sapMShellHeaderLogout")>-1){this.fireLogout()}};p.prototype.setTitle=function(e){this.$("hdrTxt").text(e);this.setProperty("title",e,true);return this};p.prototype.setHeaderRightText=function(e){this.setProperty("headerRightText",e,true);if(!e){e=""}this.$("hdrRightTxt").text(e).css("display",!!e?"inline":"none");return this};p.prototype.setAppWidthLimited=function(e){this.$().toggleClass("sapMShellAppWidthLimited",e);this.setProperty("appWidthLimited",e,true);return this};p.prototype.setBackgroundOpacity=function(t){if(t>1||t<0){e.sap.log.warning("Invalid value "+t+" for Shell.setBackgroundOpacity() ignored. Valid values are: floats between 0 and 1.");return this}this.$("BG").css("opacity",t);return this.setProperty("backgroundOpacity",t,true)};p.prototype.setHomeIcon=function(t){this.setProperty("homeIcon",t,true);e.sap.setIcons(t);return this};return p});