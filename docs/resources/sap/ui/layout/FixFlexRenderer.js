/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global"],function(e){"use strict";var i={};i.render=function(i,t){i.write("<div");i.writeControlData(t);i.addClass("sapUiFixFlex");if(t.getMinFlexSize()!==0){i.addClass("sapUiFixFlexInnerScrolling")}if(!t.getVertical()){i.addClass("sapUiFixFlexRow")}if(!e.support.hasFlexBoxSupport){i.addClass("sapUiFixFlex-Legacy")}i.writeClasses();i.write(">");if(t.getFixFirst()){this.renderFixChild(i,t);this.renderFlexChild(i,t)}else{this.renderFlexChild(i,t);this.renderFixChild(i,t)}i.write("</div>")};i.renderFixChild=function(e,i){var t=i.getFixContent();e.write('<div id="'+i.getId()+'-Fixed" class="sapUiFixFlexFixed"');if(i.getFixContentSize()!=="auto"){if(i.getVertical()){e.addStyle("height",i.getFixContentSize())}else{e.addStyle("width",i.getFixContentSize())}e.writeStyles()}e.write(">");for(var l=0;l<t.length;l++){e.renderControl(t[l])}e.write("</div>")};i.renderFlexChild=function(e,i){var t=i.getFlexContent();e.write('<div id="'+i.getId()+'-Flexible" class="sapUiFixFlexFlexible">');e.write('<div id="'+i.getId()+'-FlexibleContainer" class="sapUiFixFlexFlexibleContainer"');if(i.getMinFlexSize()!==0){if(i.getVertical()){e.write('style="min-height:'+i.getMinFlexSize()+'px"')}else{e.write('style="min-width:'+i.getMinFlexSize()+'px"')}}e.write(">");e.renderControl(t);e.write("</div>");e.write("</div>")};return i},true);