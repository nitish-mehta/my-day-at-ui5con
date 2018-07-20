/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","./library","sap/m/ToggleButton","sap/ui/core/InvisibleText","sap/m/Toolbar","sap/m/ToolbarSpacer","sap/m/OverflowToolbarLayoutData","sap/m/OverflowToolbarAssociativePopover","sap/m/OverflowToolbarAssociativePopoverControls","sap/ui/core/IconPool","sap/ui/Device","./OverflowToolbarRenderer"],function(t,e,o,r,i,n,s,l,a,h,f,p){"use strict";var u=e.PlacementType;var d=e.ButtonType;var _=e.OverflowToolbarPriority;var c=i.extend("sap.m.OverflowToolbar",{metadata:{aggregations:{_overflowButton:{type:"sap.m.ToggleButton",multiple:false,visibility:"hidden"},_popover:{type:"sap.m.Popover",multiple:false,visibility:"hidden"}},designtime:"sap/m/designtime/OverflowToolbar.designtime"}});c.prototype._callToolbarMethod=function(t,e){return i.prototype[t].apply(this,e)};c.prototype.init=function(){this._callToolbarMethod("init",arguments);this._iPreviousToolbarWidth=null;this._bOverflowButtonNeeded=false;this._bNestedInAPopover=null;this._bListenForControlPropertyChanges=false;this._bControlsInfoCached=false;this._bSkipOptimization=false;this._aControlSizes={}};c.prototype.exit=function(){var t=this.getAggregation("_popover");if(t){t.destroy()}};c.prototype.onAfterRendering=function(){this._getOverflowButton().$().attr("aria-haspopup","true");this._doLayout();this._applyFocus()};c.prototype._doLayout=function(){var e=sap.ui.getCore();if(!e.isThemeApplied()){t.sap.log.debug("OverflowToolbar: theme not applied yet, skipping calculations",this);return}var o=this.$().width();this._bListenForControlPropertyChanges=false;this._deregisterToolbarResize();this._polyfillFlexboxSupport();if(o>0){if(!this._isControlsInfoCached()){this._cacheControlsInfo()}if(this._iPreviousToolbarWidth!==o){this._iPreviousToolbarWidth=o;this._setControlsOverflowAndShrinking(o);this.fireEvent("_controlWidthChanged")}}this._registerToolbarResize();this._bListenForControlPropertyChanges=true};c.prototype._applyFocus=function(){var t=sap.ui.getCore().byId(this.sFocusedChildControlId),e,o=this.$().lastFocusableDomRef();if(t){e=t.$()}if(e&&e.length){e.focus()}else if(this._bControlWasFocused){this._getOverflowButton().focus();this._bControlWasFocused=false;this._bOverflowButtonWasFocused=true}else if(this._bOverflowButtonWasFocused&&!this._getOverflowButtonNeeded()){o&&o.focus();this._bOverflowButtonWasFocused=false}};c.prototype._preserveChildControlFocusInfo=function(){var t=sap.ui.getCore().getCurrentFocusedControlId();if(this._getControlsIds().indexOf(t)!==-1){this._bControlWasFocused=true;this.sFocusedChildControlId=t}else if(t===this._getOverflowButton().getId()){this._bOverflowButtonWasFocused=true;this.sFocusedChildControlId=null}};c.prototype._polyfillFlexboxSupport=function(){if(p.hasNewFlexBoxSupport){return}var t=this.$();var e=t[0]||{};t.removeClass("sapMTBOverflow");var o=e.scrollWidth>e.clientWidth;o&&t.addClass("sapMTBOverflow")};c.prototype._cacheControlsInfo=function(){var t,e,o;this._aMovableControls=[];this._aToolbarOnlyControls=[];this._aActionSheetOnlyControls=[];this._iOldContentSize=this._iContentSize;this._iContentSize=0;this.getContent().forEach(function(r){t=c._getControlPriority(r);e=t!==_.NeverOverflow;o=t===_.AlwaysOverflow;var i=c._getOptimalControlWidth(r,this._aControlSizes[r.getId()]);this._aControlSizes[r.getId()]=i;if(a.supportsControl(r)&&o){this._aActionSheetOnlyControls.push(r)}else{this._iContentSize+=i;if(a.supportsControl(r)&&e&&r.getVisible()){this._aMovableControls.push(r)}else{this._aToolbarOnlyControls.push(r)}}},this);if(f.system.phone){this._iContentSize-=1}if(this._aActionSheetOnlyControls.length){var r=this._aActionSheetOnlyControls.filter(function(t){return t.getVisible()}),i=r.length>0;if(i){this._iContentSize+=this._getOverflowButtonSize()}}this._bControlsInfoCached=true;if(this._iOldContentSize!==this._iContentSize){this.fireEvent("_contentSizeChange",{contentSize:this._iContentSize})}};c.prototype._isControlsInfoCached=function(){return this._bControlsInfoCached};c.prototype._setControlsOverflowAndShrinking=function(t){var e=this._iContentSize,o=[],r,i,n,s=function(t){t.forEach(function(t){this._moveButtonToActionSheet(t)},this)},l=function(t){if(typeof t==="undefined"||this._getPopover()._getContentIdsHash()!==t){this._preserveChildControlFocusInfo();this.invalidate()}},a=function(t){if(!this._getOverflowButtonNeeded()){t+=this._getOverflowButtonSize();this._setOverflowButtonNeeded(true)}return t},h=function(t){var e={},o=[];t.forEach(function(t){var r=c._getControlGroup(t),i=c._oPriorityOrder,n,s,l;if(r){n=c._getControlPriority(t);s=this._getControlIndex(t);e[r]=e[r]||[];l=e[r];l.unshift(t);if(!l._priority||i[l._priority]<i[n]){l._priority=n}if(!l._index||l._index<s){l._index=s}}else{o.push(t)}},this);Object.keys(e).forEach(function(t){o.push(e[t])});return o},f=function(o){if(o.length){o.forEach(u,this)}else{u.call(this,o)}if(e<=t){return true}},p=function(t,e){var o=c._oPriorityOrder,r=c._getControlPriority(t),i=c._getControlPriority(e),n=o[r]-o[i];if(n!==0){return n}else{return this._getControlIndex(e)-this._getControlIndex(t)}},u=function(t){o.unshift(t);e-=this._aControlSizes[t.getId()]};if(this._bSkipOptimization){this._bSkipOptimization=false}else{r=this._getPopover()._getContentIdsHash()}this._resetToolbar();if(this._aActionSheetOnlyControls.length){for(i=this._aActionSheetOnlyControls.length-1;i>=0;i--){if(this._aActionSheetOnlyControls[i].getVisible()){o.unshift(this._aActionSheetOnlyControls[i])}}if(o.length>0){this._setOverflowButtonNeeded(true)}}if(e<=t){s.call(this,o);l.call(this,r);return}if(this._aMovableControls.length){e=a.call(this,e);n=h.call(this,this._aMovableControls);n.sort(p.bind(this));n.some(f,this)}s.call(this,o);if(e>t){this._checkContents()}l.call(this,r)};c.prototype._resetToolbar=function(){this._getPopover().close();this._getPopover()._getAllContent().forEach(function(t){this._restoreButtonInToolbar(t)},this);this._setOverflowButtonNeeded(false);this.getContent().forEach(function(t){t.removeStyleClass(i.shrinkClass)})};c.prototype._moveButtonToActionSheet=function(t){this._getPopover().addAssociatedContent(t)};c.prototype._restoreButtonInToolbar=function(t){if(typeof t==="object"){t=t.getId()}this._getPopover().removeAssociatedContent(t)};c.prototype._resetAndInvalidateToolbar=function(t){if(this._bIsBeingDestroyed){return}this._resetToolbar();for(var e in this._aControlSizes){if(this._aControlSizes.hasOwnProperty(e)){this._aControlSizes[e]=0}}this._bControlsInfoCached=false;this._bNestedInAPopover=null;this._iPreviousToolbarWidth=null;if(t){this._bSkipOptimization=true}if(this.$().length){this._preserveChildControlFocusInfo();this.invalidate()}};c.prototype._getVisibleContent=function(){var t=this.getContent(),e=this._getPopover()._getAllContent();return t.filter(function(t){return e.indexOf(t)===-1})};c.prototype._getVisibleAndNonOverflowContent=function(){return this._getVisibleContent().filter(function(t){return t.getVisible()})};c.prototype._getOverflowButton=function(){var t;if(!this.getAggregation("_overflowButton")){t=new o({id:this.getId()+"-overflowButton",icon:h.getIconURI("overflow"),press:this._overflowButtonPressed.bind(this),ariaLabelledBy:r.getStaticId("sap.ui.core","Icon.overflow"),type:d.Transparent});this.setAggregation("_overflowButton",t,true)}return this.getAggregation("_overflowButton")};c.prototype._overflowButtonPressed=function(t){var e=this._getPopover(),o=this._getBestActionSheetPlacement();if(e.getPlacement()!==o){e.setPlacement(o)}if(e.isOpen()){e.close()}else{e.openBy(t.getSource())}};c.prototype._getPopover=function(){var t;if(!this.getAggregation("_popover")){t=new l(this.getId()+"-popover",{showHeader:false,showArrow:false,modal:false,horizontalScrolling:f.system.phone?false:true,contentWidth:f.system.phone?"100%":"auto",offsetY:this._detireminePopoverVerticalOffset(),ariaLabelledBy:r.getStaticId("sap.m","INPUT_AVALIABLE_VALUES")});t._adaptPositionParams=function(){l.prototype._adaptPositionParams.call(this);this._myPositions=["end top","begin center","end bottom","end center"];this._atPositions=["end bottom","end center","end top","begin center"]};if(f.system.phone){t.attachBeforeOpen(this._shiftPopupShadow,this)}t.attachAfterClose(this._popOverClosedHandler,this);this.setAggregation("_popover",t,true)}return this.getAggregation("_popover")};c.prototype._shiftPopupShadow=function(){var t=this._getPopover(),e=t.getCurrentPosition();if(e===u.Bottom){t.addStyleClass("sapMOTAPopoverNoShadowTop");t.removeStyleClass("sapMOTAPopoverNoShadowBottom")}else if(e===u.Top){t.addStyleClass("sapMOTAPopoverNoShadowBottom");t.removeStyleClass("sapMOTAPopoverNoShadowTop")}};c.prototype._popOverClosedHandler=function(){var e=f.os.windows_phone||f.browser.edge&&f.browser.mobile;this._getOverflowButton().setPressed(false);this._getOverflowButton().$().focus();if(this._isNestedInsideAPopup()||e){return}this._getOverflowButton().setEnabled(false);t.sap.delayedCall(0,this,function(){this._getOverflowButton().setEnabled(true);t.sap.delayedCall(0,this,function(){this._getOverflowButton().$().focus()})})};c.prototype._isNestedInsideAPopup=function(){var t;if(this._bNestedInAPopover!==null){return this._bNestedInAPopover}t=function(e){if(!e){return false}if(e.getMetadata().isInstanceOf("sap.ui.core.PopupInterface")){return true}return t(e.getParent())};this._bNestedInAPopover=t(this);return this._bNestedInAPopover};c.prototype._getOverflowButtonNeeded=function(){return this._bOverflowButtonNeeded};c.prototype._setOverflowButtonNeeded=function(t){if(this._bOverflowButtonNeeded!==t){this._bOverflowButtonNeeded=t}return this};c.prototype.onLayoutDataChange=function(){this._resetAndInvalidateToolbar(true)};c.prototype.addContent=function(t){this._registerControlListener(t);this._resetAndInvalidateToolbar(false);return this._callToolbarMethod("addContent",arguments)};c.prototype.insertContent=function(t,e){this._registerControlListener(t);this._resetAndInvalidateToolbar(false);return this._callToolbarMethod("insertContent",arguments)};c.prototype.removeContent=function(t){var e=this._callToolbarMethod("removeContent",arguments);if(e){this._getPopover().removeAssociatedContent(e.getId())}this._resetAndInvalidateToolbar(false);this._deregisterControlListener(e);return e};c.prototype.removeAllContent=function(){var t=this._callToolbarMethod("removeAllContent",arguments);t.forEach(function(t){this._deregisterControlListener(t)},this);this._resetAndInvalidateToolbar(false);return t};c.prototype.destroyContent=function(){this._resetAndInvalidateToolbar(false);t.sap.delayedCall(0,this,function(){this._resetAndInvalidateToolbar(false)});return this._callToolbarMethod("destroyContent",arguments)};c.prototype._registerControlListener=function(t){if(t){t.attachEvent("_change",this._onContentPropertyChangedOverflowToolbar,this)}};c.prototype._deregisterControlListener=function(t){if(t){t.detachEvent("_change",this._onContentPropertyChangedOverflowToolbar,this)}};c.prototype._onContentPropertyChangedOverflowToolbar=function(t){if(!this._bListenForControlPropertyChanges){return}var e=t.getSource();var o=a.getControlConfig(e);var r=t.getParameter("name");if(typeof o!=="undefined"&&o.noInvalidationProps.indexOf(r)!==-1){return}this._resetAndInvalidateToolbar(true)};c.prototype._getOverflowButtonSize=function(){var t=parseInt(e.BaseFontSize,10),o=this.$().parents().hasClass("sapUiSizeCompact")?2.5:3;return parseInt(t*o,10)};c.prototype._getBestActionSheetPlacement=function(){var t=this.getHTMLTag();if(t==="Footer"){return u.Top}else if(t==="Header"){return u.Bottom}return u.Vertical};c.prototype._getControlsIds=function(){return this.getContent().map(function(t){return t.getId()})};c.prototype._getControlIndex=function(t){return t.length?t._index:this.indexOfContent(t)};c._getOptimalControlWidth=function(t,e){var o;if(t instanceof n){o=parseInt(t.$().css("min-width"),10)||0+t.$().outerWidth(true)-t.$().outerWidth()}else{o=t.getVisible()?t.$().outerWidth(true):0}if(o===null){o=typeof e!=="undefined"?e:0}return o};c._getControlPriority=function(t){if(t.length){return t._priority}var e=t.getMetadata().getInterfaces().indexOf("sap.m.IOverflowToolbarContent")>-1,o=e&&t.getOverflowToolbarConfig().getCustomImportance;if(e&&typeof o==="function"){return o()}var r=t.getLayoutData&&t.getLayoutData();if(r&&r instanceof s){if(r.getMoveToOverflow()===false){return _.NeverOverflow}if(r.getStayInOverflow()===true){return _.AlwaysOverflow}var i=r.getPriority();if(i===_.Never){return _.NeverOverflow}if(i===_.Always){return _.AlwaysOverflow}return i}return _.High};c._getControlGroup=function(t){var e=t.getLayoutData();if(e instanceof s){return e.getGroup()}};c._oPriorityOrder=function(){var t={};t[_.Disappear]=1;t[_.Low]=2;t["Medium"]=3;t[_.High]=4;return t}();c.prototype._detireminePopoverVerticalOffset=function(){return this.$().parents().hasClass("sapUiSizeCompact")?2:3};c.prototype.onThemeChanged=function(){this._resetAndInvalidateToolbar()};c.prototype.closeOverflow=function(){this._getPopover().close()};return c});