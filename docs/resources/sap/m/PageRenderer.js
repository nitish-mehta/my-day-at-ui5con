/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([],function(){"use strict";var e={};e.render=function(e,t){var a=null,r=null,s=t.getShowFooter(),i=null,o=this._isLightHeader(t),n=t.getLandmarkInfo();if(t.getShowHeader()){a=t._getAnyHeader()}if(t.getShowSubHeader()){i=t.getSubHeader()}r=t.getFooter();e.write("<div");e.writeControlData(t);e.addClass("sapMPage");e.addClass("sapMPageBg"+t.getBackgroundDesign());if(a){e.addClass("sapMPageWithHeader")}if(i){e.addClass("sapMPageWithSubHeader")}if(r&&s){e.addClass("sapMPageWithFooter")}if(!t.getContentOnlyBusy()){e.addClass("sapMPageBusyCoversAll")}if(t.getFloatingFooter()){e.addClass("sapMPageFloatingFooter")}e.writeClasses();var d=t.getTooltip_AsString();if(d){e.writeAttributeEscaped("title",d)}e.writeAccessibilityState(t,t._formatLandmarkInfo(n,"Root"));e.write(">");if(a){var l=t._getHeaderTag(n);e.write("<"+l);e.addClass("sapMPageHeader");e.writeAccessibilityState(t,t._formatLandmarkInfo(n,"Header"));e.writeClasses();e.write(">");this.renderBarControl(e,t,a,{context:"header",styleClass:o?"":"sapContrastPlus"});e.write("</"+l+">")}if(i){var g=t._getSubHeaderTag(n);e.write("<"+g);e.addClass("sapMPageSubHeader");e.writeAccessibilityState(t,t._formatLandmarkInfo(n,"SubHeader"));e.writeClasses();e.write(">");this.renderBarControl(e,t,i,{context:"subHeader",styleClass:o?"":"sapContrastPlus"});e.write("</"+g+">")}e.write('<section id="'+t.getId()+'-cont"');e.writeAccessibilityState(t,t._formatLandmarkInfo(n,"Content"));if(t.getEnableScrolling()){e.addClass("sapMPageEnableScrolling");e.writeClasses()}e.write(">");var C=t.getContent();var f=C.length;for(var w=0;w<f;w++){e.renderControl(C[w])}e.write("</section>");if(r){var p=t._getFooterTag(n);e.write("<"+p);e.addClass("sapMPageFooter");if(!t.getShowFooter()){e.addClass("sapUiHidden")}e.writeAccessibilityState(t,t._formatLandmarkInfo(n,"Footer"));e.writeClasses();e.write(">");this.renderBarControl(e,t,r,{context:"footer"});e.write("</"+p+">")}e.write("</div>")};e.renderBarControl=function(e,t,a,r){if(!a){return}a._applyContextClassFor(r.context.toLowerCase());a.addStyleClass(r.styleClass||"");e.renderControl(a)};e._isLightHeader=function(e){var t=e,a=e.getParent(),r,s;while(a){r=a&&a.getMetadata().getName()||"";s=t.getMetadata().getName();if((r==="sap.m.Popover"||r==="sap.m.Dialog")&&s==="sap.m.NavContainer"){return true}if(a&&["sap.m.SplitApp","sap.m.SplitContainer"].indexOf(r)>-1&&s==="sap.m.NavContainer"&&/\-Master$/.test(t.getId())){return true}t=a;a=t.getParent()}return false};return e},true);