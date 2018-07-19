/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","sap/ui/core/Element","sap/ui/core/IconPool","./library","jquery.sap.encoder"],function(e,t,r,a){"use strict";var o=t.extend("sap.ui.unified.ShellHeadItem",{metadata:{library:"sap.ui.unified",properties:{startsSection:{type:"boolean",group:"Appearance",defaultValue:false,deprecated:true},showSeparator:{type:"boolean",group:"Appearance",defaultValue:true},selected:{type:"boolean",group:"Appearance",defaultValue:false},toggleEnabled:{type:"boolean",group:"Appearance",defaultValue:true},showMarker:{type:"boolean",group:"Appearance",defaultValue:false,deprecated:true},icon:{type:"sap.ui.core.URI",group:"Appearance",defaultValue:null},visible:{type:"boolean",group:"Appearance",defaultValue:true}},associations:{ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}},events:{press:{}}}});o.prototype.onclick=function(e){this.firePress();e.preventDefault()};o.prototype.onsapspace=o.prototype.onclick;o.prototype.onsapenter=o.prototype.onclick;o.prototype.setStartsSection=function(e){e=!!e;this.setProperty("startsSection",e,true);this.$().toggleClass("sapUiUfdShellHeadItmDelim",e);return this};o.prototype.setShowSeparator=function(e){e=!!e;this.setProperty("showSeparator",e,true);this.$().toggleClass("sapUiUfdShellHeadItmSep",e);return this};function s(){var e=this.$(),t=this.getToggleEnabled(),r=this.getSelected();if(!e.length){return}if(t){e.toggleClass("sapUiUfdShellHeadItmSel",r);e.attr("aria-pressed",r)}else{e.removeClass("sapUiUfdShellHeadItmSel");e.removeAttr("aria-pressed")}}o.prototype.setToggleEnabled=function(e){this.setProperty("toggleEnabled",!!e,true);s.apply(this);return this};o.prototype.setSelected=function(e){this.setProperty("selected",!!e,true);s.apply(this);return this};o.prototype.setVisible=function(e){this.setProperty("visible",!!e);return this};o.prototype.setShowMarker=function(e){e=!!e;this.setProperty("showMarker",e,true);this.$().toggleClass("sapUiUfdShellHeadItmMark",e);return this};o.prototype.setIcon=function(e){this.setProperty("icon",e,true);if(this.getDomRef()){this._refreshIcon()}return this};o.prototype._refreshIcon=function(){var t=e(this.$().children()[0]);var a=this.getIcon();if(r.isIconURI(a)){var o=r.getIconInfo(a);t.html("").css("style","");if(o){t.text(o.content).attr("role","presentation").attr("aria-label",o.text||o.name).css("font-family","'"+o.fontFamily+"'")}}else{var s=this.$("img-inner");if(s.length==0||s.attr("src")!=a){t.css("style","").attr("aria-label",null).html("<img role='presentation' id='"+this.getId()+"-img-inner' src='"+e.sap.encodeHTML(a)+"'/>")}}};return o});