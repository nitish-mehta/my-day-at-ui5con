/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","./Bar","./Button","./SuggestionsList","./SuggestionItem","sap/ui/Device","sap/m/library"],function(e,t,n,r,i,s,o){"use strict";var a=o.PlacementType;function u(u){var l=u,f,c,p,d=s.system.phone,g=this;e.sap.require(d?"sap.m.Dialog":"sap.m.Popover");function h(e){var t=e.srcControl;var n;if(t instanceof i){n=t.getSuggestionText();f.close();window.setTimeout(function(){u.setValue(n);u.fireSearch({query:n,suggestionItem:t,refreshButtonPressed:false,clearButtonPressed:false})},0)}}function m(){var e,r,i,s,o;i=new(sap.ui.require("sap/m/SearchField"))({liveChange:function(e){var t=e.getParameter("newValue");u.setValue(t);u.fireLiveChange({newValue:t});u.fireSuggest({suggestValue:t});g.update()},search:function(t){if(!t.getParameter("clearButtonPressed")){e.close()}}});s=new t({contentLeft:i});o=new n({text:sap.ui.getCore().getLibraryResourceBundle("sap.m").getText("MSGBOX_CANCEL"),press:function(){e._oCloseTrigger=true;e.close()}});e=new(sap.ui.require("sap/m/Dialog"))({stretch:true,customHeader:s,content:P(),beginButton:o,beforeOpen:function(){r=u.getValue();i.setValue(r)},beforeClose:function(e){if(e.getParameter("origin")){u.setValue(r)}else{u.setValue(i.getValue())}},afterClose:function(e){if(!e.getParameter("origin")){u.fireSearch({query:u.getValue(),refreshButtonPressed:false,clearButtonPressed:false})}}});e.addEventDelegate({ontap:h},u);return e}function v(){var e=g._oPopover=new(sap.ui.require("sap/m/Popover"))({showArrow:false,showHeader:false,horizontalScrolling:false,placement:a.Vertical,offsetX:0,offsetY:0,initialFocus:l,bounce:false,afterOpen:function(){u.$("I").attr("aria-autocomplete","list").attr("aria-haspopup","true")},beforeClose:function(){u.$("I").attr("aria-haspopup","false").removeAttr("aria-activedecendant")},content:P()}).addStyleClass("sapMSltPicker").addStyleClass("sapMSltPicker-CTX");e.open=function(){return this.openBy(l)};e.addEventDelegate({onAfterRendering:g.setPopoverMinWidth.bind(g),ontap:h},u);return e}function P(){if(!c){c=new r({parentInput:l})}return c}function S(){if(f===undefined){f=d?m():v()}return f}this.setPopoverMinWidth=function(){if(g._oPopover.isOpen()){var e=u.$().outerWidth()/parseFloat(o.BaseFontSize)+"rem";g._oPopover.getDomRef().style.minWidth=e}};this.destroy=function(){if(f){f.close();f.destroy();f=null}if(c){c.destroy();c=null}};this.close=function(){if(!d&&this.isOpen()){f.close()}};this.open=function(){if(!this.isOpen()){this.setSelected(-1);S().open()}};this.update=function(){var e=P();window.clearTimeout(p);if(this.isOpen()){p=window.setTimeout(e.update.bind(e),50)}};this.isOpen=function(){return!!f&&f.isOpen()};this.getSelected=function(){return P().getSelectedItemIndex()};this.setSelected=function(e,t){return P().selectByIndex(e,t)}}return u},true);