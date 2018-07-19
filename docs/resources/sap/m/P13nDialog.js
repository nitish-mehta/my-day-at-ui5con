/*
 * ! UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","./Dialog","./library","sap/ui/core/EnabledPropagator","./DialogRenderer","sap/ui/core/library","sap/ui/Device","./Bar","./Button","./Title","sap/m/OverflowToolbarLayoutData","sap/ui/base/ManagedObjectObserver"],function(e,t,i,s,n,a,o,r,l,u,g,h){"use strict";var p=i.OverflowToolbarPriority;var c=i.ListType;var f=i.P13nPanelType;var d=i.ListMode;var _=a.MessageType;var v=i.ButtonType;var m;var y;var b=t.extend("sap.m.P13nDialog",{metadata:{library:"sap.m",properties:{initialVisiblePanelType:{type:"string",group:"Misc",defaultValue:null},showReset:{type:"boolean",group:"Appearance",defaultValue:false},showResetEnabled:{type:"boolean",group:"Appearance",defaultValue:false},validationExecutor:{type:"object",group:"Misc",defaultValue:null}},aggregations:{panels:{type:"sap.m.P13nPanel",multiple:true,singularName:"panel",bindable:"bindable"}},events:{ok:{},cancel:{},reset:{}}},renderer:function(e,t){n.render.apply(this,arguments);var i=t._getVisiblePanelID();var s=t.getVisiblePanel();if(i&&s){e.write("<div");e.writeAttribute("id",i);e.write(">");e.renderControl(s);e.write("</div>")}}});s.apply(b.prototype,[true]);b.prototype.init=function(e){this.addStyleClass("sapMP13nDialog");t.prototype.init.apply(this,arguments);this._oResourceBundle=sap.ui.getCore().getLibraryResourceBundle("sap.m");this._mValidationListener={};this._createDialog();this._mVisibleNavigationItems={};this._bNavigationControlsPromiseResolved=false;this._oNavigationControlsPromise=this._requestRequiredNavigationControls();this._oObserver=new h(T.bind(this));this._oObserver.observe(this,{properties:["showReset","showResetEnabled"],aggregations:["panels"]})};b.prototype.setShowResetEnabled=function(e){return this.setProperty("showResetEnabled",e,true)};b.prototype._createDialog=function(){if(o.system.phone){var e=this;this.setStretch(true);this.setVerticalScrolling(false);this.setHorizontalScrolling(false);this.setCustomHeader(new r(this.getId()+"-phoneHeader",{contentLeft:new l(this.getId()+"-backToList",{visible:false,type:v.Back,press:function(){e._backToList()}}),contentMiddle:new u(this.getId()+"-phoneTitle",{text:this._oResourceBundle.getText("P13NDIALOG_VIEW_SETTINGS"),level:"H2"})}));this.addButton(this._createOKButton());this.addButton(this._createCancelButton());this.addButton(this._createResetButton())}else{this.setHorizontalScrolling(false);this.setContentWidth("65rem");this.setContentHeight("40rem");this.setDraggable(true);this.setResizable(true);this.setTitle(this._oResourceBundle.getText("P13NDIALOG_VIEW_SETTINGS"));this.addButton(this._createOKButton());this.addButton(this._createCancelButton());this.addButton(this._createResetButton())}};b.prototype._showValidationDialog=function(e,t,i){var s=[];var n=[];this._prepareMessages(t,i,s,n);var a=this;return new Promise(function(t){sap.ui.require(["sap/m/MessageBox"],function(i){var o="";if(n.length){n.forEach(function(e,t,i){o=(i.length>1?"• ":"")+e.messageText+"\n"+o});i.show(o,{icon:i.Icon.ERROR,title:sap.ui.getCore().getLibraryResourceBundle("sap.m").getText("P13NDIALOG_VALIDATION_TITLE_ERROR"),actions:[i.Action.CLOSE],styleClass:a.$().closest(".sapUiSizeCompact").length?"sapUiSizeCompact":""})}else if(s.length){s.forEach(function(e,t,i){o=(i.length>1?"• ":"")+e.messageText+"\n"+o});o=o+sap.ui.getCore().getLibraryResourceBundle("sap.m").getText("P13NDIALOG_VALIDATION_MESSAGE_QUESTION");i.show(o,{icon:i.Icon.WARNING,title:sap.ui.getCore().getLibraryResourceBundle("sap.m").getText("P13NDIALOG_VALIDATION_TITLE"),actions:[sap.ui.getCore().getLibraryResourceBundle("sap.m").getText("P13NDIALOG_VALIDATION_FIX"),sap.m.MessageBox.Action.IGNORE],onClose:function(t){if(t===i.Action.IGNORE){e()}},styleClass:a.$().closest(".sapUiSizeCompact").length?"sapUiSizeCompact":""})}t()})})};b.prototype._prepareMessages=function(t,i,s,n){if(!t.length&&!i.length){return}t.forEach(function(t){switch(t){case f.filter:i.push({messageType:_.Warning,messageText:sap.ui.getCore().getLibraryResourceBundle("sap.m").getText("P13NDIALOG_VALIDATION_MESSAGE")});break;case f.columns:i.push({messageType:_.Warning,messageText:sap.ui.getCore().getLibraryResourceBundle("sap.m").getText("P13NDIALOG_VISIBLE_ITEMS_THRESHOLD_MESSAGE")});break;default:e.sap.log.error("Panel type '"+t+"' is not supported jet.")}});var a=i.filter(function(e,t,i){for(var s=++t;s<i.length;s++){if(e.messageText===i[s].messageText){return false}}return true});a.forEach(function(e){if(e.messageType===_.Warning){s.push(e)}else if(e.messageType===_.Error){n.push(e)}})};b.prototype._mapPanelToNavigationItem=function(e){if(!e){return null}return o.system.phone?new y(e.getId()+"-navItem",{type:c.Navigation,title:e.getTitle()}):new y(e.getId()+"-navItem",{text:e.getTitle()})};b.prototype._switchPanel=function(e){var t=this._getPanelByNavigationItem(e);this.setVerticalScrolling(t.getVerticalScrolling());if(o.system.phone){var i=this._getNavigationControl();if(i){i.setVisible(false);t.beforeNavigationTo();t.setVisible(true);this.getCustomHeader().getContentMiddle()[0].setText(t.getTitle());this.getCustomHeader().getContentLeft()[0].setVisible(true)}}else{this.getPanels().forEach(function(e){if(e===t){e.beforeNavigationTo();e.setVisible(true)}else{e.setVisible(false)}},this)}this.invalidate();this.rerender()};b.prototype._backToList=function(){var e=this._getNavigationControl();if(e){e.setVisible(true);var t=this.getVisiblePanel();t.setVisible(false);this._updateDialogTitle();this.getCustomHeader().getContentLeft()[0].setVisible(false)}};b.prototype.getVisiblePanel=function(){var e=null;this.getPanels().some(function(t){if(t.getVisible()){e=t;return true}});return e};b.prototype._getVisiblePanelID=function(){var e=this.getVisiblePanel();if(e){return this.getId()+"-panel_"+e.getId()}return null};b.prototype._getPanelByNavigationItem=function(e){for(var t=0,i=this.getPanels(),s=i.length;t<s;t++){if(this._getNavigationItemByPanel(i[t])===e){return i[t]}}return null};b.prototype._getNavigationItemByPanel=function(e){return e?e.data("sapMP13nDialogNavigationItem"):null};b.prototype.onAfterRendering=function(){t.prototype.onAfterRendering.apply(this,arguments);var i=e(this.getFocusDomRef()).find(".sapMDialogScrollCont");var s=this._getVisiblePanelID();if(s&&i){var n=e.sap.byId(s);n.appendTo(e(i))}};b.prototype._updateDialogTitle=function(){var e=this.getVisiblePanel();var t=this._oResourceBundle.getText("P13NDIALOG_VIEW_SETTINGS");if(!this._isNavigationControlExpected()&&e){switch(e.getType()){case f.filter:t=this._oResourceBundle.getText("P13NDIALOG_TITLE_FILTER");break;case f.sort:t=this._oResourceBundle.getText("P13NDIALOG_TITLE_SORT");break;case f.group:t=this._oResourceBundle.getText("P13NDIALOG_TITLE_GROUP");break;case f.columns:t=this._oResourceBundle.getText("P13NDIALOG_TITLE_COLUMNS");break;case f.dimeasure:t=this._oResourceBundle.getText("P13NDIALOG_TITLE_DIMEASURE");break;default:t=e.getTitleLarge()||this._oResourceBundle.getText("P13NDIALOG_VIEW_SETTINGS")}}if(o.system.phone){this.getCustomHeader().getContentMiddle()[0].setText(t)}else{this.setTitle(t)}};b.prototype._registerValidationListener=function(e,t){if(this.getPanels().indexOf(e)&&t&&this._mValidationListener[e.getType()]===undefined){this._mValidationListener[e.getType()]=t}};b.prototype._callValidationExecutor=function(){var t=this.getValidationExecutor();if(t&&!e.isEmptyObject(this._mValidationListener)){var i=this;t(this._getPayloadOfPanels()).then(function(e){var t=i._distributeValidationResult(e);for(var s in i._mValidationListener){var n=i._mValidationListener[s];n(t[s]||[])}})}};b.prototype._callChangeNotifier=function(e){if(this.getShowReset()){this.setShowResetEnabled(true)}};b.prototype._distributeValidationResult=function(e){var t={};e.forEach(function(e){e.panelTypes.forEach(function(i){if(t[i]===undefined){t[i]=[]}t[i].push({columnKey:e.columnKey,messageType:e.messageType,messageText:e.messageText})})});return t};b.prototype._createOKButton=function(){var e=this;return new l(this.getId()+"-ok",{text:this._oResourceBundle.getText("P13NDIALOG_OK"),layoutData:new g({priority:p.NeverOverflow}),press:function(){e.setBusy(true);var t=e._getPayloadOfPanels();var i=function(){e.setBusy(false);e.fireOk({payload:t})};var s=[];var n=function(){e.getPanels().forEach(function(e){if(s.indexOf(e.getType())>-1){e.onAfterNavigationFrom()}});i()};e.getPanels().forEach(function(e){if(!e.onBeforeNavigationFrom()){s.push(e.getType())}});var a=[];var o=e.getValidationExecutor();if(o){o(t).then(function(t){if(s.length||t.length){e.setBusy(false);e._showValidationDialog(n,s,t)}else{i()}})}else{if(s.length||a.length){e.setBusy(false);e._showValidationDialog(n,s,a)}else{i()}}}})};b.prototype._createCancelButton=function(){var e=this;return new l(this.getId()+"-cancel",{text:this._oResourceBundle.getText("P13NDIALOG_CANCEL"),layoutData:new g({priority:p.NeverOverflow}),press:function(){e.fireCancel()}})};b.prototype._createResetButton=function(){var e=this;return new l(this.getId()+"-reset",{text:this._oResourceBundle.getText("P13NDIALOG_RESET"),layoutData:new g({priority:p.NeverOverflow}),visible:this.getShowReset(),enabled:this.getShowResetEnabled(),press:function(){e.setShowResetEnabled(false);var t={};e.getPanels().forEach(function(e){t[e.getType()]=e.getResetPayload()});e.fireReset({payload:t})}})};b.prototype._getPayloadOfPanels=function(){var e={};this.getPanels().forEach(function(t){e[t.getType()]=t.getOkPayload()});return e};b.prototype.exit=function(){t.prototype.exit.apply(this,arguments);this._oObserver.disconnect();this._oObserver=undefined;this._mValidationListener={};this._mVisibleNavigationItems={};this._oNavigationControlsPromise=null};b.prototype._isInstanceOf=function(e,t){var i=sap.ui.require(t);return e&&typeof i==="function"&&e instanceof i};function T(t){if(this._isInstanceOf(t.object,"sap/m/P13nDialog")){var i;switch(t.name){case"panels":var s=t.child?[t.child]:t.children;s.forEach(function(i){switch(t.mutation){case"insert":this._mVisibleNavigationItems[i.getType()]=i.getVisible();i.setVisible(false);i.beforeNavigationTo();this._oObserver.observe(i,{properties:["title"]});i.setValidationExecutor(e.proxy(this._callValidationExecutor,this));i.setValidationListener(e.proxy(this._registerValidationListener,this));i.setChangeNotifier(e.proxy(this._callChangeNotifier,this));break;case"remove":delete this._mVisibleNavigationItems[i.getType()];this._oObserver.unobserve(i);i.setValidationExecutor();i.setValidationListener();i.setChangeNotifier();break;default:e.sap.log.error("Mutation '"+t.mutation+"' is not supported jet.")}},this);if(this._bNavigationControlsPromiseResolved){this._updateDialog()}else{this._oNavigationControlsPromise.then(function(){this._updateDialog()}.bind(this))}break;case"showReset":i=this.getButtons();if(i.length>1){i[2].setVisible(t.current)}break;case"showResetEnabled":i=this.getButtons();if(i.length>1){i[2].setEnabled(t.current);i[2].invalidate()}break;default:e.sap.log.error("The property or aggregation '"+t.name+"' has not been registered.")}}else if(this._isInstanceOf(t.object,"sap/m/P13nPanel")){if(t.name==="title"){var n=this._getNavigationItemByPanel(t.object);if(n){if(o.system.phone){n.setTitle(t.current)}else{n.setText(t.current)}}}}}b.prototype._isNavigationControlExpected=function(){return this._getCountOfVisibleNavigationItems()>1};b.prototype._getCountOfVisibleNavigationItems=function(){var e=0;for(var t in this._mVisibleNavigationItems){e=this._mVisibleNavigationItems[t]?e+1:e}return e};b.prototype._isNavigationControlExists=function(){return o.system.phone?this.getContent().length>0:!!this.getSubHeader()&&this.getSubHeader().getContentLeft().length>0};b.prototype._getNavigationControl=function(){if(!this._isNavigationControlExists()){this._createNavigationControl()}return o.system.phone?this.getContent()[0]:this.getSubHeader().getContentLeft()[0]};b.prototype._setVisibleOfNavigationControl=function(e){if(!this._isNavigationControlExists()){return}return o.system.phone?this.getContent()[0].setVisible(e):this.getSubHeader().setVisible(e)};b.prototype._createNavigationControl=function(){if(o.system.phone){this.addContent(new m(this.getId()+"-navigationItems",{mode:d.None,itemPress:function(e){this._switchPanel(e.getParameter("listItem"))}.bind(this)}))}else{this.setSubHeader(new r(this.getId()+"-navigationBar",{contentLeft:new m(this.getId()+"-navigationItems",{width:"100%",selectionChange:function(e){this._switchPanel(e.getParameter("item"))}.bind(this)})}))}return this._getNavigationControl()};b.prototype._updateDialog=function(){var e=this._getNavigationControl();e.destroyItems();var t=this._determineInitialVisiblePanelType();this.getPanels().forEach(function(i){var s=this._mapPanelToNavigationItem(i);i.data("sapMP13nDialogNavigationItem",s);e.addItem(s);var n=o.system.phone?this._mVisibleNavigationItems[i.getType()]&&this._getCountOfVisibleNavigationItems()===1:this._mVisibleNavigationItems[i.getType()]&&t===i.getType();i.setVisible(n);if(n){if(!o.system.phone){this.setVerticalScrolling(i.getVerticalScrolling())}}s.setVisible(this._mVisibleNavigationItems[i.getType()]);if(n&&e.setSelectedItem){e.setSelectedItem(s)}}.bind(this));this._updateDialogTitle();this._setVisibleOfNavigationControl(this._isNavigationControlExpected())};b.prototype._determineInitialVisiblePanelType=function(){if(this.getInitialVisiblePanelType()&&this._mVisibleNavigationItems[this.getInitialVisiblePanelType()]){return this.getInitialVisiblePanelType()}var e;this.getPanels().some(function(t){if(this._mVisibleNavigationItems[t.getType()]){e=t.getType();return true}}.bind(this));return e};b.prototype._requestRequiredNavigationControls=function(){var e=o.system.phone?"sap/m/List":"sap/m/SegmentedButton";var t=o.system.phone?"sap/m/StandardListItem":"sap/m/SegmentedButtonItem";m=sap.ui.require(e);y=sap.ui.require(t);if(m&&y){this._bNavigationControlsPromiseResolved=true;return Promise.resolve()}if(!this._oNavigationControlsPromise){this._oNavigationControlsPromise=new Promise(function(i){sap.ui.require([e,t],function(e,t){m=e;y=t;this._bNavigationControlsPromiseResolved=true;return i()}.bind(this))}.bind(this))}return this._oNavigationControlsPromise};return b});