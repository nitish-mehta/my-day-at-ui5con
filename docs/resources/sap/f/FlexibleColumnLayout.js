/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","./library","sap/ui/Device","sap/ui/core/ResizeHandler","sap/ui/core/Control","sap/m/library","sap/m/Button","sap/m/NavContainer","sap/ui/core/Configuration","./FlexibleColumnLayoutRenderer","jquery.sap.events"],function(e,t,n,i,o,a,r,s,u,l){"use strict";var d=t.LayoutType;var g=o.extend("sap.f.FlexibleColumnLayout",{metadata:{properties:{layout:{type:"sap.f.LayoutType",defaultValue:d.OneColumn},defaultTransitionNameBeginColumn:{type:"string",group:"Appearance",defaultValue:"slide"},defaultTransitionNameMidColumn:{type:"string",group:"Appearance",defaultValue:"slide"},defaultTransitionNameEndColumn:{type:"string",group:"Appearance",defaultValue:"slide"},backgroundDesign:{type:"sap.m.BackgroundDesign",group:"Appearance",defaultValue:a.BackgroundDesign.Transparent}},aggregations:{beginColumnPages:{type:"sap.ui.core.Control",multiple:true,forwarding:{getter:"_getBeginColumn",aggregation:"pages"}},midColumnPages:{type:"sap.ui.core.Control",multiple:true,forwarding:{getter:"_getMidColumn",aggregation:"pages"}},endColumnPages:{type:"sap.ui.core.Control",multiple:true,forwarding:{getter:"_getEndColumn",aggregation:"pages"}},_beginColumnNav:{type:"sap.m.NavContainer",multiple:false,visibility:"hidden"},_midColumnNav:{type:"sap.m.NavContainer",multiple:false,visibility:"hidden"},_endColumnNav:{type:"sap.m.NavContainer",multiple:false,visibility:"hidden"},_beginColumnBackArrow:{type:"sap.m.Button",multiple:false,visibility:"hidden"},_midColumnForwardArrow:{type:"sap.m.Button",multiple:false,visibility:"hidden"},_midColumnBackArrow:{type:"sap.m.Button",multiple:false,visibility:"hidden"},_endColumnForwardArrow:{type:"sap.m.Button",multiple:false,visibility:"hidden"}},associations:{initialBeginColumnPage:{type:"sap.ui.core.Control",multiple:false},initialMidColumnPage:{type:"sap.ui.core.Control",multiple:false},initialEndColumnPage:{type:"sap.ui.core.Control",multiple:false}},events:{stateChange:{parameters:{layout:{type:"sap.f.LayoutType"},maxColumnsCount:{type:"int"},isNavigationArrow:{type:"boolean"},isResize:{type:"boolean"}}},beginColumnNavigate:{allowPreventDefault:true,parameters:{from:{type:"sap.ui.core.Control"},fromId:{type:"string"},to:{type:"sap.ui.core.Control"},toId:{type:"string"},firstTime:{type:"boolean"},isTo:{type:"boolean"},isBack:{type:"boolean"},isBackToTop:{type:"boolean"},isBackToPage:{type:"boolean"},direction:{type:"string"}}},afterBeginColumnNavigate:{parameters:{from:{type:"sap.ui.core.Control"},fromId:{type:"string"},to:{type:"sap.ui.core.Control"},toId:{type:"string"},firstTime:{type:"boolean"},isTo:{type:"boolean"},isBack:{type:"boolean"},isBackToTop:{type:"boolean"},isBackToPage:{type:"boolean"},direction:{type:"string"}}},midColumnNavigate:{allowPreventDefault:true,parameters:{from:{type:"sap.ui.core.Control"},fromId:{type:"string"},to:{type:"sap.ui.core.Control"},toId:{type:"string"},firstTime:{type:"boolean"},isTo:{type:"boolean"},isBack:{type:"boolean"},isBackToTop:{type:"boolean"},isBackToPage:{type:"boolean"},direction:{type:"string"}}},afterMidColumnNavigate:{parameters:{from:{type:"sap.ui.core.Control"},fromId:{type:"string"},to:{type:"sap.ui.core.Control"},toId:{type:"string"},firstTime:{type:"boolean"},isTo:{type:"boolean"},isBack:{type:"boolean"},isBackToTop:{type:"boolean"},isBackToPage:{type:"boolean"},direction:{type:"string"}}},endColumnNavigate:{allowPreventDefault:true,parameters:{from:{type:"sap.ui.core.Control"},fromId:{type:"string"},to:{type:"sap.ui.core.Control"},toId:{type:"string"},firstTime:{type:"boolean"},isTo:{type:"boolean"},isBack:{type:"boolean"},isBackToTop:{type:"boolean"},isBackToPage:{type:"boolean"},direction:{type:"string"}}},afterEndColumnNavigate:{parameters:{from:{type:"sap.ui.core.Control"},fromId:{type:"string"},to:{type:"sap.ui.core.Control"},toId:{type:"string"},firstTime:{type:"boolean"},isTo:{type:"boolean"},isBack:{type:"boolean"},isBackToTop:{type:"boolean"},isBackToPage:{type:"boolean"},direction:{type:"string"}}}}}});g.COLUMN_RESIZING_ANIMATION_DURATION=560;g.prototype.init=function(){this._initNavContainers();this._initButtons();this._oLayoutHistory=new p};g.prototype._createNavContainer=function(e){var t=e.charAt(0).toUpperCase()+e.slice(1);return new s(this.getId()+"-"+e+"ColumnNav",{navigate:function(t){this._handleNavigationEvent(t,false,e)}.bind(this),afterNavigate:function(t){this._handleNavigationEvent(t,true,e)}.bind(this),defaultTransitionName:this["getDefaultTransitionName"+t+"Column"]()})};g.prototype._handleNavigationEvent=function(e,t,n){var i,o;if(t){i="after"+(n.charAt(0).toUpperCase()+n.slice(1))+"ColumnNavigate"}else{i=n+"ColumnNavigate"}o=this.fireEvent(i,e.mParameters,true);if(!o){e.preventDefault()}};g.prototype._getBeginColumn=function(){return this.getAggregation("_beginColumnNav")};g.prototype._getMidColumn=function(){return this.getAggregation("_midColumnNav")};g.prototype._getEndColumn=function(){return this.getAggregation("_endColumnNav")};g.prototype._flushColumnContent=function(e){var t=this.getAggregation("_"+e+"ColumnNav"),n=sap.ui.getCore().createRenderManager();n.renderControl(t);n.flush(this._$columns[e].find(".sapFFCLColumnContent")[0],undefined,true);n.destroy()};g.prototype.setLayout=function(e){e=this.validateProperty("layout",e);var t=this.getLayout();if(t===e){return this}var n=this.setProperty("layout",e,true);this._oLayoutHistory.addEntry(e);this._resizeColumns();this._hideShowArrows();return n};g.prototype.setBackgroundDesign=function(e){e=this.validateProperty("backgroundDesign",e);var t=this.getBackgroundDesign();if(t===e){return this}var n=this.setProperty("backgroundDesign",e,true);if(t!==a.BackgroundDesign.Transparent){this.$().removeClass("sapFFCLBackgroundDesign"+t)}if(e!==a.BackgroundDesign.Transparent){this.$().addClass("sapFFCLBackgroundDesign"+e)}return n};g.prototype.onBeforeRendering=function(){this._deregisterResizeHandler()};g.prototype.onAfterRendering=function(){this._registerResizeHandler();this._cacheDOMElements();this._hideShowArrows();this._resizeColumns();this._flushColumnContent("begin");this._flushColumnContent("mid");this._flushColumnContent("end");this._fireStateChange(false,false)};g.prototype._getControlWidth=function(){return this.$().width()};g.prototype.exit=function(){this._deregisterResizeHandler();this._handleEvent(e.Event("Destroy"))};g.prototype._registerResizeHandler=function(){e.sap.assert(!this._iResizeHandlerId,"Resize handler already registered");this._iResizeHandlerId=i.register(this,this._onResize.bind(this))};g.prototype._deregisterResizeHandler=function(){if(this._iResizeHandlerId){i.deregister(this._iResizeHandlerId);this._iResizeHandlerId=null}};g.prototype._initNavContainers=function(){this.setAggregation("_beginColumnNav",this._createNavContainer("begin"),true);this.setAggregation("_midColumnNav",this._createNavContainer("mid"),true);this.setAggregation("_endColumnNav",this._createNavContainer("end"),true)};g.prototype._initButtons=function(){var e=new r(this.getId()+"-beginBack",{icon:"sap-icon://slim-arrow-left",tooltip:g._getResourceBundle().getText("FCL_BEGIN_COLUMN_BACK_ARROW"),press:this._onArrowClick.bind(this,"left")}).addStyleClass("sapFFCLNavigationButton").addStyleClass("sapFFCLNavigationButtonRight");this.setAggregation("_beginColumnBackArrow",e,true);var t=new r(this.getId()+"-midForward",{icon:"sap-icon://slim-arrow-right",tooltip:g._getResourceBundle().getText("FCL_MID_COLUMN_FORWARD_ARROW"),press:this._onArrowClick.bind(this,"right")}).addStyleClass("sapFFCLNavigationButton").addStyleClass("sapFFCLNavigationButtonLeft");this.setAggregation("_midColumnForwardArrow",t,true);var n=new r(this.getId()+"-midBack",{icon:"sap-icon://slim-arrow-left",tooltip:g._getResourceBundle().getText("FCL_MID_COLUMN_BACK_ARROW"),press:this._onArrowClick.bind(this,"left")}).addStyleClass("sapFFCLNavigationButton").addStyleClass("sapFFCLNavigationButtonRight");this.setAggregation("_midColumnBackArrow",n,true);var i=new r(this.getId()+"-endForward",{icon:"sap-icon://slim-arrow-right",tooltip:g._getResourceBundle().getText("FCL_END_COLUMN_FORWARD_ARROW"),press:this._onArrowClick.bind(this,"right")}).addStyleClass("sapFFCLNavigationButton").addStyleClass("sapFFCLNavigationButtonLeft");this.setAggregation("_endColumnForwardArrow",i,true)};g.prototype._cacheDOMElements=function(){this._cacheColumns();if(!n.system.phone){this._cacheArrows()}};g.prototype._cacheColumns=function(){this._$columns={begin:this.$("beginColumn"),mid:this.$("midColumn"),end:this.$("endColumn")}};g.prototype._cacheArrows=function(){this._$columnButtons={beginBack:this.$("beginBack"),midForward:this.$("midForward"),midBack:this.$("midBack"),endForward:this.$("endForward")}};g.prototype._getVisibleColumnsCount=function(){return["begin","mid","end"].filter(function(e){return this._getColumnSize(e)>0},this).length};g.prototype._resizeColumns=function(){var e,t,o,a,r,s=false,l=["begin","mid","end"],d=sap.ui.getCore().getConfiguration().getRTL(),p,m;if(!this.isActive()){return}m=this._getVisibleColumnsCount();if(m===0){return}a=(m-1)*g.COLUMN_MARGIN;r=this._getControlWidth()-a;l.forEach(function(a){e=this._getColumnSize(a);this._$columns[a].toggleClass("sapFFCLColumnMargin",s&&e>0);this._$columns[a].toggleClass("sapFFCLColumnActive",e>0);this._$columns[a].removeClass("sapFFCLColumnOnlyActive");this._$columns[a].removeClass("sapFFCLColumnLastActive");this._$columns[a].removeClass("sapFFCLColumnFirstActive");t=Math.round(r*(e/100));if([100,0].indexOf(e)!==-1){o=e+"%"}else{o=t+"px"}if(sap.ui.getCore().getConfiguration().getAnimationMode()!==u.AnimationMode.none){var l=this._$columns[a].get(0);i.suspend(l);if(this._iResumeResizeHandlerTimeout){clearTimeout(this._iResumeResizeHandlerTimeout)}this._iResumeResizeHandlerTimeout=setTimeout(function(){i.resume(l);this._iResumeResizeHandlerTimeout=null}.bind(this),g.COLUMN_RESIZING_ANIMATION_DURATION)}this._$columns[a].width(o);if(!n.system.phone){this._updateColumnContextualSettings(a,t);this._updateColumnCSSClasses(a,t)}if(e>0){s=true}},this);p=l.filter(function(e){return this._getColumnSize(e)>0},this);if(d){l.reverse()}if(p.length===1){this._$columns[p[0]].addClass("sapFFCLColumnOnlyActive")}if(p.length>1){this._$columns[p[0]].addClass("sapFFCLColumnFirstActive");this._$columns[p[p.length-1]].addClass("sapFFCLColumnLastActive")}};g.prototype._propagateContextualSettings=function(){};g.prototype._updateColumnContextualSettings=function(e,t){var n,i;n=this.getAggregation("_"+e+"ColumnNav");if(!n){return}i=n._getContextualSettings();if(!i||i.contextualWidth!==t){n._applyContextualSettings({contextualWidth:t})}};g.prototype._updateColumnCSSClasses=function(e,t){var i="";this._$columns[e].removeClass("sapUiContainer-Narrow sapUiContainer-Medium sapUiContainer-Wide sapUiContainer-ExtraWide");if(t<n.media._predefinedRangeSets[n.media.RANGESETS.SAP_STANDARD_EXTENDED].points[0]){i="Narrow"}else if(t<n.media._predefinedRangeSets[n.media.RANGESETS.SAP_STANDARD_EXTENDED].points[1]){i="Medium"}else if(t<n.media._predefinedRangeSets[n.media.RANGESETS.SAP_STANDARD_EXTENDED].points[2]){i="Wide"}else{i="ExtraWide"}this._$columns[e].addClass("sapUiContainer-"+i)};g.prototype._getColumnSize=function(e){var t=this.getLayout(),n=this._getColumnWidthDistributionForLayout(t),i=n.split("/"),o={begin:0,mid:1,end:2},a=i[o[e]];return parseInt(a,10)};g.prototype.getMaxColumnsCount=function(){return this._getMaxColumnsCountForWidth(this._getControlWidth())};g.prototype._getMaxColumnsCountForWidth=function(e){if(e>=g.DESKTOP_BREAKPOINT){return 3}if(e>=g.TABLET_BREAKPOINT&&e<g.DESKTOP_BREAKPOINT){return 2}if(e>0){return 1}return 0};g.prototype._onResize=function(e){var t=e.oldSize.width,n=e.size.width,i,o;if(n===0){return}i=this._getMaxColumnsCountForWidth(t);o=this._getMaxColumnsCountForWidth(n);this._resizeColumns();if(o!==i){this._hideShowArrows();this._fireStateChange(false,true)}};g.prototype._onArrowClick=function(t){var n=this.getLayout(),i=typeof g.SHIFT_TARGETS[n]!=="undefined"&&typeof g.SHIFT_TARGETS[n][t]!=="undefined",o;e.sap.assert(i,"An invalid layout was used for determining arrow behavior");o=i?g.SHIFT_TARGETS[n][t]:d.OneColumn;this.setLayout(o);if(g.ARROWS_NAMES[o][t]!==g.ARROWS_NAMES[n][t]&&i){var a=t==="right"?"left":"right";this._$columnButtons[g.ARROWS_NAMES[o][a]].focus()}this._fireStateChange(true,false)};g.prototype._hideShowArrows=function(){var e=this.getLayout(),t={},i=[],o;if(!this.isActive()||n.system.phone){return}o=this.getMaxColumnsCount();if(o>1){t[d.TwoColumnsBeginExpanded]=["beginBack"];t[d.TwoColumnsMidExpanded]=["midForward"];t[d.ThreeColumnsMidExpanded]=["midForward","midBack"];t[d.ThreeColumnsEndExpanded]=["endForward"];t[d.ThreeColumnsMidExpandedEndHidden]=["midForward","midBack"];t[d.ThreeColumnsBeginExpandedEndHidden]=["beginBack"];if(typeof t[e]==="object"){i=t[e]}}this._toggleButton("beginBack",i.indexOf("beginBack")!==-1);this._toggleButton("midForward",i.indexOf("midForward")!==-1);this._toggleButton("midBack",i.indexOf("midBack")!==-1);this._toggleButton("endForward",i.indexOf("endForward")!==-1)};g.prototype._toggleButton=function(e,t){this._$columnButtons[e].toggle(t)};g.prototype._fireStateChange=function(e,t){if(this._getControlWidth()===0){return}this.fireStateChange({isNavigationArrow:e,isResize:t,layout:this.getLayout(),maxColumnsCount:this.getMaxColumnsCount()})};g.prototype.setInitialBeginColumnPage=function(e){this._getBeginColumn().setInitialPage(e);this.setAssociation("initialBeginColumnPage",e,true);return this};g.prototype.setInitialMidColumnPage=function(e){this._getMidColumn().setInitialPage(e);this.setAssociation("initialMidColumnPage",e,true);return this};g.prototype.setInitialEndColumnPage=function(e){this._getEndColumn().setInitialPage(e);this.setAssociation("initialEndColumnPage",e,true);return this};g.prototype.to=function(e,t,n,i){if(this._getBeginColumn().getPage(e)){this._getBeginColumn().to(e,t,n,i)}else if(this._getMidColumn().getPage(e)){this._getMidColumn().to(e,t,n,i)}else{this._getEndColumn().to(e,t,n,i)}return this};g.prototype.backToPage=function(e,t,n){if(this._getBeginColumn().getPage(e)){this._getBeginColumn().backToPage(e,t,n)}else if(this._getMidColumn().getPage(e)){this._getMidColumn().backToPage(e,t,n)}else{this._getEndColumn().backToPage(e,t,n)}return this};g.prototype._safeBackToPage=function(e,t,n,i){if(this._getBeginColumn().getPage(e)){this._getBeginColumn()._safeBackToPage(e,t,n,i)}else if(this._getMidColumn().getPage(e)){this._getMidColumn()._safeBackToPage(e,t,n,i)}else{this._getEndColumn()._safeBackToPage(e,t,n,i)}};g.prototype.toBeginColumnPage=function(e,t,n,i){this._getBeginColumn().to(e,t,n,i);return this};g.prototype.toMidColumnPage=function(e,t,n,i){this._getMidColumn().to(e,t,n,i);return this};g.prototype.toEndColumnPage=function(e,t,n,i){this._getEndColumn().to(e,t,n,i);return this};g.prototype.backBeginColumn=function(e,t){return this._getBeginColumn().back(e,t)};g.prototype.backMidColumn=function(e,t){return this._getMidColumn().back(e,t)};g.prototype.backEndColumn=function(e,t){return this._getEndColumn().back(e,t)};g.prototype.backBeginColumnToPage=function(e,t,n){return this._getBeginColumn().backToPage(e,t,n)};g.prototype.backMidColumnToPage=function(e,t,n){return this._getMidColumn().backToPage(e,t,n)};g.prototype.backEndColumnToPage=function(e,t,n){return this._getEndColumn().backToPage(e,t,n)};g.prototype.backToTopBeginColumn=function(e,t){this._getBeginColumn().backToTop(e,t);return this};g.prototype.backToTopMidColumn=function(e,t){this._getMidColumn().backToTop(e,t);return this};g.prototype.backToTopEndColumn=function(e,t){this._getEndColumn().backToTop(e,t);return this};g.prototype.getCurrentBeginColumnPage=function(){return this._getBeginColumn().getCurrentPage()};g.prototype.getCurrentMidColumnPage=function(){return this._getMidColumn().getCurrentPage()};g.prototype.getCurrentEndColumnPage=function(){return this._getEndColumn().getCurrentPage()};g.prototype.setDefaultTransitionNameBeginColumn=function(e){this.setProperty("defaultTransitionNameBeginColumn",e,true);this._getBeginColumn().setDefaultTransitionName(e);return this};g.prototype.setDefaultTransitionNameMidColumn=function(e){this.setProperty("defaultTransitionNameMidColumn",e,true);this._getMidColumn().setDefaultTransitionName(e);return this};g.prototype.setDefaultTransitionNameEndColumn=function(e){this.setProperty("defaultTransitionNameEndColumn",e,true);this._getEndColumn().setDefaultTransitionName(e);return this};g.prototype._getLayoutHistory=function(){return this._oLayoutHistory};g.prototype._getColumnWidthDistributionForLayout=function(e,t){var n=this.getMaxColumnsCount(),i={},o;if(n===0){o="0/0/0"}else{i[d.OneColumn]="100/0/0";i[d.MidColumnFullScreen]="0/100/0";i[d.EndColumnFullScreen]="0/0/100";if(n===1){i[d.TwoColumnsBeginExpanded]="0/100/0";i[d.TwoColumnsMidExpanded]="0/100/0";i[d.ThreeColumnsMidExpanded]="0/0/100";i[d.ThreeColumnsEndExpanded]="0/0/100";i[d.ThreeColumnsMidExpandedEndHidden]="0/0/100";i[d.ThreeColumnsBeginExpandedEndHidden]="0/0/100"}else{i[d.TwoColumnsBeginExpanded]="67/33/0";i[d.TwoColumnsMidExpanded]="33/67/0";i[d.ThreeColumnsMidExpanded]=n===2?"0/67/33":"25/50/25";i[d.ThreeColumnsEndExpanded]=n===2?"0/33/67":"25/25/50";i[d.ThreeColumnsMidExpandedEndHidden]="33/67/0";i[d.ThreeColumnsBeginExpandedEndHidden]="67/33/0"}o=i[e]}if(t){o=o.split("/").map(function(e){return parseInt(e,10)})}return o};g.COLUMN_MARGIN=8;g.DESKTOP_BREAKPOINT=1280;g.TABLET_BREAKPOINT=960;g.ARROWS_NAMES={TwoColumnsBeginExpanded:{left:"beginBack"},TwoColumnsMidExpanded:{right:"midForward"},ThreeColumnsMidExpanded:{left:"midBack",right:"midForward"},ThreeColumnsEndExpanded:{right:"endForward"},ThreeColumnsMidExpandedEndHidden:{left:"midBack",right:"midForward"},ThreeColumnsBeginExpandedEndHidden:{left:"beginBack"}};g._getResourceBundle=function(){return sap.ui.getCore().getLibraryResourceBundle("sap.f")};g.SHIFT_TARGETS={TwoColumnsBeginExpanded:{left:d.TwoColumnsMidExpanded},TwoColumnsMidExpanded:{right:d.TwoColumnsBeginExpanded},ThreeColumnsMidExpanded:{left:d.ThreeColumnsEndExpanded,right:d.ThreeColumnsMidExpandedEndHidden},ThreeColumnsEndExpanded:{right:d.ThreeColumnsMidExpanded},ThreeColumnsMidExpandedEndHidden:{left:d.ThreeColumnsMidExpanded,right:d.ThreeColumnsBeginExpandedEndHidden},ThreeColumnsBeginExpandedEndHidden:{left:d.ThreeColumnsMidExpandedEndHidden}};function p(){this._aLayoutHistory=[]}p.prototype.addEntry=function(e){if(typeof e!=="undefined"){this._aLayoutHistory.push(e)}};p.prototype.getClosestEntryThatMatches=function(e){var t;for(t=this._aLayoutHistory.length-1;t>=0;t--){if(e.indexOf(this._aLayoutHistory[t])!==-1){return this._aLayoutHistory[t]}}};return g});