/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library"],function(e){"use strict";var t={};t.CSS_CLASS="sapUiAFLayout";t.render=function(e,r){var i=r.getContent();e.write("<ul");e.writeControlData(r);e.addClass(t.CSS_CLASS);e.writeClasses();e.write(">");this.renderItems(e,r,i);this.renderEndItem(e,r);this.renderSpacers(e,r);e.write("</ul>")};t.renderItems=function(e,t,r){r=r||t.getContent();for(var i=0;i<r.length;i++){this.renderItem(e,t,r[i])}};t.renderItem=function(e,r,i){e.write("<li");e.addClass(t.CSS_CLASS+"Item");e.addStyle("flex-basis",r.getMinItemWidth());e.addStyle("max-width",r.getMaxItemWidth());e.writeClasses();e.writeStyles();e.write(">");e.renderControl(i);e.write("</li>")};t.renderEndItem=function(e,r,i){i=i||r.getEndContent();if(i.length){e.write("<li");e.writeAttribute("id",r.getId()+"-endItem");e.addClass(t.CSS_CLASS+"End");if(r.getContent().length){e.addStyle("flex-basis",r.getMinItemWidth())}e.writeClasses();e.writeStyles();e.write(">");for(var n=0;n<i.length;n++){this.renderEndContent(e,r,i[n])}e.write("</li>")}};t.renderEndContent=function(e,t,r){e.renderControl(r)};t.renderSpacers=function(e,r){var i=r.getNumberOfSpacers(),n=r.getMinItemWidth(),d=r.getMaxItemWidth(),s=t.CSS_CLASS;for(var a=0;a<i;a++){e.write("<li");if(a===i-1){e.writeAttribute("id",r.getId()+"-last")}e.addClass(s+"Item");e.addClass(s+"Spacer");e.addStyle("flex-basis",n);e.addStyle("max-width",d);e.writeClasses();e.writeStyles();e.write("></li>")}};return t},true);