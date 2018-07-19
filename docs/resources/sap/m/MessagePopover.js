/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","./ResponsivePopover","./Button","./Toolbar","./Bar","sap/ui/core/Control","sap/ui/core/IconPool","./semantic/SemanticPage","./Popover","./MessageView","sap/ui/Device","./MessagePopoverRenderer"],function(e,t,o,s,i,r,n,a,p,l,g,u){"use strict";var c=r.extend("sap.m.MessagePopover",{metadata:{library:"sap.m",properties:{asyncDescriptionHandler:{type:"any",group:"Behavior",defaultValue:null},asyncURLHandler:{type:"any",group:"Behavior",defaultValue:null},placement:{type:"sap.m.VerticalPlacementType",group:"Behavior",defaultValue:"Vertical"},initiallyExpanded:{type:"boolean",group:"Behavior",defaultValue:true}},defaultAggregation:"items",aggregations:{items:{type:"sap.m.MessageItem",altTypes:["sap.m.MessagePopoverItem"],multiple:true,singularName:"item"},headerButton:{type:"sap.m.Button",multiple:false,forwarding:{idSuffix:"-messageView",aggregation:"headerButton"}}},events:{afterOpen:{parameters:{openBy:{type:"sap.ui.core.Control"}}},afterClose:{parameters:{openBy:{type:"sap.ui.core.Control"}}},beforeOpen:{parameters:{openBy:{type:"sap.ui.core.Control"}}},beforeClose:{parameters:{openBy:{type:"sap.ui.core.Control"}}},itemSelect:{parameters:{item:{type:"sap.m.MessagePopoverItem"},messageTypeFilter:{type:"sap.ui.core.MessageType"}}},listSelect:{parameters:{messageTypeFilter:{type:"sap.ui.core.MessageType"}}},longtextLoaded:{},urlValidated:{}}}});function h(e){return e.charAt(0).toUpperCase()+e.slice(1)}var d="sapMMsgPopover",f="320px",y="440px",_={back:n.getIconURI("nav-back"),close:n.getIconURI("decline"),information:n.getIconURI("message-information"),warning:n.getIconURI("message-warning"),error:n.getIconURI("message-error"),success:n.getIconURI("message-success")},v=["asyncDescriptionHandler","asyncURLHandler"],m={asyncDescriptionHandler:function(t){var o=t.item.getLongtextUrl();if(o){e.ajax({type:"GET",url:o,success:function(e){t.item.setDescription(e);t.promise.resolve()},error:function(){var s="A request has failed for long text data. URL: "+o;e.sap.log.error(s);t.promise.reject(s)}})}}};c.setDefaultHandlers=function(e){v.forEach(function(t){if(e.hasOwnProperty(t)){m[t]=e[t]}})};c.prototype.init=function(){var e=this;var s;this._oResourceBundle=sap.ui.getCore().getLibraryResourceBundle("sap.m");this._oMessageView=this._initMessageView();this._oMessageView.addEventDelegate({onBeforeRendering:function(){var t=e._oMessageView._oSegmentedButton.getVisible(),o=!e.getInitiallyExpanded()||t;e._oMessageView._oSegmentedButton.setVisible(o);e._oMessageView._listPage.setShowHeader(true)}});this._insertCloseBtn(this._oMessageView._oListHeader);this._insertCloseBtn(this._oMessageView._oDetailsHeader);this._oMessageView._oSegmentedButton.attachEvent("select",this._onSegButtonSelect,this);this._oPopover=new t(this.getId()+"-messagePopover",{showHeader:false,contentWidth:y,contentHeight:f,placement:this.getPlacement(),showCloseButton:false,verticalScrolling:false,horizontalScrolling:false,modal:false,afterOpen:function(t){e.fireAfterOpen({openBy:t.getParameter("openBy")})},afterClose:function(t){e._oMessageView._navContainer.backToTop();e.fireAfterClose({openBy:t.getParameter("openBy")})},beforeOpen:function(t){e.fireBeforeOpen({openBy:t.getParameter("openBy")})},beforeClose:function(t){e.fireBeforeClose({openBy:t.getParameter("openBy")})}}).addStyleClass(d);this._oPopover.addContent(this._oMessageView);this._oPopover.addAssociation("ariaLabelledBy",this.getId()+"-messageView-HeadingDescr",true);s=this._oPopover.getAggregation("_popup");s.oPopup.setAutoClose(false);s.addEventDelegate({onBeforeRendering:this.onBeforeRenderingPopover,onAfterRendering:this.onAfterRenderingPopover},this);if(g.system.phone){this._oPopover.setBeginButton(new o({text:this._oResourceBundle.getText("MESSAGEPOPOVER_CLOSE"),press:this.close.bind(this)}))}v.forEach(function(e){if(m.hasOwnProperty(e)){this["set"+h(e)](m[e])}},this)};c.prototype.onBeforeRendering=function(){if(this.getDependents().indexOf(this._oPopover)===-1){this.addDependent(this._oPopover)}};c.prototype.onBeforeRenderingPopover=function(){if(this._bItemsChanged){var e=this.getItems();var t=this;this._oMessageView.destroyItems();e.forEach(function(e){e._updateProperties(function(){t._bItemsChanged=true});this._oMessageView.addItem(e.clone("","",{cloneChildren:true,cloneBinding:true}))},this);this._bItemsChanged=false}this._setInitialFocus()};c.prototype.onAfterRenderingPopover=function(){if(this._oPopover._oControl._sFocusControlId){this._oPopover._oControl._sFocusControlId=null}};c.prototype.exit=function(){this._oResourceBundle=null;if(this._oMessageView){this._oMessageView.destroy();this._oMessageView=null}if(this._oPopover){this._oPopover.destroy();this._oPopover=null}};c.prototype.openBy=function(e){var t=this._oPopover.getAggregation("_popup"),o=e.getParent();if(t instanceof p){if(o instanceof s||o instanceof i||o instanceof a){t.setShowArrow(false);t.setResizable(true)}else{t.setShowArrow(true)}}if(this._oPopover){this._restoreExpansionDefaults();this._oPopover.openBy(e)}return this};c.prototype.close=function(){if(this._oPopover){this._oPopover.close()}return this};c.prototype.isOpen=function(){return this._oPopover.isOpen()};c.prototype.toggle=function(e){if(this.isOpen()){this.close()}else{this.openBy(e)}return this};c.prototype.setPlacement=function(e){this.setProperty("placement",e,true);this._oPopover.setPlacement(e);return this};c.prototype.getDomRef=function(e){return this._oPopover&&this._oPopover.getAggregation("_popup").getDomRef(e)};c.prototype._initMessageView=function(){var e=this,t;t=new l(this.getId()+"-messageView",{listSelect:function(t){e.fireListSelect({messageTypeFilter:t.getParameter("messageTypeFilter")})},itemSelect:function(t){e.fireItemSelect({messageTypeFilter:t.getParameter("messageTypeFilter"),item:t.getParameter("item")})},longtextLoaded:function(){e.fireLongtextLoaded()},urlValidated:function(){e.fireUrlValidated()}});return t};c.prototype._onSegButtonSelect=function(){if(this.isOpen()&&!this.getInitiallyExpanded()&&this._oPopover.hasStyleClass(d+"-init")){this._expandMsgPopover()}};c.prototype._restoreExpansionDefaults=function(){if(!this.getInitiallyExpanded()){this._collapseMsgPopover();this._oMessageView._oSegmentedButton.setSelectedButton("none")}else{this._expandMsgPopover()}};c.prototype._expandMsgPopover=function(){var e,t=f,e=this._oPopover.$("cont").css("height");if(this.getInitiallyExpanded()&&e!=="0px"){t=parseFloat(e)?e:t}this._oPopover.setContentHeight(t).removeStyleClass(d+"-init")};c.prototype._collapseMsgPopover=function(){this._oPopover.addStyleClass(d+"-init").setContentHeight("auto")};c.prototype._insertCloseBtn=function(e){var t=this._oResourceBundle.getText("MESSAGEPOPOVER_CLOSE"),s=new o({icon:_["close"],visible:!g.system.phone,tooltip:t,press:this.close.bind(this)}).addStyleClass(d+"CloseBtn");e.insertContent(s,3,true)};c.prototype._setInitialFocus=function(){if(this._oMessageView._isListPage()&&this.getInitiallyExpanded()){this._oPopover.setInitialFocus(this._oMessageView._oLists[this._sCurrentList||"all"])}};c.prototype._afterNavigate=function(){e.sap.delayedCall(0,this,"_restoreFocus")};c.prototype._restoreFocus=function(){if(this._oMessageView._isListPage()){var e=this._oRestoreFocus&&this._oRestoreFocus.control(0);e&&e.focus()}else{this._oMessageView._oBackButton.focus()}};c.prototype.setAsyncDescriptionHandler=function(e){this.setProperty("asyncDescriptionHandler",e,true);this._oMessageView.setProperty("asyncDescriptionHandler",e,true);return this};c.prototype.setAsyncURLHandler=function(e){this.setProperty("asyncURLHandler",e,true);this._oMessageView.setProperty("asyncURLHandler",e,true);return this};c.prototype.setModel=function(e,t){this._oMessageView.setModel(e,t);return r.prototype.setModel.apply(this,arguments)};["invalidate","addStyleClass","removeStyleClass","toggleStyleClass","hasStyleClass","getBusyIndicatorDelay","setBusyIndicatorDelay","getVisible","setVisible","getBusy","setBusy"].forEach(function(e){c.prototype[e]=function(){if(this._oPopover&&this._oPopover[e]){var t=this._oPopover;var o=t[e].apply(t,arguments);return o===t?this:o}}});["setModel","bindAggregation","setAggregation","insertAggregation","addAggregation","removeAggregation","removeAllAggregation","destroyAggregation"].forEach(function(e){c.prototype["_"+e+"Old"]=c.prototype[e];c.prototype[e]=function(){var t=c.prototype["_"+e+"Old"].apply(this,arguments);this._bItemsChanged=true;if(this._oPopover){this._oPopover.invalidate()}if(["removeAggregation","removeAllAggregation"].indexOf(e)!==-1){return t}return this}});return c});