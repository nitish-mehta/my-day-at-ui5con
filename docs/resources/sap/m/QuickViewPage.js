/*
 * ! UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","./library","sap/ui/core/Control","sap/ui/core/IconPool","sap/ui/layout/form/SimpleForm","sap/ui/layout/VerticalLayout","sap/ui/layout/HorizontalLayout","./Page","./Button","./Bar","./Title","./Image","./Link","./Text","./Label","./HBox","sap/ui/core/Icon","sap/ui/core/Title","sap/ui/core/CustomData","sap/ui/core/library","sap/ui/layout/library","sap/ui/Device","sap/ui/layout/form/ResponsiveGridLayout","./QuickViewPageRenderer"],function(e,t,o,a,i,n,r,s,g,p,l,u,c,d,h,f,C,v,y,_,m,P,w,b){"use strict";var k=t.URLHelper;var V=m.form.SimpleFormLayout;var A=_.TitleLevel;var x=t.QuickViewGroupElementType;var N=t.ButtonType;var T=o.extend("sap.m.QuickViewPage",{metadata:{library:"sap.m",properties:{pageId:{type:"string",group:"Misc",defaultValue:""},header:{type:"string",group:"Misc",defaultValue:""},title:{type:"string",group:"Misc",defaultValue:""},titleUrl:{type:"string",group:"Misc",defaultValue:""},crossAppNavCallback:{type:"object",group:"Misc"},description:{type:"string",group:"Misc",defaultValue:""},icon:{type:"string",group:"Misc",defaultValue:""}},defaultAggregation:"groups",aggregations:{groups:{type:"sap.m.QuickViewGroup",multiple:true,singularName:"group",bindable:"bindable"}}}});T.prototype.init=function(){this._oResourceBundle=sap.ui.getCore().getLibraryResourceBundle("sap.m");var e=sap.ushell&&sap.ushell.Container&&sap.ushell.Container.getService;if(e){this.oCrossAppNavigator=e("CrossApplicationNavigation")}};T.prototype.onBeforeRendering=function(){this._destroyPageContent();this._createPageContent()};T.prototype.getPageContent=function(){return this._mPageContent};T.prototype.setNavContext=function(e){this._mNavContext=e};T.prototype.getNavContext=function(){return this._mNavContext};T.prototype.setPageTitleControl=function(e){this._oPageTitle=e};T.prototype.getPageTitleControl=function(){return this._oPageTitle};T.prototype._createPage=function(){var e=this._createPageContent();var t=this.getNavContext();var o;if(this._oPage){o=this._oPage;o.destroyContent();o.setCustomHeader(new p)}else{o=this._oPage=new s(t.quickViewId+"-"+this.getPageId(),{customHeader:new p});o.addEventDelegate({onAfterRendering:this.onAfterRenderingPage},this)}if(this.getHeader()===""&&t.quickView.getPages().length===1&&!P.system.phone){o.setShowHeader(false);o.addStyleClass("sapMQuickViewPageWithoutHeader")}if(e.header){o.addContent(e.header)}o.addContent(e.form);var i=o.getCustomHeader();i.addContentMiddle(new l({text:this.getHeader()}).addStyleClass("sapMQuickViewTitle"));if(t.hasBackButton){i.addContentLeft(new g({type:N.Back,tooltip:this._oResourceBundle.getText("PAGE_NAVBUTTON_TEXT"),press:function(){if(t.navContainer){t.quickView._setNavOrigin(null);t.navContainer.back()}}}))}if(t.popover&&P.system.phone){i.addContentRight(new g({icon:a.getIconURI("decline"),press:function(){t.popover.close()}}))}o.addStyleClass("sapMQuickViewPage");return o};T.prototype.onAfterRenderingPage=function(){if(this._bItemsChanged){var e=this.getNavContext();if(e){e.quickView._restoreFocus()}this._bItemsChanged=false}};T.prototype._createPageContent=function(){var e=this._createForm();var t=this._getPageHeaderContent();var o=this.getPageTitleControl();if(t&&o){e.addAriaLabelledBy(o)}this._mPageContent={form:e,header:t};return this._mPageContent};T.prototype._createForm=function(){var e=this.getAggregation("groups"),t=new i({maxContainerCols:1,editable:false,layout:V.ResponsiveGridLayout});if(e){for(var o=0;o<e.length;o++){if(e[o].getVisible()){this._renderGroup(e[o],t)}}}return t};T.prototype._getPageHeaderContent=function(){var e,t=new n,o=new r,a=this.getIcon(),i=this.getTitle(),s=this.getDescription(),g=this.getTitleUrl();if(!a&&!i&&!s){return null}if(a){if(this.getIcon().indexOf("sap-icon")==0){e=new C({src:a,decorative:!g,useIconTooltip:false,tooltip:i})}else{e=new u({src:a,decorative:false,tooltip:i}).addStyleClass("sapUiIcon")}e.addStyleClass("sapMQuickViewThumbnail");if(g){e.attachPress(this._crossApplicationNavigation(this))}o.addContent(e)}var p;if(g){p=new c({text:i,href:g,target:"_blank"})}else if(this.getCrossAppNavCallback()){p=new c({text:i});p.attachPress(this._crossApplicationNavigation(this))}else{p=new l({text:i,level:A.H1})}this.setPageTitleControl(p);var h=new d({text:s});t.addContent(p);t.addContent(h);o.addContent(t);return o};T.prototype._renderGroup=function(e,t){var o=e.getAggregation("elements");var i,n,r;if(e.getHeading()){t.addContent(new v({text:e.getHeading(),level:A.H2}))}if(!o){return}var s=this.getNavContext();for(var g=0;g<o.length;g++){i=o[g];if(!i.getVisible()){continue}r=new h({text:i.getLabel()});var p;if(s){p=s.quickViewId}n=i._getGroupElementValue(p);t.addContent(r);if(!n){t.addContent(new d({text:""}));continue}r.setLabelFor(n.getId());if(i.getType()==x.pageLink){n.attachPress(this._attachPressLink(this))}if(i.getType()==x.mobile&&!P.system.desktop){var l=new C({src:a.getIconURI("post"),tooltip:this._oResourceBundle.getText("QUICKVIEW_SEND_SMS"),decorative:false,customData:[new y({key:"phoneNumber",value:i.getValue()})],press:this._mobilePress});var u=new f({items:[n,l]});t.addContent(u)}else{t.addContent(n)}}};T.prototype._crossApplicationNavigation=function(e){return function(){if(e.getCrossAppNavCallback()&&e.oCrossAppNavigator){var t=e.getCrossAppNavCallback();if(typeof t=="function"){var o=t();var a=e.oCrossAppNavigator.hrefForExternal({target:{semanticObject:o.target.semanticObject,action:o.target.action},params:o.params});k.redirect(a)}}else if(e.getTitleUrl()){window.open(e.getTitleUrl(),"_blank")}}};T.prototype._destroyPageContent=function(){if(!this._mPageContent){return}if(this._mPageContent.form){this._mPageContent.form.destroy()}if(this._mPageContent.header){this._mPageContent.header.destroy()}this._mPageContent=null};T.prototype.exit=function(){this._oResourceBundle=null;if(this._oPage){this._oPage.destroy();this._oPage=null}else{this._destroyPageContent()}this._mNavContext=null};T.prototype._attachPressLink=function(e){var t=e.getNavContext();return function(e){e.preventDefault();var o=this.getCustomData()[0].getValue();if(t.navContainer&&o){t.quickView._setNavOrigin(this);t.navContainer.to(o)}}};T.prototype._mobilePress=function(){var t="sms://"+e.sap.encodeURL(this.getCustomData()[0].getValue());window.location.replace(t)};T.prototype._updatePage=function(){var e=this.getNavContext();if(e&&e.quickView._bRendered){this._bItemsChanged=true;e.popover.focus();if(e.quickView.indexOfPage(this)==0){e.quickView._clearContainerHeight()}this._createPage();e.popover.$().css("display","block");e.quickView._adjustContainerHeight();e.quickView._restoreFocus()}};["setModel","bindAggregation","setAggregation","insertAggregation","addAggregation","removeAggregation","removeAllAggregation","destroyAggregation"].forEach(function(e){T.prototype["_"+e+"Old"]=T.prototype[e];T.prototype[e]=function(){var t=T.prototype["_"+e+"Old"].apply(this,arguments);this._updatePage();if(["removeAggregation","removeAllAggregation"].indexOf(e)!==-1){return t}return this}});T.prototype.setProperty=function(){o.prototype.setProperty.apply(this,arguments);this._updatePage()};return T});