/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","sap/ui/model/ClientTreeBinding"],function(e,t){"use strict";var i=t.extend("sap.ui.model.xml.XMLTreeBinding");i.prototype.getNodeContexts=function(t,i,n){if(!i){i=0}if(!n){n=this.oModel.iSizeLimit}var o=t.getPath();if(!e.sap.endsWith(o,"/")){o=o+"/"}if(!e.sap.startsWith(o,"/")){o="/"+o}var s=[],a={},d=this,l=this.oModel._getObject(t.getPath()),r,h;e.each(l[0].childNodes,function(t,i){if(i.nodeType==1){if(a[i.nodeName]==undefined){a[i.nodeName]=0}else{a[i.nodeName]++}r=o+i.nodeName+"/"+a[i.nodeName];h=d.oModel.getContext(r);if(d.aAllFilters&&!d.bIsFiltering){if(e.inArray(h,d.filterInfo.aFilteredContexts)!=-1){s.push(h)}}else{s.push(h)}}});this._applySorter(s);this._setLengthCache(o,s.length);return s.slice(i,i+n)};return i});