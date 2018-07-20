/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./TreeItemBase","./library","sap/ui/core/IconPool","./Image","./StandardTreeItemRenderer"],function(t,o,e,n,r){"use strict";var i=t.extend("sap.m.StandardTreeItem",{metadata:{library:"sap.m",properties:{title:{type:"string",group:"Misc",defaultValue:""},icon:{type:"sap.ui.core.URI",group:"Misc",defaultValue:null}}}});i.prototype._getIconControl=function(){var t=this.getIcon();if(this._oIconControl){this._oIconControl.setSrc(t);return this._oIconControl}this._oIconControl=e.createControlByURI({id:this.getId()+"-icon",src:t,useIconTooltip:false,noTabStop:true},n).setParent(this,null,true).addStyleClass("sapMSTIIcon");return this._oIconControl};i.prototype.getContentAnnouncement=function(){var t="",o=e.getIconInfo(this.getIcon())||{};t+=(o.text||o.name||"")+" ";t+=this.getTitle()+" ";return t};i.prototype.exit=function(){t.prototype.exit.apply(this,arguments);this.destroyControls(["Icon"])};i.prototype.setIcon=function(t){var o=this.getIcon();this.setProperty("icon",t);if(this._oIconControl&&(!t||e.isIconURI(t)!=e.isIconURI(o))){this._oIconControl.destroy("KeepDom");this._oIconControl=undefined}return this};return i});