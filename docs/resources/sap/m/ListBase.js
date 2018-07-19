/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","sap/base/events/KeyCodes","sap/ui/Device","sap/ui/core/Control","sap/ui/core/InvisibleText","sap/ui/core/LabelEnablement","sap/ui/core/delegate/ItemNavigation","./library","./InstanceManager","./GrowingEnablement","./GroupHeaderListItem","./ListItemBase","./ListBaseRenderer"],function(t,e,i,s,o,n,r,a,p,u,l,d,h){"use strict";var g=a.ListType;var c=a.ListKeyboardMode;var f=a.ListGrowingDirection;var m=a.SwipeDirection;var y=a.ListSeparators;var I=a.ListMode;var v=a.ListHeaderDesign;var _=s.extend("sap.m.ListBase",{metadata:{library:"sap.m",properties:{inset:{type:"boolean",group:"Appearance",defaultValue:false},headerText:{type:"string",group:"Misc",defaultValue:null},headerDesign:{type:"sap.m.ListHeaderDesign",group:"Appearance",defaultValue:v.Standard,deprecated:true},footerText:{type:"string",group:"Misc",defaultValue:null},mode:{type:"sap.m.ListMode",group:"Behavior",defaultValue:I.None},width:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:"100%"},includeItemInSelection:{type:"boolean",group:"Behavior",defaultValue:false},showUnread:{type:"boolean",group:"Misc",defaultValue:false},noDataText:{type:"string",group:"Misc",defaultValue:null},showNoData:{type:"boolean",group:"Misc",defaultValue:true},enableBusyIndicator:{type:"boolean",group:"Behavior",defaultValue:true},modeAnimationOn:{type:"boolean",group:"Misc",defaultValue:true},showSeparators:{type:"sap.m.ListSeparators",group:"Appearance",defaultValue:y.All},swipeDirection:{type:"sap.m.SwipeDirection",group:"Misc",defaultValue:m.Both},growing:{type:"boolean",group:"Behavior",defaultValue:false},growingThreshold:{type:"int",group:"Misc",defaultValue:20},growingTriggerText:{type:"string",group:"Appearance",defaultValue:null},growingScrollToLoad:{type:"boolean",group:"Behavior",defaultValue:false},growingDirection:{type:"sap.m.ListGrowingDirection",group:"Behavior",defaultValue:f.Downwards},rememberSelections:{type:"boolean",group:"Behavior",defaultValue:true},keyboardMode:{type:"sap.m.ListKeyboardMode",group:"Behavior",defaultValue:c.Navigation}},defaultAggregation:"items",aggregations:{items:{type:"sap.m.ListItemBase",multiple:true,singularName:"item",bindable:"bindable",selector:"#{id} .sapMListItems",dnd:true},swipeContent:{type:"sap.ui.core.Control",multiple:false},headerToolbar:{type:"sap.m.Toolbar",multiple:false},infoToolbar:{type:"sap.m.Toolbar",multiple:false},contextMenu:{type:"sap.ui.core.IContextMenu",multiple:false}},associations:{ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}},events:{select:{deprecated:true,parameters:{listItem:{type:"sap.m.ListItemBase"}}},selectionChange:{parameters:{listItem:{type:"sap.m.ListItemBase"},listItems:{type:"sap.m.ListItemBase[]"},selected:{type:"boolean"},selectAll:{type:"boolean"}}},delete:{parameters:{listItem:{type:"sap.m.ListItemBase"}}},swipe:{allowPreventDefault:true,parameters:{listItem:{type:"sap.m.ListItemBase"},swipeContent:{type:"sap.ui.core.Control"},srcControl:{type:"sap.ui.core.Control"}}},growingStarted:{deprecated:true,parameters:{actual:{type:"int"},total:{type:"int"}}},growingFinished:{deprecated:true,parameters:{actual:{type:"int"},total:{type:"int"}}},updateStarted:{parameters:{reason:{type:"string"},actual:{type:"int"},total:{type:"int"}}},updateFinished:{parameters:{reason:{type:"string"},actual:{type:"int"},total:{type:"int"}}},itemPress:{parameters:{listItem:{type:"sap.m.ListItemBase"},srcControl:{type:"sap.ui.core.Control"}}},beforeOpenContextMenu:{allowPreventDefault:true,parameters:{listItem:{type:"sap.m.ListItemBase"}}}},designtime:"sap/m/designtime/ListBase.designtime"}});_.prototype.bAnnounceDetails=true;_.getInvisibleText=function(){return this.oInvisibleText||(this.oInvisibleText=(new o).toStatic())};_.prototype.sNavItemClass="sapMLIB";_.prototype.init=function(){this._aNavSections=[];this._aSelectedPaths=[];this._iItemNeedsHighlight=0;this.data("sap-ui-fastnavgroup","true",true)};_.prototype.onBeforeRendering=function(){this._bRendering=true;this._bActiveItem=false;this._aNavSections=[];this._removeSwipeContent()};_.prototype.onAfterRendering=function(){this._bRendering=false;this._sLastMode=this.getMode();if(i.system.desktop){this._bItemNavigationInvalidated=true}};_.prototype.exit=function(){this._oSelectedItem=null;this._aNavSections=[];this._aSelectedPaths=[];this._destroyGrowingDelegate();this._destroyItemNavigation()};_.prototype.refreshItems=function(t){if(this._oGrowingDelegate){this._oGrowingDelegate.refreshItems(t)}else{if(!this._bReceivingData){this._updateStarted(t);this._bReceivingData=true}this.refreshAggregation("items")}};_.prototype.updateItems=function(t){if(this._oGrowingDelegate){this._oGrowingDelegate.updateItems(t)}else{if(this._bReceivingData){this._bReceivingData=false}else{this._updateStarted(t)}this.updateAggregation("items");this._updateFinished()}};_.prototype.setBindingContext=function(){this._resetItemsBinding();return s.prototype.setBindingContext.apply(this,arguments)};_.prototype._bindAggregation=function(t,e){function i(t,e,i){t.events=t.events||{};if(!t.events[e]){t.events[e]=i}else{var s=t.events[e];t.events[e]=function(){i.apply(this,arguments);s.apply(this,arguments)}}}if(t==="items"){this._resetItemsBinding();i(e,"dataRequested",this._onBindingDataRequestedListener.bind(this));i(e,"dataReceived",this._onBindingDataReceivedListener.bind(this))}s.prototype._bindAggregation.call(this,t,e)};_.prototype._onBindingDataRequestedListener=function(e){this._showBusyIndicator();if(this._dataReceivedHandlerId!=null){t.sap.clearDelayedCall(this._dataReceivedHandlerId);delete this._dataReceivedHandlerId}};_.prototype._onBindingDataReceivedListener=function(e){if(this._dataReceivedHandlerId!=null){t.sap.clearDelayedCall(this._dataReceivedHandlerId);delete this._dataReceivedHandlerId}this._dataReceivedHandlerId=t.sap.delayedCall(0,this,function(){this._hideBusyIndicator();delete this._dataReceivedHandlerId})};_.prototype.destroyItems=function(t){if(!this.getItems(true).length){return this}this._oSelectedItem=null;this.destroyAggregation("items","KeepDom");if(!t){this.invalidate()}return this};_.prototype.removeAllItems=function(t){this._oSelectedItem=null;return this.removeAllAggregation("items")};_.prototype.removeItem=function(t){var e=this.removeAggregation("items",t);if(e&&e===this._oSelectedItem){this._oSelectedItem=null}return e};_.prototype.getItems=function(t){if(t){return this.mAggregations["items"]||[]}return this.getAggregation("items",[])};_.prototype.getId=function(t){var e=this.sId;return t?e+"-"+t:e};_.prototype.setGrowing=function(t){t=!!t;if(this.getGrowing()!=t){this.setProperty("growing",t,!t);if(t){this._oGrowingDelegate=new u(this)}else if(this._oGrowingDelegate){this._oGrowingDelegate.destroy();this._oGrowingDelegate=null}}return this};_.prototype.setGrowingThreshold=function(t){return this.setProperty("growingThreshold",t,true)};_.prototype.setEnableBusyIndicator=function(t){this.setProperty("enableBusyIndicator",t,true);if(!this.getEnableBusyIndicator()){this._hideBusyIndicator()}return this};_.prototype.setNoDataText=function(t){this.setProperty("noDataText",t,true);this.$("nodata-text").text(this.getNoDataText());return this};_.prototype.getNoDataText=function(t){if(t&&this._bBusy){return""}var e=this.getProperty("noDataText");e=e||sap.ui.getCore().getLibraryResourceBundle("sap.m").getText("LIST_NO_DATA");return e};_.prototype.getSelectedItem=function(){var t=this.getItems(true);for(var e=0;e<t.length;e++){if(t[e].getSelected()){return t[e]}}return null};_.prototype.setSelectedItem=function(e,i,s){if(this.indexOfItem(e)<0){t.sap.log.warning("setSelectedItem is called without valid ListItem parameter on "+this);return}if(this._bSelectionMode){e.setSelected(i===undefined?true:!!i);s&&this._fireSelectionChangeEvent([e])}};_.prototype.getSelectedItems=function(){return this.getItems(true).filter(function(t){return t.getSelected()})};_.prototype.setSelectedItemById=function(t,e){var i=sap.ui.getCore().byId(t);return this.setSelectedItem(i,e)};_.prototype.getSelectedContexts=function(t){var e=this.getBindingInfo("items"),i=(e||{}).model,s=this.getModel(i);if(!e||!s){return[]}if(t&&this.getRememberSelections()){return this._aSelectedPaths.map(function(t){return s.getContext(t)})}return this.getSelectedItems().map(function(t){return t.getBindingContext(i)})};_.prototype.removeSelections=function(t,e,i){var s=[];this._oSelectedItem=null;t&&(this._aSelectedPaths=[]);this.getItems(true).forEach(function(e){if(!e.getSelected()){return}if(i&&e.isSelectedBoundTwoWay()){return}e.setSelected(false,true);s.push(e);!t&&this._updateSelectedPaths(e)},this);if(e&&s.length){this._fireSelectionChangeEvent(s)}return this};_.prototype.selectAll=function(t){if(this.getMode()!="MultiSelect"){return this}var e=[];this.getItems(true).forEach(function(t){if(!t.getSelected()){t.setSelected(true,true);e.push(t);this._updateSelectedPaths(t)}},this);if(t&&e.length){this._fireSelectionChangeEvent(e,t)}return this};_.prototype.getLastMode=function(t){return this._sLastMode};_.prototype.setMode=function(t){t=this.validateProperty("mode",t);var e=this.getMode();if(e==t){return this}this._bSelectionMode=t.indexOf("Select")>-1;if(!this._bSelectionMode){this.removeSelections(true)}else{var i=this.getSelectedItems();if(i.length>1){this.removeSelections(true)}else if(e===I.MultiSelect){this._oSelectedItem=i[0]}}return this.setProperty("mode",t)};_.prototype.getGrowingInfo=function(){return this._oGrowingDelegate?this._oGrowingDelegate.getInfo():null};_.prototype.setRememberSelections=function(t){this.setProperty("rememberSelections",t,true);!this.getRememberSelections()&&(this._aSelectedPaths=[]);return this};_.prototype.setSelectedContextPaths=function(t){this._aSelectedPaths=t||[]};_.prototype.getSelectedContextPaths=function(t){if(!t||t&&this.getRememberSelections()){return this._aSelectedPaths.slice(0)}return this.getSelectedItems().map(function(t){return t.getBindingContextPath()})};_.prototype.isAllSelectableSelected=function(){if(this.getMode()!=I.MultiSelect){return false}var t=this.getItems(true),e=this.getSelectedItems().length,i=t.filter(function(t){return t.isSelectable()}).length;return t.length>0&&e==i};_.prototype.getVisibleItems=function(){return this.getItems(true).filter(function(t){return t.getVisible()})};_.prototype.getActiveItem=function(){return this._bActiveItem};_.prototype.onItemDOMUpdate=function(t){if(!this._bRendering&&this.bOutput){this._startItemNavigation(true)}};_.prototype.onItemActiveChange=function(t,e){this._bActiveItem=e};_.prototype.onItemHighlightChange=function(t,e){this._iItemNeedsHighlight+=e?1:-1;if(this._iItemNeedsHighlight==1&&e){this.$("listUl").addClass("sapMListHighlight")}else if(this._iItemNeedsHighlight==0){this.$("listUl").removeClass("sapMListHighlight")}};_.prototype.onItemSelectedChange=function(t,e){if(this.getMode()==I.MultiSelect){this._updateSelectedPaths(t,e);return}if(e){this._aSelectedPaths=[];this._oSelectedItem&&this._oSelectedItem.setSelected(false,true);this._oSelectedItem=t}else if(this._oSelectedItem===t){this._oSelectedItem=null}this._updateSelectedPaths(t,e)};_.prototype.getItemsContainerDomRef=function(){return this.getDomRef("listUl")};_.prototype.checkGrowingFromScratch=function(){};_.prototype.onBeforePageLoaded=function(t,e){this._fireUpdateStarted(e,t);this.fireGrowingStarted(t)};_.prototype.onAfterPageLoaded=function(t,e){this._fireUpdateFinished(t);this.fireGrowingFinished(t)};_.prototype.addNavSection=function(t){this._aNavSections.push(t);return t};_.prototype.getMaxItemsCount=function(){var t=this.getBinding("items");if(t&&t.getLength){return t.getLength()||0}return this.getItems(true).length};_.prototype.shouldRenderItems=function(){return true};_.prototype._resetItemsBinding=function(){if(this.isBound("items")){this._bUpdating=false;this._bReceivingData=false;this.removeSelections(true,false,true);this._oGrowingDelegate&&this._oGrowingDelegate.reset();this._hideBusyIndicator();if(this._oItemNavigation){this._oItemNavigation.iFocusedIndex=-1}}};_.prototype._updateStarted=function(t){if(!this._bReceivingData&&!this._bUpdating){this._bUpdating=true;this._fireUpdateStarted(t)}};_.prototype._fireUpdateStarted=function(e,i){this._sUpdateReason=t.sap.charToUpperCase(e||"Refresh");this.fireUpdateStarted({reason:this._sUpdateReason,actual:i?i.actual:this.getItems(true).length,total:i?i.total:this.getMaxItemsCount()})};_.prototype.onThemeChanged=function(){if(this._oGrowingDelegate){this._oGrowingDelegate._updateTrigger()}};_.prototype._updateFinished=function(){if(!this._bReceivingData&&this._bUpdating){this._fireUpdateFinished();this._bUpdating=false}};_.prototype._fireUpdateFinished=function(e){this._hideBusyIndicator();t.sap.delayedCall(0,this,function(){this._bItemNavigationInvalidated=true;this.fireUpdateFinished({reason:this._sUpdateReason,actual:e?e.actual:this.getItems(true).length,total:e?e.total:this.getMaxItemsCount()})})};_.prototype._showBusyIndicator=function(){if(this.getEnableBusyIndicator()&&!this.getBusy()&&!this._bBusy){this._bBusy=true;this._sBusyTimer=t.sap.delayedCall(this.getBusyIndicatorDelay(),this,function(){this.$("nodata-text").text("")});this.setBusy(true,"listUl")}};_.prototype._hideBusyIndicator=function(){if(this._bBusy){this._bBusy=false;this.setBusy(false,"listUl");t.sap.clearDelayedCall(this._sBusyTimer);if(!this.getItems(true).length){this.$("nodata-text").text(this.getNoDataText())}}};_.prototype.onItemBindingContextSet=function(t){if(!this._bSelectionMode||!this.getRememberSelections()||!this.isBound("items")){return}if(t.isSelectedBoundTwoWay()){return}var e=t.getBindingContextPath();if(e){var i=this._aSelectedPaths.indexOf(e)>-1;t.setSelected(i)}};_.prototype.onItemInserted=function(t,e){if(e){this.onItemSelectedChange(t,true)}if(!this._bSelectionMode||!this._aSelectedPaths.length||!this.getRememberSelections()||!this.isBound("items")||t.isSelectedBoundTwoWay()||t.getSelected()){return}var i=t.getBindingContextPath();if(i&&this._aSelectedPaths.indexOf(i)>-1){t.setSelected(true)}};_.prototype.onItemSelect=function(t,e){if(this.getMode()==I.MultiSelect){this._fireSelectionChangeEvent([t])}else if(this._bSelectionMode&&e){this._fireSelectionChangeEvent([t])}};_.prototype._fireSelectionChangeEvent=function(t,e){var i=t&&t[0];if(!i){return}this.fireSelectionChange({listItem:i,listItems:t,selected:i.getSelected(),selectAll:!!e});this.fireSelect({listItem:i})};_.prototype.onItemDelete=function(t){this.fireDelete({listItem:t})};_.prototype.onItemPress=function(e,i){if(e.getType()==g.Inactive){return}t.sap.delayedCall(0,this,function(){this.fireItemPress({listItem:e,srcControl:i})})};_.prototype._updateSelectedPaths=function(t,e){if(!this.getRememberSelections()||!this.isBound("items")){return}var i=t.getBindingContextPath();if(!i){return}e=e===undefined?t.getSelected():e;var s=this._aSelectedPaths.indexOf(i);if(e){s<0&&this._aSelectedPaths.push(i)}else{s>-1&&this._aSelectedPaths.splice(s,1)}};_.prototype._destroyGrowingDelegate=function(){if(this._oGrowingDelegate){this._oGrowingDelegate.destroy();this._oGrowingDelegate=null}};_.prototype._destroyItemNavigation=function(){if(this._oItemNavigation){this.removeEventDelegate(this._oItemNavigation);this._oItemNavigation.destroy();this._oItemNavigation=null}};_.prototype._getTouchBlocker=function(){return this.$().children()};_.prototype._getSwipeContainer=function(){return this._$swipeContainer||(this._$swipeContainer=t("<div>",{id:this.getId("swp"),class:"sapMListSwp"}))};_.prototype._setSwipePosition=function(){if(this._isSwipeActive){return this._getSwipeContainer().css("top",this._swipedItem.$().position().top)}};_.prototype._renderSwipeContent=function(){var t=this._swipedItem.$(),e=this._getSwipeContainer();this.$().prepend(e.css({top:t.position().top,height:t.outerHeight(true)}));if(this._bRerenderSwipeContent){this._bRerenderSwipeContent=false;var i=sap.ui.getCore().createRenderManager();i.render(this.getSwipeContent(),e.empty()[0]);i.destroy()}return this};_.prototype._swipeIn=function(){var e=this,i=e._getTouchBlocker(),s=e._getSwipeContainer();e._isSwipeActive=true;e._renderSwipeContent();p.addDialogInstance(e);window.document.activeElement.blur();t(window).on("resize.swp",function(){e._setSwipePosition()});i.css("pointer-events","none").on("touchstart.swp mousedown.swp",function(t){if(!s[0].firstChild.contains(t.target)){t.preventDefault();t.stopPropagation()}});s.bind("webkitAnimationEnd animationend",function(){t(this).unbind("webkitAnimationEnd animationend");s.css("opacity",1).focus();i.parent().on("touchend.swp touchcancel.swp mouseup.swp",function(t){if(!s[0].firstChild.contains(t.target)){e.swipeOut()}})}).removeClass("sapMListSwpOutAnim").addClass("sapMListSwpInAnim")};_.prototype._onSwipeOut=function(e){this._getSwipeContainer().css("opacity",0).remove();t(window).off("resize.swp");this._getTouchBlocker().css("pointer-events","auto").off("touchstart.swp mousedown.swp");if(typeof e=="function"){e.call(this,this._swipedItem,this.getSwipeContent())}this._isSwipeActive=false;p.removeDialogInstance(this)};_.prototype.swipeOut=function(e){if(!this._isSwipeActive){return this}var i=this,s=this._getSwipeContainer();this._getTouchBlocker().parent().off("touchend.swp touchend.swp touchcancel.swp mouseup.swp");s.bind("webkitAnimationEnd animationend",function(){t(this).unbind("webkitAnimationEnd animationend");i._onSwipeOut(e)}).removeClass("sapMListSwpInAnim").addClass("sapMListSwpOutAnim");return this};_.prototype._removeSwipeContent=function(){if(this._isSwipeActive){this.swipeOut()._onSwipeOut()}};_.prototype.close=_.prototype._removeSwipeContent;_.prototype._onSwipe=function(t){var e=this.getSwipeContent(),s=t.srcControl;if(e&&s&&!this._isSwipeActive&&this!==s&&!this._eventHandledByControl&&i.support.touch){for(var o=s;o&&!(o instanceof d);o=o.oParent);if(o instanceof d){this._swipedItem=o;this.fireSwipe({listItem:this._swipedItem,swipeContent:e,srcControl:s},true)&&this._swipeIn()}}};_.prototype.ontouchstart=function(t){this._eventHandledByControl=t.isMarked()};_.prototype.onswipeleft=function(t){var e=sap.ui.getCore().getConfiguration().getRTL()?"RightToLeft":"LeftToRight";if(this.getSwipeDirection()!=e){this._onSwipe(t)}};_.prototype.onswiperight=function(t){var e=sap.ui.getCore().getConfiguration().getRTL()?"LeftToRight":"RightToLeft";if(this.getSwipeDirection()!=e){this._onSwipe(t)}};_.prototype.setSwipeDirection=function(t){return this.setProperty("swipeDirection",t,true)};_.prototype.getSwipedItem=function(){return this._isSwipeActive?this._swipedItem:null};_.prototype.setSwipeContent=function(t){this._bRerenderSwipeContent=true;this.toggleStyleClass("sapMListSwipable",!!t);return this.setAggregation("swipeContent",t,!this._isSwipeActive)};_.prototype.invalidate=function(t){if(t&&t===this.getSwipeContent()){this._bRerenderSwipeContent=true;this._isSwipeActive&&this._renderSwipeContent();return this}return s.prototype.invalidate.apply(this,arguments)};_.prototype.addItemGroup=function(t,e,i){e=e||new l({title:t.text||t.key});e._bGroupHeader=true;this.addAggregation("items",e,i);return e};_.prototype.removeGroupHeaders=function(t){this.getItems(true).forEach(function(e){if(e.isGroupHeader()){e.destroy(t)}})};_.prototype.getAccessibilityType=function(){return sap.ui.getCore().getLibraryResourceBundle("sap.m").getText("ACC_CTR_TYPE_LIST")};_.prototype.getAccessibilityStates=function(){if(!this.getItems(true).length){return""}var t="",e=I,i=this.getMode(),s=sap.ui.getCore().getLibraryResourceBundle("sap.m");if(n.isRequired(this)){t+=s.getText("LIST_REQUIRED")+" "}if(i==e.MultiSelect){t+=s.getText("LIST_MULTISELECTABLE")+" "}else if(i==e.Delete){t+=s.getText("LIST_DELETABLE")+" "}else if(i!=e.None){t+=s.getText("LIST_SELECTABLE")+" "}if(this.isGrouped()){t+=s.getText("LIST_GROUPED")+" "}return t};_.prototype.getAccessibilityDescription=function(){var t=this.getAriaLabelledBy().map(function(t){var e=sap.ui.getCore().byId(t);return d.getAccessibilityText(e)}).join(" ");var e=this.getHeaderToolbar();if(e){var i=e.getTitleControl();if(i){t+=i.getText()+" "}}else{t+=this.getHeaderText()+" "}t+=this.getAccessibilityStates()+" ";return t};_.prototype.getAccessibilityInfo=function(){return{description:this.getAccessibilityDescription().trim(),focusable:true}};_.prototype.getAccessbilityPosition=function(t){var e=0,i=this.getVisibleItems(),s=i.indexOf(t)+1,o=this.getBinding("items");if(this.getGrowing()&&this.getGrowingScrollToLoad()&&o&&o.isLengthFinal()){e=o.getLength();if(o.isGrouped()){e+=i.filter(function(t){return t.isGroupHeader()&&t.getVisible()}).length}}else{e=i.length}return{setSize:e,posInset:s}};_.prototype.onItemFocusIn=function(t,e){if(t!==e){return}if(!sap.ui.getCore().getConfiguration().getAccessibility()){return}var i=t.getDomRef(),s=this.getAccessbilityPosition(t);if(!t.getContentAnnouncement){this.getNavigationRoot().setAttribute("aria-activedescendant",i.id);i.setAttribute("aria-posinset",s.posInset);i.setAttribute("aria-setsize",s.setSize)}else{var o=t.getAccessibilityInfo(),n=sap.ui.getCore().getLibraryResourceBundle("sap.m"),r=o.type+" ";r+=n.getText("LIST_ITEM_POSITION",[s.posInset,s.setSize])+" ";r+=o.description;this.updateInvisibleText(r,i);return r}};_.prototype.updateInvisibleText=function(e,i,s){var o=_.getInvisibleText(),n=t(i||document.activeElement);if(this.bAnnounceDetails){this.bAnnounceDetails=false;e=this.getAccessibilityInfo().description+" "+e}o.setText(e.trim());n.addAriaLabelledBy(o.getId(),s);window.setTimeout(function(){n.removeAriaLabelledBy(o.getId())},0)};_.prototype.getNavigationRoot=function(){return this.getDomRef("listUl")};_.prototype.getFocusDomRef=function(){return this.getNavigationRoot()};_.prototype._startItemNavigation=function(t){if(!i.system.desktop){return}var e=this.getKeyboardMode(),s=c;if(e==s.Edit&&!this.getItems(true).length){return}var o=this.getNavigationRoot();var n=e==s.Edit?-1:0;if(t&&!o.contains(document.activeElement)){this._bItemNavigationInvalidated=true;if(!o.getAttribute("tabindex")){o.tabIndex=n}return}if(!this._oItemNavigation){this._oItemNavigation=new r;this._oItemNavigation.setCycling(false);this.addEventDelegate(this._oItemNavigation);this._setItemNavigationTabIndex(n);this._oItemNavigation.setTableMode(true,true).setColumns(1);this._oItemNavigation.setDisabledModifiers({sapnext:["alt"],sapprevious:["alt"]})}this._oItemNavigation.setPageSize(this.getGrowingThreshold());this._oItemNavigation.setRootDomRef(o);this.setNavigationItems(this._oItemNavigation,o);this._bItemNavigationInvalidated=false};_.prototype.setNavigationItems=function(e,i){var s=t(i).children(".sapMLIB").get();e.setItemDomRefs(s);if(e.getFocusedIndex()==-1){if(this.getGrowing()&&this.getGrowingDirection()==f.Upwards){e.setFocusedIndex(s.length-1)}else{e.setFocusedIndex(0)}}};_.prototype.getItemNavigation=function(){return this._oItemNavigation};_.prototype._setItemNavigationTabIndex=function(t){if(this._oItemNavigation){this._oItemNavigation.iActiveTabIndex=t;this._oItemNavigation.iTabIndex=t}};_.prototype.setKeyboardMode=function(t){this.setProperty("keyboardMode",t,true);if(this.isActive()){var e=t==c.Edit?-1:0;this.$("nodata").prop("tabIndex",~e);this.$("listUl").prop("tabIndex",e);this.$("after").prop("tabIndex",e);this._setItemNavigationTabIndex(e)}return this};_.prototype.setItemFocusable=function(t){if(!this._oItemNavigation){return}var e=this._oItemNavigation.getItemDomRefs();var i=e.indexOf(t.getDomRef());if(i>=0){this._oItemNavigation.setFocusedIndex(i)}};_.prototype.forwardTab=function(t){this._bIgnoreFocusIn=true;this.$(t?"after":"before").focus()};_.prototype.onsaptabnext=function(t){if(t.isMarked()||this.getKeyboardMode()==c.Edit){return}if(t.target.id==this.getId("nodata")){this.forwardTab(true);t.setMarked()}};_.prototype.onsaptabprevious=function(t){if(t.isMarked()||this.getKeyboardMode()==c.Edit){return}var e=t.target.id;if(e==this.getId("nodata")){this.forwardTab(false)}else if(e==this.getId("trigger")){this.focusPrevious();t.preventDefault()}};_.prototype._navToSection=function(e){var i;var s=0;var o=e?1:-1;var n=this._aNavSections.length;this._aNavSections.some(function(e,i){var o=t.sap.domById(e);if(o&&o.contains(document.activeElement)){s=i;return true}});var r=this.getItemsContainerDomRef();var a=t.sap.byId(this._aNavSections[s]);if(a[0]===r&&this._oItemNavigation){a.data("redirect",this._oItemNavigation.getFocusedIndex())}this._aNavSections.some(function(){s=(s+o+n)%n;i=t.sap.byId(this._aNavSections[s]);if(i[0]===r&&this._oItemNavigation){var e=i.data("redirect");var a=this._oItemNavigation.getItemDomRefs();var p=a[e]||r.children[0];i=t(p)}if(i.is(":focusable")){i.focus();return true}},this);return i};_.prototype.onsapshow=function(i){if(i.isMarked()||i.which==e.F4||i.target.id!=this.getId("trigger")&&!t(i.target).hasClass(this.sNavItemClass)){return}if(this._navToSection(true)){i.preventDefault();i.setMarked()}};_.prototype.onsaphide=function(e){if(e.isMarked()||e.target.id!=this.getId("trigger")&&!t(e.target).hasClass(this.sNavItemClass)){return}if(this._navToSection(false)){e.preventDefault();e.setMarked()}};_.prototype.onkeydown=function(i){var s=i.which==e.A&&(i.metaKey||i.ctrlKey);if(i.isMarked()||!s||!t(i.target).hasClass(this.sNavItemClass)){return}i.preventDefault();if(this.getMode()!==I.MultiSelect){return}if(this.isAllSelectableSelected()){this.removeSelections(false,true)}else{this.selectAll(true)}i.setMarked()};_.prototype.onmousedown=function(t){if(this._bItemNavigationInvalidated){this._startItemNavigation()}};_.prototype.focusPrevious=function(){if(!this._oItemNavigation){return}var e=this._oItemNavigation.getItemDomRefs();var i=this._oItemNavigation.getFocusedIndex();var s=t(e[i]);var o=s.control(0)||{};var n=o.getTabbables?o.getTabbables():s.find(":sapTabbable");var r=n.eq(-1).add(s).eq(-1);this.bAnnounceDetails=true;r.focus()};_.prototype.onfocusin=function(t){if(this._bIgnoreFocusIn){this._bIgnoreFocusIn=false;t.stopImmediatePropagation(true);return}if(this._bItemNavigationInvalidated){this._startItemNavigation()}var e=t.target;if(e.id==this.getId("nodata")){this.updateInvisibleText(this.getNoDataText(),e)}if(t.isMarked()||!this._oItemNavigation||this.getKeyboardMode()==c.Edit||e.id!=this.getId("after")){return}this.focusPrevious();t.setMarked()};_.prototype.onsapfocusleave=function(t){if(this._oItemNavigation&&!this.bAnnounceDetails&&!this.getNavigationRoot().contains(document.activeElement)){this.bAnnounceDetails=true}};_.prototype.onItemArrowUpDown=function(t,e){var i=this.getItems(true),s=i.indexOf(t)+(e.type=="sapup"?-1:1),o=i[s];if(o&&o.isGroupHeader()){o=i[s+(e.type=="sapup"?-1:1)]}if(!o){return}var n=o.getTabbables(),r=t.getTabbables().index(e.target),a=n.eq(n[r]?r:-1);a[0]?a.focus():o.focus();e.preventDefault();e.setMarked()};_.prototype.onItemContextMenu=function(e,i){var s=this.getContextMenu();if(!s){return}var o=this.fireBeforeOpenContextMenu({listItem:e,column:sap.ui.getCore().byId(t(i.target).closest(".sapMListTblCell",this.getNavigationRoot()).attr("data-sap-ui-column"))});if(o){i.setMarked();i.preventDefault();var n,r=this.getBindingInfo("items");if(r){n=e.getBindingContext(r.model);s.setBindingContext(n)}s.openAsContextMenu(i,e)}};_.prototype.isGrouped=function(){var t=this.getBinding("items");return t&&t.isGrouped()};_.prototype.setContextMenu=function(t){this.setAggregation("contextMenu",t,true)};_.prototype.destroyContextMenu=function(){this.destroyAggregation("contextMenu",true)};return _});