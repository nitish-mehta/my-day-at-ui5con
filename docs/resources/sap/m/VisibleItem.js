/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","./library","sap/ui/core/Item"],function(e,t,i){"use strict";var r=i.extend("sap.m.VisibleItem",{metadata:{library:"sap.m",properties:{visible:{type:"boolean",group:"Behavior",defaultValue:true}}}});r.prototype._getRefs=function(){var t=this.getParent(),i,r=this;if(t&&t.$("content")){i=t.$("content").find("li").filter(function(){return e(this).html()===r.getText()})}return i};r.prototype.setVisible=function(e){if(this.getVisible()===e){return}var t=this._getRefs();if(t){if(e){t.removeClass("TPSliderItemHidden")}else{t.addClass("TPSliderItemHidden")}}return this.setProperty("visible",e,true)};return r});