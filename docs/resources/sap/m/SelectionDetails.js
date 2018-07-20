/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","./library","sap/ui/core/Control","sap/m/Button","sap/ui/base/Interface","sap/ui/Device","sap/ui/core/library","./SelectionDetailsRenderer"],function(t,e,o,i,n,a,r,s){"use strict";var g=o.extend("sap.m.SelectionDetails",{metadata:{library:"sap.m",defaultAggregation:"items",aggregations:{items:{type:"sap.m.SelectionDetailsItem",multiple:true,bindable:"bindable"},actions:{type:"sap.ui.core.Item",multiple:true},actionGroups:{type:"sap.ui.core.Item",multiple:true},_popover:{type:"sap.m.ResponsivePopover",multiple:false,visibility:"hidden"},_button:{type:"sap.m.Button",multiple:false,visibility:"hidden"}},events:{beforeOpen:{},beforeClose:{},navigate:{parameters:{item:{type:"sap.m.SelectionDetailsItem"},direction:{type:"string"},content:{type:"sap.ui.core.Control"}}},actionPress:{parameters:{action:{type:"sap.ui.core.Item"},items:{type:"sap.m.SelectionDetailsItem"},level:{type:"sap.m.SelectionDetailsActionLevel"}}}}}});g._MAX_ACTIONGROUPS=5;g._POPOVER_MAX_HEIGHT=500;g.prototype.init=function(){this._oRb=sap.ui.getCore().getLibraryResourceBundle("sap.m");this.setAggregation("_button",new i({id:this.getId()+"-button",type:e.ButtonType.Transparent,press:[this._onToolbarButtonPress,this]}),true);this._oItemFactory=null};g.prototype.onBeforeRendering=function(){this._updateButton()};g.prototype.exit=function(){this.detachSelectionHandler();this._oItemFactory=null;this._oChangeHandler=null};g.prototype.isOpen=function(){var t=this.getAggregation("_popover");return t?t.isOpen():false};g.prototype.isEnabled=function(){return this.getItems().length>0};g.prototype.close=function(){var t=this.getAggregation("_popover");if(t){t.close()}return this};g.prototype.navTo=function(t,e){if(this.isOpen()){sap.ui.require(["sap/m/Page","sap/m/Toolbar","sap/m/ToolbarSpacer","sap/m/Title"],this._handleNavLazy.bind(this,t,e))}return this};g.prototype.setPopoverModal=function(t){this._getPopover().setModal(t);return this};g.prototype._handleNavLazy=function(e,o,i,n,a,r,s){var p=this.getId()+"-page-for-"+o.getId()+"-uid-"+t.sap.uid();this._setPopoverHeight(g._POPOVER_MAX_HEIGHT);var h=new i(p,{customHeader:this._getPageToolbar(n,a,r,true,e),content:[o]});this._oNavContainer.addPage(h);this._oNavContainer.to(p)};g.prototype._getPageToolbar=function(t,o,n,s,g){var p=new t({design:e.ToolbarDesign.Transparent}).addStyleClass("sapMSDPageHeader");if(s){var h=new i({icon:"sap-icon://nav-back",press:this._onBackButtonPress.bind(this)});p.addAggregation("content",h,true)}var l=new o;var c=new n({text:g,titleStyle:r.TitleLevel.H5});p.addAggregation("content",l,true);p.addAggregation("content",c,true);p.addAggregation("content",l.clone(),true);if(a.system.phone){p.addAggregation("content",this._getCloseButton(),true)}return p};g.prototype._setPopoverHeight=function(t){if(!a.system.phone){var e=this._getPopover(),o=e.$("cont"),i=this._getMaxPopoverHeight();t=Math.min(g._POPOVER_MAX_HEIGHT,t);e._oControl._deregisterContentResizeHandler();o.animate({height:Math.min(t,i)},sap.ui.getCore().getConfiguration().getAnimation()?100:0,function(){e.setProperty("contentHeight",t+"px",true);e._oControl._registerContentResizeHandler()})}};g.prototype._getMaxPopoverHeight=function(){var t=this._getPopover(),e=t.$(),o,i,n;if(!e.length){return 0}o=e.offset().top;i=a.resize.height;n=t._oControl;n._adaptPositionParams();return i-o-n._marginBottom};g.prototype._onBackButtonPress=function(){var t=this._oNavContainer.getCurrentPage().getContent()[0];this._oNavContainer.attachEventOnce("afterNavigate",function(){this.fireNavigate({item:this._oItemForNavigation,direction:"back",content:t})},this);this._oNavContainer.back();if(this._oNavContainer.getCurrentPage()===this._oInitialPage){this._setPopoverHeight(this._getInitialPageHeight())}};g.prototype._getCloseButton=function(){return new i({icon:"sap-icon://decline",press:this.close.bind(this)})};g.prototype._aFacadeMethods=["addCustomData","getCustomData","indexOfCustomData","insertCustomData","removeCustomData","removeAllCustomData","destroyCustomData","data","addEventDelegate","removeEventDelegate","close","isOpen","isEnabled","attachBeforeOpen","detachBeforeOpen","attachBeforeClose","detachBeforeClose","attachNavigate","detachNavigate","attachActionPress","detachActionPress","addAction","removeAction","removeAllActions","addActionGroup","removeActionGroup","removeAllActionGroups","navTo"];g.prototype.getFacade=function(){var e=new n(this,g.prototype._aFacadeMethods,true);e.getItems=this._getItemFacades.bind(this);this.getFacade=t.sap.getter(e);return e};g.prototype._getItemFacades=function(){var t=this.getItems();var e=[];for(var o=0;o<t.length;o++){e.push(t[o].getFacade())}return e};g.prototype._updateButton=function(){var t,e,o=this.getAggregation("_button");if(this._oSelectionData&&this._oSelectionData.length>=0){e=this._oSelectionData.length}else{e=this.getItems().length}if(e>0){t=this._oRb.getText("SELECTIONDETAILS_BUTTON_TEXT_WITH_NUMBER",[e]);o.setProperty("text",t,true);o.setProperty("enabled",true,true)}else{t=this._oRb.getText("SELECTIONDETAILS_BUTTON_TEXT");o.setProperty("text",t,true);o.setProperty("enabled",false,true)}};g.prototype._onToolbarButtonPress=function(){sap.ui.require(["sap/m/NavContainer","sap/m/ResponsivePopover","sap/m/Page","sap/m/Toolbar","sap/m/OverflowToolbar","sap/m/ToolbarSpacer","sap/m/Button","sap/m/List","sap/m/StandardListItem","sap/ui/layout/FixFlex","sap/m/ScrollContainer","sap/m/Title"],this._handlePressLazy.bind(this))};g.prototype._handlePressLazy=function(t,e,o,i,n,a,r,s,g,p,h,l){var c=this._getPopover(t,e,i,a,o,s,p,h,l);if(this._oItemFactory){this._callFactory()}this.fireBeforeOpen();this._addMainListItems();this._addActionGroupListItems(g);this._addListActions(n,a,r);this._oNavContainer.setProperty("defaultTransitionName","show",true);this._oNavContainer.to(this._oInitialPage);this._oNavContainer.setProperty("defaultTransitionName","slide",true);c.openBy(this.getAggregation("_button"));c.invalidate()};g.prototype._callFactory=function(){var t=this._oItemFactory.factory,e=this._oItemFactory.data,o=this._oSelectionData,i;this.fireEvent("beforeUpdate",{items:this.getItems()});this.destroyAggregation("items",true);for(var n=0;n<o.length;n++){i=t(o[n].displayData,o[n].data,o[n].context,e,o[n].shapeString);if(i){i._sMarkerShapeString=o[n].shapeString;this.addAggregation("items",i,true)}}this.fireEvent("afterUpdate",{items:this.getItems()})};g.prototype._getInitialPage=function(t,e,o,i){if(!this._oInitialPage){this._oInitialPage=new t(this.getId()+"-page",{showHeader:false,enableScrolling:false});if(a.system.phone){this._oInitialPage.setProperty("showHeader",true,true);this._oInitialPage.setAggregation("customHeader",this._getPageToolbar(e,o,i),true)}}return this._oInitialPage};g.prototype._getNavContainer=function(t){return this._oNavContainer||(this._oNavContainer=new t(this.getId()+"-nav-container"))};g.prototype._getPopover=function(t,o,i,n,r,s,g,p,h){var l=this.getAggregation("_popover"),c,u,d,_,f;if(!l){l=new o({id:this.getId()+"-popover",placement:e.PlacementType.Bottom,showHeader:false,contentWidth:"25rem",contentHeight:"500px",beforeClose:this.fireBeforeClose.bind(this)}).addStyleClass("sapMSD");l.setProperty=this._setPopoverProperty;u=this._getInitialPage(r,i,n,h);_=this._getActionGroupList(s);c=this._getNavContainer(t);f=this._getMainList(s);d=this._createMainContainer(g);d.setAggregation("flexContent",f,true);d.addAggregation("fixContent",_,true);u.addAggregation("content",d,true);c.addPage(u);l.addAggregation("content",c,true);if(!a.system.phone){l.addEventDelegate({onAfterRendering:this._updatePopoverContentHeight.bind(this)})}this.setAggregation("_popover",l,true)}return l};g.prototype._setPopoverProperty=function(t,e){var i=this._oControl.getMetadata().getProperty(t);if(i&&t==="modal"&&this._oControl.setModal){this._oControl.setModal(e)}else{this._oControl.setProperty.apply(this._oControl,arguments)}return o.prototype.setProperty.apply(this,arguments)};g.prototype._updatePopoverContentHeight=function(){var t=this._getInitialPageHeight(),e=this._getPopover();if(a.browser.edge&&this._oMainList.getDomRef()&&this._oMainList.getDomRef().getBoundingClientRect().height===0){e.setContentHeight(g._POPOVER_MAX_HEIGHT+"px");return}if(this._oNavContainer.getCurrentPage()===this._oInitialPage&&t<g._POPOVER_MAX_HEIGHT){e.setProperty("contentHeight",t+"px",true)}else{e.setProperty("contentHeight",g._POPOVER_MAX_HEIGHT+"px",true)}};g.prototype._getInitialPageHeight=function(){var t=this._oInitialPage&&this._oInitialPage.getFooter(),e=this._oMainList.$().outerHeight(),o=this._oActionGroupList.$().outerHeight(),i=t&&t.$().outerHeight()||0;return e+o+i};g.prototype._createMainContainer=function(t){return new t(this.getId()+"-mainContainer",{fixFirst:false,minFlexSize:-1})};g.prototype._getMainList=function(t){if(!this._oMainList){this._oMainList=new t(this.getId()+"-list")}return this._oMainList};g.prototype._addMainListItems=function(){var t,e,o;this._oMainList.removeAllAggregation("items",true);e=this.getItems();for(t=0;t<e.length;t++){if(!e[t].hasListeners("_navigate")){e[t].attachEvent("_navigate",this._onNavigate,this)}if(!e[t].hasListeners("_actionPress")){e[t].attachEvent("_actionPress",this._onActionPress,this)}o=e[t]._getListItem();this._oMainList.addAggregation("items",o,true)}};g.prototype._getActionGroupList=function(t){if(!this._oActionGroupList){this._oActionGroupList=new t(this.getId()+"-actionGroupList",{showNoData:false})}return this._oActionGroupList};g.prototype._addActionGroupListItems=function(t){this._oActionGroupList.destroyAggregation("items",true);var o=this.getActionGroups(),i,n,a=Math.min(g._MAX_ACTIONGROUPS,o.length);for(n=0;n<a;n++){i=new t(this.getId()+"-actionGroup-"+n,{title:o[n].getText(),type:e.ListType.Navigation,press:[{action:o[n],level:e.SelectionDetailsActionLevel.Group},this._onActionPress,this]});if(n===0){i.addStyleClass("sapMSDFirstActionGroup")}this._oActionGroupList.addAggregation("items",i,true)}};g.prototype._addListActions=function(t,o,i){var n,a,r,s,g;this._oInitialPage.destroyAggregation("footer",true);if(!this.getActions().length){return}g=new t(this.getId()+"-action-toolbar").addStyleClass("sapContrast sapContrastPlus");this._oInitialPage.setAggregation("footer",g,true);g.addAggregation("content",new o,true);r=this.getActions();for(a=0;a<r.length;a++){s=r[a];n=new i(this.getId()+"-action-"+a,{text:s.getText(),enabled:s.getEnabled(),press:[{action:s,level:e.SelectionDetailsActionLevel.List},this._onActionPress,this]});g.addAggregation("content",n,true)}};g.prototype._onActionPress=function(t,e){this.fireActionPress({action:e&&e.action||t.getParameter("action"),items:t.getParameter("items")||this.getItems(),level:e&&e.level||t.getParameter("level")})};g.prototype._onNavigate=function(t){this._oItemForNavigation=t.getSource();this.fireNavigate({item:t.getSource(),direction:"to"})};g.prototype._handleSelectionChange=function(e){var o=e.getParameter("data");if(t.type(o)==="array"){this._oSelectionData=o;this._updateButton();this.getAggregation("_button").rerender()}};g.prototype.registerSelectionDetailsItemFactory=function(t,e){if(typeof t==="function"){e=t;t=undefined}if(typeof e==="function"){this._oItemFactory={factory:e,data:t}}return this};g.prototype.attachSelectionHandler=function(e,o){if(this._oChangeHandler||t.type(e)!=="String"&&(t.type(o)!=="object"||t.type(o.attachEvent)!=="function")){return this}else{this._oChangeHandler={eventId:e,listener:o};o.attachEvent(e,this._handleSelectionChange,this)}return this};g.prototype.detachSelectionHandler=function(){if(this._oChangeHandler){this._oChangeHandler.listener.detachEvent(this._oChangeHandler.eventId,this._handleSelectionChange,this);this._oChangeHandler=null}return this};return g});