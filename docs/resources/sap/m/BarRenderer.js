/*!

 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","./BarInPageEnabler","sap/ui/Device"],function(e,t,a){"use strict";var r={};r.render=t.prototype.render;r.decorateRootElement=function(t,r){t.addClass("sapMBar");t.addClass(this.getContext(r));t.writeAccessibilityState(r,{role:r._getRootAccessibilityRole()});if(r.getTranslucent()&&(a.support.touch||e.sap.simulateMobileOnDesktop)){t.addClass("sapMBarTranslucent")}t.addClass("sapMBar-CTX")};r.shouldAddIBarContext=function(){return true};r.renderBarContent=function(e,t){var a="</div>";e.write("<div id='"+t.getId()+"-BarLeft' ");e.addClass("sapMBarLeft");e.addClass("sapMBarContainer");e.writeClasses();n("left",e,t);e.write(">");this.renderAllControls(t.getContentLeft(),e,t);e.write(a);e.write("<div id='"+t.getId()+"-BarMiddle' ");e.addClass("sapMBarMiddle");e.writeClasses();e.write(">");if(t.getEnableFlexBox()){t._oflexBox=t._oflexBox||new sap.m.HBox(t.getId()+"-BarPH",{alignItems:"Center"}).addStyleClass("sapMBarPH").setParent(t,null,true);var r=!!t.getContentLeft().length,s=!!t.getContentMiddle().length,i=!!t.getContentRight().length;if(s&&!r&&!i){t._oflexBox.addStyleClass("sapMBarFlexBoxWidth100")}t.getContentMiddle().forEach(function(e){t._oflexBox.addItem(e)});e.renderControl(t._oflexBox)}else{e.write("<div id='"+t.getId()+"-BarPH' ");e.addClass("sapMBarPH");e.addClass("sapMBarContainer");n("middle",e,t);e.writeClasses();e.write(">");this.renderAllControls(t.getContentMiddle(),e,t);e.write(a)}e.write(a);e.write("<div id='"+t.getId()+"-BarRight'");e.addClass("sapMBarRight");e.addClass("sapMBarContainer");if(sap.ui.getCore().getConfiguration().getRTL()){e.addClass("sapMRTL")}e.writeClasses();n("right",e,t);e.write(">");this.renderAllControls(t.getContentRight(),e,t);e.write(a)};r.renderAllControls=function(e,a,r){e.forEach(function(e){t.addChildClassTo(e,r);a.renderControl(e)})};r._mContexts={Header:"sapMHeader-CTX",SubHeader:"sapMSubHeader-CTX",Footer:"sapMFooter-CTX",Default:"sapMContent-CTX"};r.getContext=function(e){var t=e.getDesign(),a=r._mContexts;return a[t]||a.Default};function n(t,a,r){var n=!!r.getContentLeft().length,s=!!r.getContentMiddle().length,i=!!r.getContentRight().length;function o(){a.addStyle("width","100%");a.writeStyles()}switch(t.toLowerCase()){case"left":if(n&&!s&&!i){o()}break;case"middle":if(s&&!n&&!i){o()}break;case"right":if(i&&!n&&!s){o()}break;default:e.sap.log.error("Cannot determine which of the three content aggregations is alone")}}return r},true);