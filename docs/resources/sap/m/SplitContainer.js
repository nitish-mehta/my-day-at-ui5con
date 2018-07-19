/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","./library","sap/ui/core/Control","sap/ui/core/IconPool","sap/m/semantic/SemanticPage","sap/ui/core/InvisibleText","sap/ui/Device","sap/ui/base/ManagedObject","sap/m/NavContainer","sap/m/Popover","./SplitContainerRenderer"],function(t,e,a,i,s,o,r,n,p,l,h){"use strict";var g=e.ButtonType;var u=e.PlacementType;var f=e.SplitAppMode;var d=a.extend("sap.m.SplitContainer",{metadata:{library:"sap.m",properties:{defaultTransitionNameDetail:{type:"string",group:"Appearance",defaultValue:"slide"},defaultTransitionNameMaster:{type:"string",group:"Appearance",defaultValue:"slide"},mode:{type:"sap.m.SplitAppMode",group:"Appearance",defaultValue:f.ShowHideMode},masterButtonText:{type:"string",group:"Appearance",defaultValue:null},masterButtonTooltip:{type:"string",group:"Appearance",defaultValue:null},backgroundColor:{type:"string",group:"Appearance",defaultValue:null},backgroundImage:{type:"sap.ui.core.URI",group:"Appearance",defaultValue:null},backgroundRepeat:{type:"boolean",group:"Appearance",defaultValue:false},backgroundOpacity:{type:"float",group:"Appearance",defaultValue:1}},aggregations:{masterPages:{type:"sap.ui.core.Control",multiple:true,singularName:"masterPage"},detailPages:{type:"sap.ui.core.Control",multiple:true,singularName:"detailPage"},_navMaster:{type:"sap.m.NavContainer",multiple:false,visibility:"hidden"},_navDetail:{type:"sap.m.NavContainer",multiple:false,visibility:"hidden"},_navPopover:{type:"sap.m.Popover",multiple:false,visibility:"hidden"}},associations:{initialDetail:{type:"sap.ui.core.Control",multiple:false},initialMaster:{type:"sap.ui.core.Control",multiple:false}},events:{masterNavigate:{allowPreventDefault:true,parameters:{from:{type:"sap.ui.core.Control"},fromId:{type:"string"},to:{type:"sap.ui.core.Control"},toId:{type:"string"},firstTime:{type:"boolean"},isTo:{type:"boolean"},isBack:{type:"boolean"},isBackToTop:{type:"boolean"},isBackToPage:{type:"boolean"},direction:{type:"string"}}},afterMasterNavigate:{parameters:{from:{type:"sap.ui.core.Control"},fromId:{type:"string"},to:{type:"sap.ui.core.Control"},toId:{type:"string"},firstTime:{type:"boolean"},isTo:{type:"boolean"},isBack:{type:"boolean"},isBackToTop:{type:"boolean"},isBackToPage:{type:"boolean"},direction:{type:"string"}}},masterButton:{},beforeMasterOpen:{},afterMasterOpen:{},beforeMasterClose:{},afterMasterClose:{},detailNavigate:{allowPreventDefault:true,parameters:{from:{type:"sap.ui.core.Control"},fromId:{type:"string"},to:{type:"sap.ui.core.Control"},toId:{type:"string"},firstTime:{type:"boolean"},isTo:{type:"boolean"},isBack:{type:"boolean"},isBackToTop:{type:"boolean"},isBackToPage:{type:"boolean"},direction:{type:"string"}}},afterDetailNavigate:{parameters:{from:{type:"sap.ui.core.Control"},fromId:{type:"string"},to:{type:"sap.ui.core.Control"},toId:{type:"string"},firstTime:{type:"boolean"},isTo:{type:"boolean"},isBack:{type:"boolean"},isBackToTop:{type:"boolean"},isBackToPage:{type:"boolean"},direction:{type:"string"}}}},designtime:"sap/m/designtime/SplitContainer.designtime"}});d.prototype.init=function(){var e=this;this._isMie9=false;if(r.browser.internet_explorer&&r.browser.version<10){this._isMie9=true}if(sap.ui.getCore().getConfiguration().getAccessibility()&&!d._sAriaPopupLabelId){d._sAriaPopupLabelId=new o({text:""}).toStatic().getId()}this._rb=sap.ui.getCore().getLibraryResourceBundle("sap.m");this._aMasterPages=[];this._aDetailPages=[];if(!r.system.phone){this._oMasterNav=new p(this.getId()+"-Master",{width:"",navigate:function(t){e._handleNavigationEvent(t,false,true)},afterNavigate:function(t){e._handleNavigationEvent(t,true,true);e._updateMasterButtonTooltip()}});this._oDetailNav=new p(this.getId()+"-Detail",{width:"",navigate:function(t){e._handleNavigationEvent(t,false,false)},afterNavigate:function(t){e._handleNavigationEvent(t,true,false)}});this.setAggregation("_navMaster",this._oMasterNav,true);this.setAggregation("_navDetail",this._oDetailNav,true);this._createShowMasterButton();this._oPopOver=new l(this.getId()+"-Popover",{placement:u.Bottom,showHeader:false,contentWidth:"320px",contentHeight:"600px",beforeOpen:function(){e.fireBeforeMasterOpen()},beforeClose:function(){e.fireBeforeMasterClose()},afterOpen:function(){e.fireAfterMasterOpen();e._bMasterisOpen=true},afterClose:function(){e._afterHideMasterAnimation()}}).addStyleClass("sapMSplitContainerPopover");if(d._sAriaPopupLabelId){this._oPopOver.addAriaLabelledBy(d._sAriaPopupLabelId)}this.setAggregation("_navPopover",this._oPopOver,true)}else{this._oMasterNav=this._oDetailNav=new p({width:"",navigate:function(t){e._handleNavigationEvent(t,false,true)},afterNavigate:function(t){e._handleNavigationEvent(t,true,true)}});this.setAggregation("_navMaster",this._oMasterNav,true)}this._oldIsLandscape=r.orientation.landscape;this._bMasterisOpen=false;var e=this;var a=function(a,i,s){return function(o,r,n){a.apply(e[i],arguments);if(r==="pages"&&t.inArray(o,e[s])!==-1){e._removePageFromArray(e[s],o)}}};var i=this._oMasterNav._removeChild;this._oMasterNav._removeChild=a(i,"_oMasterNav","_aMasterPages");if(this._oDetailNav){var s=this._oDetailNav._removeChild;this._oDetailNav._removeChild=a(s,"_oDetailNav","_aDetailPages")}};d.prototype.onBeforeRendering=function(){if(this._fnResize){r.resize.detachHandler(this._fnResize)}if(this._bMasterisOpen&&(this._portraitHide()||this._hideMode())){this._oShowMasterBtn.removeStyleClass("sapMSplitContainerMasterBtnHidden");this._bMasterisOpen=false}this._updateMasterButtonTooltip()};d.prototype.exit=function(){if(this._fnResize){r.resize.detachHandler(this._fnResize)}delete this._aMasterPages;delete this._aDetailPages;if(this._oShowMasterBtn){this._oShowMasterBtn.destroy();this._oShowMasterBtn=null}};d.prototype.onAfterRendering=function(){if(!r.system.phone&&this._oPopOver&&this._oPopOver.isOpen()){this._oPopOver.close()}if(!this._fnResize){this._fnResize=t.proxy(this._handleResize,this)}r.resize.attachHandler(this._fnResize);if(r.os.windows&&r.browser.internet_explorer){this._oMasterNav.$().append('<iframe class="sapMSplitContainerMasterBlindLayer" src="about:blank"></iframe>')}t.sap.delayedCall(0,this,function(){this._oMasterNav.removeStyleClass("sapMSplitContainerNoTransition")})};d.prototype.ontouchstart=function(t){if(!r.system.phone){this._bIgnoreSwipe=t.originalEvent&&t.originalEvent._sapui_handledByControl}};d.prototype.onswiperight=function(t){if(r.support.touch===false){return}if((r.system.tablet||r.os.windows&&r.os.version>=8)&&(this._portraitHide()||this._hideMode())&&!this._bIgnoreSwipe&&!this._bDetailNavButton){this.showMaster()}};d.prototype.ontap=function(e){if(r.system.phone){return}var a=true,i=t(e.target).closest(".sapMSplitContainerDetail, .sapMSplitContainerMaster"),s=e.srcControl.getMetadata();if(i.length>0&&i.hasClass("sapMSplitContainerDetail")){a=false}if((!this._oldIsLandscape&&this.getMode()=="ShowHideMode"||this.getMode()=="HideMode")&&!a&&!t.sap.containsOrEquals(this._oShowMasterBtn.getDomRef(),e.target)&&(!s.getEvent("tap")||!s.getEvent("press"))){this.hideMaster()}};d.prototype.onswipeleft=function(t){if((r.system.tablet||r.os.windows&&r.os.version>=8)&&(this._portraitHide()||this._hideMode())&&!this._bIgnoreSwipe){this.hideMaster()}};d.prototype._onMasterButtonTap=function(t){if(r.system.phone){return}if(!this._oldIsLandscape){if(this.getMode()=="PopoverMode"){if(!this._oPopOver.isOpen()){this._oPopOver.openBy(this._oShowMasterBtn,true)}else{this._oPopOver.close()}}else{this.showMaster()}}else{if(this.getMode()==="HideMode"){this.showMaster()}}};d.prototype.to=function(t,e,a,i){if(this._oMasterNav.getPage(t)){this._oMasterNav.to(t,e,a,i)}else{this._oDetailNav.to(t,e,a,i)}};d.prototype.backToPage=function(t,e,a){if(this._oMasterNav.getPage(t)){this._oMasterNav.backToPage(t,e,a)}else{this._oDetailNav.backToPage(t,e,a)}};d.prototype.insertPreviousPage=function(t,e,a){if(this._oMasterNav.getPage(t)){this._oMasterNav.insertPreviousPage(t,e,a)}else{this._oDetailNav.insertPreviousPage(t,e,a)}return this};d.prototype.toMaster=function(t,e,a,i){this._oMasterNav.to(t,e,a,i)};d.prototype.backMaster=function(t,e){this._oMasterNav.back(t,e)};d.prototype.backMasterToPage=function(t,e,a){this._oMasterNav.backToPage(t,e,a)};d.prototype.toDetail=function(t,e,a,i){this._oDetailNav.to(t,e,a,i)};d.prototype.backDetail=function(t,e){this._oDetailNav.back(t,e)};d.prototype.backDetailToPage=function(t,e,a){this._oDetailNav.backToPage(t,e,a)};d.prototype.backToTopMaster=function(t,e){this._oMasterNav.backToTop(t,e)};d.prototype.backToTopDetail=function(t,e){this._oDetailNav.backToTop(t,e)};d.prototype.addMasterPage=function(e){if(this._hasPageInArray(this._aMasterPages,e)){return}if(this._oMasterNav===this._oDetailNav&&t.inArray(e,this._oDetailNav.getPages())!==-1){this._removePageFromArray(this._aDetailPages,e)}this._oMasterNav.insertPage(e,this._aMasterPages.length);this._aMasterPages.push(e);return this};d.prototype.addDetailPage=function(e){var a=this,i=this._getRealPage(e);if(this._hasPageInArray(this._aDetailPages,e)){return}e.addDelegate({onBeforeShow:function(){if(i){if(!r.system.phone){if(a._needShowMasterButton()){a._setMasterButton(i)}}}}});if(i){i.addDelegate({onBeforeRendering:function(){if(!r.system.phone&&a._oDetailNav.getCurrentPage()===i){if(!i.getShowNavButton()&&a._needShowMasterButton()){a._setMasterButton(i,true)}else{a._removeMasterButton(i)}}}});if(!r.system.phone){if(!i._setCustomHeaderInSC){i._setCustomHeaderInSC=i.setCustomHeader}i.setCustomHeader=function(t){this._setCustomHeaderInSC.apply(this,arguments);if(t&&a._needShowMasterButton()){a._setMasterButton(i)}return this};if(!i._setShowNavButtonInSC){i._setShowNavButtonInSC=i.setShowNavButton}i.setShowNavButton=function(t){this._setShowNavButtonInSC.apply(this,arguments);if(!t&&a._needShowMasterButton()){a._setMasterButton(i)}else{a._removeMasterButton(i,true)}return this}}}if(this._oMasterNav===this._oDetailNav&&t.inArray(e,this._oMasterNav.getPages())!==-1){this._removePageFromArray(this._aMasterPages,e)}this._oDetailNav.addPage(e);this._aDetailPages.push(e);return this};d.prototype.getMasterPages=function(){return this._aMasterPages};d.prototype.getDetailPages=function(){return this._aDetailPages};d.prototype.indexOfMasterPage=function(t){return this._indexOfMasterPage(t)};d.prototype.indexOfDetailPage=function(t){return this._indexOfDetailPage(t)};d.prototype.insertMasterPage=function(t,e,a){return this._insertPage(this._aMasterPages,"masterPages",t,e,a)};d.prototype.removeMasterPage=function(t,e){return this._removePage(this._aMasterPages,"masterPages",t,e)};d.prototype.removeAllMasterPages=function(t){this._aMasterPages=[];return this.removeAllAggregation("masterPages",t)};d.prototype.insertDetailPage=function(t,e,a){return this._insertPage(this._aDetailPages,"detailPages",t,e,a)};d.prototype._restoreMethodsInPage=function(t){if(r.system.phone){return}var e=this._getRealPage(t);if(e){if(e._setCustomHeaderInSC){e.setCustomHeader=e._setCustomHeaderInSC;delete e._setCustomHeaderInSC}if(e._setShowNavButtonInSC){e.setShowNavButton=e._setShowNavButtonInSC;delete e._setShowNavButtonInSC}}};d.prototype.removeDetailPage=function(t,e){this._restoreMethodsInPage(t);return this._removePage(this._aDetailPages,"detailPages",t,e)};d.prototype.removeAllDetailPages=function(t){var e=this.getDetailPages();for(var a=0;a<e.length;a++){this._restoreMethodsInPage(e[a])}this._aDetailPages=[];return this.removeAllAggregation("detailPages",t)};d.prototype.addPage=function(t,e){if(e){return this.addMasterPage(t)}else{return this.addDetailPage(t)}};d.prototype.showMaster=function(){var e=this._oMasterNav.$(),a=this,i=t.proxy(this._afterShowMasterAnimation,this),s=this._getRealPage(this._oDetailNav.getCurrentPage());function o(){this._oPopOver.detachAfterOpen(o,this);this._bMasterOpening=false;this._bMasterisOpen=true;this.fireAfterMasterOpen()}if(this._portraitPopover()){if(!this._oPopOver.isOpen()){this._oPopOver.attachAfterOpen(o,this);this.fireBeforeMasterOpen();this._oPopOver.openBy(this._oShowMasterBtn,true);this._bMasterOpening=true}}else{if((this._portraitHide()||this._hideMode())&&(!this._bMasterisOpen||this._bMasterClosing)){if(this._isMie9){this._oMasterNav.$().css("width","320px");e.animate({left:"+=320"},{duration:300,complete:i});this._bMasterisOpen=true;a._bMasterOpening=false;this._removeMasterButton(s)}else{e.bind("webkitTransitionEnd transitionend",i)}this.fireBeforeMasterOpen();this._oMasterNav.toggleStyleClass("sapMSplitContainerMasterVisible",true);this._oMasterNav.toggleStyleClass("sapMSplitContainerMasterHidden",false);this._bMasterOpening=true;a._removeMasterButton(s);if(r.browser.webkit){var n=this._oMasterNav;window.setTimeout(function(){n.$().css("box-shadow","none");window.setTimeout(function(){n.$().css("box-shadow","")},50)},0)}}}return this};d.prototype.hideMaster=function(){var e=this._oMasterNav.$(),a=t.proxy(this._afterHideMasterAnimation,this);if(this._portraitPopover()){if(this._oPopOver.isOpen()){this._oPopOver.close();this._bMasterClosing=true}}else{if((this._portraitHide()||this._hideMode())&&(this._bMasterisOpen||this._oMasterNav.$().hasClass("sapMSplitContainerMasterVisible"))){if(this._isMie9){e.animate({left:"-=320"},{duration:300,complete:a})}else{e.bind("webkitTransitionEnd transitionend",a)}this.fireBeforeMasterClose();this._oMasterNav.toggleStyleClass("sapMSplitContainerMasterVisible",false);this._oMasterNav.toggleStyleClass("sapMSplitContainerMasterHidden",true);this._bMasterClosing=true}}return this};d.prototype._afterShowMasterAnimation=function(){if(this._portraitHide()||this._hideMode()){if(!this._isMie9){var t=this._oMasterNav.$();t.unbind("webkitTransitionEnd transitionend",this._afterShowMasterAnimation)}this._bMasterOpening=false;this._bMasterisOpen=true;this.fireAfterMasterOpen()}};d.prototype._afterHideMasterAnimation=function(){if(this._portraitHide()||this._hideMode()){if(!this._isMie9){var e=this._oMasterNav.$();e.unbind("webkitTransitionEnd transitionend",this._afterHideMasterAnimation)}}var a=this._getRealPage(this._oDetailNav.getCurrentPage());this._setMasterButton(a);this._bMasterClosing=false;this._bMasterisOpen=false;if(t.sap.containsOrEquals(this._oMasterNav.getDomRef(),document.activeElement)){document.activeElement.blur()}this.fireAfterMasterClose()};d.prototype.getCurrentMasterPage=function(){return this._oMasterNav.getCurrentPage()};d.prototype.getCurrentDetailPage=function(){return this._oDetailNav.getCurrentPage()};d.prototype.getCurrentPage=function(t){if(t){return this.getCurrentMasterPage()}else{return this.getCurrentDetailPage()}};d.prototype.getPreviousPage=function(t){if(t){return this._oMasterNav.getPreviousPage()}else{return this._oDetailNav.getPreviousPage()}};d.prototype.getMasterPage=function(t){return this._oMasterNav.getPage(t)};d.prototype.getDetailPage=function(t){return this._oDetailNav.getPage(t)};d.prototype.getPage=function(t,e){if(e){return this.getMasterPage(t)}else{return this.getDetailPage(t)}};d.prototype.isMasterShown=function(){if(r.system.phone){var t=this._oMasterNav.getCurrentPage();return this._indexOfMasterPage(t)!==-1}else{var e=this.getMode();switch(e){case f.StretchCompressMode:return true;case f.HideMode:return this._bMasterisOpen;case f.PopoverMode:case f.ShowHideMode:return r.orientation.landscape||this._bMasterisOpen;default:return false}}};d.prototype.setInitialMaster=function(t){this._oMasterNav.setInitialPage(t);this.setAssociation("initialMaster",t,true);return this};d.prototype.setInitialDetail=function(t){if(!r.system.phone){this._oDetailNav.setInitialPage(t)}this.setAssociation("initialDetail",t,true);return this};d.prototype.setDefaultTransitionNameDetail=function(t){this.setProperty("defaultTransitionNameDetail",t,true);this._oDetailNav.setDefaultTransitionName(t);return this};d.prototype.setDefaultTransitionNameMaster=function(t){this.setProperty("defaultTransitionNameMaster",t,true);this._oMasterNav.setDefaultTransitionName(t);return this};d.prototype.setMasterButtonText=function(t){if(!r.system.phone){if(!t){t=this._rb.getText("SplitContainer_NAVBUTTON_TEXT")}this._oShowMasterBtn.setText(t)}this.setProperty("masterButtonText",t,true);return this};d.prototype.setMode=function(t){var e=this.getMode();if(e===t){return this}this.setProperty("mode",t,true);if(!r.system.phone&&this.getDomRef()){if(e==="HideMode"&&this._oldIsLandscape){this._removeMasterButton(this._oDetailNav.getCurrentPage());if(this._isMie9){this._oMasterNav.$().css({left:0,width:""})}}if(t!=="PopoverMode"&&this._oPopOver.getContent().length>0){this._updateMasterPosition("landscape")}else if(t=="PopoverMode"){if(!this._oldIsLandscape){if(this._oPopOver.getContent().length===0){this._updateMasterPosition("popover")}this._setMasterButton(this._oDetailNav.getCurrentPage())}this.toggleStyleClass("sapMSplitContainerShowHide",false);this.toggleStyleClass("sapMSplitContainerStretchCompress",false);this.toggleStyleClass("sapMSplitContainerHideMode",false);this.toggleStyleClass("sapMSplitContainerPopover",true)}if(t=="StretchCompressMode"){this.toggleStyleClass("sapMSplitContainerShowHide",false);this.toggleStyleClass("sapMSplitContainerPopover",false);this.toggleStyleClass("sapMSplitContainerHideMode",false);this.toggleStyleClass("sapMSplitContainerStretchCompress",true);this._removeMasterButton(this._oDetailNav.getCurrentPage())}if(t=="ShowHideMode"){this.toggleStyleClass("sapMSplitContainerPopover",false);this.toggleStyleClass("sapMSplitContainerStretchCompress",false);this.toggleStyleClass("sapMSplitContainerHideMode",false);this.toggleStyleClass("sapMSplitContainerShowHide",true);if(!r.orientation.landscape){this._setMasterButton(this._oDetailNav.getCurrentPage())}}if(t==="HideMode"){this.toggleStyleClass("sapMSplitContainerPopover",false);this.toggleStyleClass("sapMSplitContainerStretchCompress",false);this.toggleStyleClass("sapMSplitContainerShowHide",false);this.toggleStyleClass("sapMSplitContainerHideMode",true);this._oMasterNav.toggleStyleClass("sapMSplitContainerMasterVisible",false);this._oMasterNav.toggleStyleClass("sapMSplitContainerMasterHidden",true);this._bMasterisOpen=false;this._setMasterButton(this._oDetailNav.getCurrentPage());if(this._isMie9){this._oMasterNav.$().css({left:"",width:"auto"})}}}return this};d.prototype.setBackgroundOpacity=function(e){if(e>1||e<0){t.sap.log.warning("Invalid value "+e+" for SplitContainer.setBackgroundOpacity() ignored. Valid values are: floats between 0 and 1.");return this}this.$("BG").css("opacity",e);return this.setProperty("backgroundOpacity",e,true)};d.prototype._indexOfMasterPage=function(e){return t.inArray(e,this._aMasterPages)};d.prototype._indexOfDetailPage=function(e){return t.inArray(e,this._aDetailPages)};d.prototype._insertPage=function(e,a,i,s,o){this.insertAggregation(a,i,s,o);var r;if(s<0){r=0}else if(s>e.length){r=e.length}else{r=s}var n=t.inArray(i,e);e.splice(r,0,i);if(n!=-1){this._removePageFromArray(e,i)}return this};d.prototype._removePage=function(t,e,a,i){var s=this.removeAggregation(e,a,i);if(s){this._removePageFromArray(t,s)}return s};d.prototype._removePageFromArray=function(e,a){var i=t.inArray(a,e);if(i!=-1){e.splice(i,1);if(e===this._aDetailPages){this._restoreMethodsInPage(a)}}};d.prototype._handleNavigationEvent=function(t,e,a){var i=(e?"After":"")+(a?"Master":"Detail")+"Navigate",s;i=i.charAt(0).toLowerCase()+i.slice(1);s=this.fireEvent(i,t.mParameters,true);if(!s){t.preventDefault()}};d.prototype._handleResize=function(){var t=r.orientation.landscape,e=this._oDetailNav.getCurrentPage(),a=this.getMode();if(this._oldIsLandscape!==t){this._oldIsLandscape=t;if(!r.system.phone){this.toggleStyleClass("sapMSplitContainerPortrait",!t);if(a==="HideMode"){return}if(a==="ShowHideMode"){if(t){this.fireBeforeMasterOpen()}else{this.fireBeforeMasterClose()}}if(this._isMie9){if(t){this._oMasterNav.$().css({left:0,width:""})}else{if(a==="ShowHideMode"||a==="PopoverMode"){this._oMasterNav.$().css({left:-320,width:"auto"})}}}if(a==="ShowHideMode"||a==="PopoverMode"){this._oMasterNav.toggleStyleClass("sapMSplitContainerMasterVisible",t);this._oMasterNav.toggleStyleClass("sapMSplitContainerMasterHidden",!t)}if(a==="ShowHideMode"){if(t){this._bMasterisOpen=true;this.fireAfterMasterOpen()}else{this._bMasterisOpen=false;this.fireAfterMasterClose()}}if(a=="PopoverMode"){if(this._oPopOver.isOpen()){this._oPopOver.attachAfterClose(this._handlePopClose,this);this._oPopOver.close()}else{this._handlePopClose()}}e=this._getRealPage(e);if(!this._oldIsLandscape&&a!="StretchCompressMode"){this._setMasterButton(e)}else{this._removeMasterButton(e)}}if(this._onOrientationChange){this._onOrientationChange()}}};d.prototype._handlePopClose=function(t){this._oPopOver.detachAfterClose(this._handlePopClose,this);if(this._oldIsLandscape){this._updateMasterPosition("landscape")}else{this._updateMasterPosition("popover")}};d.prototype._getRealPage=function(t){var e=t,a;while(e){if(e instanceof sap.m.Page){return e}if(e instanceof sap.m.MessagePage){return e}if(e instanceof s){return e}if(e instanceof sap.ui.core.mvc.View){a=e.getContent();if(a.length===1){e=a[0];continue}}else if(e instanceof p){e=e.getCurrentPage();continue}e=null}return e};d.prototype._updateMasterPosition=function(t){var e=this;if(t=="popover"){this.removeAggregation("_navMaster",this._oMasterNav,true);this._oMasterNav.$().remove();this._oPopOver.addContent(this._oMasterNav);this._bMasterisOpen=false}if(t=="landscape"){var a=function(){e._oPopOver.removeAggregation("content",e._oMasterNav,false);e.setAggregation("_navMaster",e._oMasterNav,true);var t=e.$();if(t[0]){var a=sap.ui.getCore().createRenderManager();a.renderControl(e._oMasterNav.addStyleClass("sapMSplitContainerMaster"));a.flush(t[0],false,e.$("BG")[0]?1:0);a.destroy()}};if(this._oPopOver.isOpen()){var i=function(){this._oPopOver.detachAfterClose(i,this);this._bMasterisOpen=false;a()};this._oPopOver.attachAfterClose(i,this);this._oPopOver.close()}else{a()}}};d.prototype._portraitHide=function(){if(!this._oldIsLandscape&&!r.system.phone&&this.getMode()==="ShowHideMode"){return true}else{return false}};d.prototype._portraitPopover=function(){if(!this._oldIsLandscape&&!r.system.phone&&this.getMode()==="PopoverMode"){return true}else{return false}};d.prototype._hideMode=function(){return this.getMode()==="HideMode"&&!r.system.phone};d.prototype._needShowMasterButton=function(){return(this._portraitHide()||this._hideMode()||this._portraitPopover())&&(!this._bMasterisOpen||this._bMasterClosing)};d.prototype._updateMasterButtonTooltip=function(){if(!this._oShowMasterBtn){return}var t=this.getMasterButtonTooltip();if(t){this._oShowMasterBtn.setTooltip(t);return}var e=this._oMasterNav.getCurrentPage();if(e&&e.getTitle){var a=e.getTitle();if(a){a=a.replace(/[_0-9]+$/,"");t=this._rb.getText("SPLITCONTAINER_NAVBUTTON_TOOLTIP",a)}}if(!t){t=this._rb.getText("SPLITCONTAINER_NAVBUTTON_DEFAULT_TOOLTIP")}this._oShowMasterBtn.setTooltip(t)};d.prototype._createShowMasterButton=function(){if(this._oShowMasterBtn&&!this._oShowMasterBtn.bIsDestroyed){return}this._oShowMasterBtn=new sap.m.Button(this.getId()+"-MasterBtn",{icon:i.getIconURI("menu2"),tooltip:this.getMasterButtonTooltip(),type:g.Default,press:t.proxy(this._onMasterButtonTap,this)}).addStyleClass("sapMSplitContainerMasterBtn")};d.prototype._setMasterButton=function(t,e,a){if(!t){return}if(typeof e==="boolean"){a=e;e=undefined}t=this._getRealPage(t);if(!t){return}var i=d._getHeaderButtonAggregation(t),s=i.sAggregationName,o=i.aAggregationContent;for(var r=0;r<o.length;r++){if(o[r]instanceof sap.m.Button&&o[r].getVisible()&&(o[r].getType()==g.Back||o[r].getType()==g.Up&&o[r]!==this._oShowMasterBtn)){this._bDetailNavButton=true;return}}this._bDetailNavButton=false;var n=t._getAnyHeader();var p=false;for(var r=0;r<o.length;r++){if(o[r]===this._oShowMasterBtn){p=true}}if(!p){this._createShowMasterButton();this._oShowMasterBtn.removeStyleClass("sapMSplitContainerMasterBtnHidden");if(n){n.insertAggregation(s,this._oShowMasterBtn,0,a)}}else{if(this._isMie9){this._oShowMasterBtn.$().fadeIn()}this._oShowMasterBtn.$().parent().toggleClass("sapMSplitContainerMasterBtnHide",false);this._oShowMasterBtn.removeStyleClass("sapMSplitContainerMasterBtnHidden");this._oShowMasterBtn.$().parent().toggleClass("sapMSplitContainerMasterBtnShow",true)}if(e){e(t)}this.fireMasterButton({show:true})};d._getHeaderButtonAggregation=function(t){var e=t._getAnyHeader(),a,i;if(!e){return}if(e.getContentLeft){a=e.getContentLeft();i="contentLeft"}if(e.getContent){a=e.getContent();i="content"}return{aAggregationContent:a,sAggregationName:i}};d.prototype._removeMasterButton=function(e,a,i){if(!e){return}var s=this,o=this._oShowMasterBtn.$().is(":hidden"),r;if(typeof a==="boolean"){i=a;a=undefined}if(!o&&!i){e=this._getRealPage(e);if(!e){return}r=e._getAnyHeader();if(r){var n=d._getHeaderButtonAggregation(e).aAggregationContent;for(var p=0;p<n.length;p++){if(n[p]===this._oShowMasterBtn){if(this._isMie9){this._oShowMasterBtn.$().fadeOut();if(a){a(e)}}this._oShowMasterBtn.destroy();this._oShowMasterBtn.$().parent().bind("webkitAnimationEnd animationend",function(){t(this).unbind("webkitAnimationEnd animationend");s._oShowMasterBtn.addStyleClass("sapMSplitContainerMasterBtnHidden");if(a){a(e)}});return}}}this.fireMasterButton({show:false})}else{this._oShowMasterBtn.addStyleClass("sapMSplitContainerMasterBtnHidden");if(a){a(e)}if(!o){this.fireMasterButton({show:false})}}};d.prototype._callMethodInManagedObject=function(t,e){var a=Array.prototype.slice.call(arguments);if(e==="masterPages"){if(t==="indexOfAggregation"){return this._indexOfMasterPage.apply(this,a.slice(2))}else{return this._callNavContainerMethod(t,this._oMasterNav,a)}}else if(e==="detailPages"){if(t==="indexOfAggregation"){return this._indexOfDetailPage.apply(this,a.slice(2))}else{return this._callNavContainerMethod(t,this._oDetailNav,a)}}else{return n.prototype[t].apply(this,a.slice(1))}};d.prototype._callNavContainerMethod=function(t,e,a){a[1]="pages";a=a.slice(1);var i=d._mFunctionMapping[t];if(i){a.shift();t=i}return e[t].apply(e,a)};d.prototype._hasPageInArray=function(t,e){return t.some(function(t){return e&&e===t})};d.prototype.validateAggregation=function(t,e,a){return this._callMethodInManagedObject("validateAggregation",t,e,a)};d.prototype.setAggregation=function(t,e,a){this._callMethodInManagedObject("setAggregation",t,e,a);return this};d.prototype.getAggregation=function(t,e){return this._callMethodInManagedObject("getAggregation",t,e)};d.prototype.indexOfAggregation=function(t,e){return this._callMethodInManagedObject("indexOfAggregation",t,e)};d.prototype.insertAggregation=function(t,e,a,i){this._callMethodInManagedObject("insertAggregation",t,e,a,i);return this};d.prototype.addAggregation=function(t,e,a){this._callMethodInManagedObject("addAggregation",t,e,a);return this};d.prototype.removeAggregation=function(t,e,a){return this._callMethodInManagedObject("removeAggregation",t,e,a)};d.prototype.removeAllAggregation=function(t,e){return this._callMethodInManagedObject("removeAllAggregation",t,e)};d.prototype.destroyAggregation=function(t,e){this._callMethodInManagedObject("destroyAggregation",t,e);return this};d._mFunctionMapping={getAggregation:"getPage",addAggregation:"addPage",insertAggregation:"insertPage",removeAggregation:"removePage",removeAllAggregation:"removeAllPages"};return d});