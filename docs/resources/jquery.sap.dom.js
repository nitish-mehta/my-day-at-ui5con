/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","sap/ui/dom/focus","sap/ui/dom/containsOrEquals","sap/ui/dom/replaceNode","sap/ui/dom/syncStyleClass","sap/ui/dom/ownerWindow","sap/ui/dom/scrollbarSize","sap/ui/dom/denormalizeScrollLeftRTL","sap/ui/dom/denormalizeScrollBeginRTL","sap/ui/dom/units/Rem","sap/ui/dom/jquery/byId","sap/ui/dom/jquery/Aria","sap/ui/dom/jquery/Selection","sap/ui/dom/jquery/zIndex","sap/ui/dom/jquery/parentByAttribute","sap/ui/dom/jquery/cursorPos","sap/ui/dom/jquery/selectText","sap/ui/dom/jquery/getSelectedText","sap/ui/dom/jquery/outerHTML","sap/ui/dom/jquery/rect","sap/ui/dom/jquery/rectContains","sap/ui/dom/jquery/Focusable","sap/ui/dom/jquery/hasTabIndex","sap/ui/dom/jquery/scrollLeftRTL","sap/ui/dom/jquery/scrollRightRTL","sap/ui/dom/jquery/Selectors"],function(e,s,o,a,u,r,i,d,p,t,l){"use strict";e.sap.domById=function e(s,o){return s?(o||window).document.getElementById(s):null};e.sap.byId=l;e.sap.focus=s;e.sap.pxToRem=t.fromPx;e.sap.remToPx=t.toPx;e.sap.containsOrEquals=o;e.sap.denormalizeScrollLeftRTL=d;e.sap.denormalizeScrollBeginRTL=p;
/*
	 * The following methods are taken from jQuery UI core but modified.
	 *
	 * jQuery UI Core
	 * http://jqueryui.com
	 *
	 * Copyright 2014 jQuery Foundation and other contributors
	 * Released under the MIT license.
	 * http://jquery.org/license
	 *
	 * http://api.jqueryui.com/category/ui-core/
	 */e.support.selectstart="onselectstart"in document.createElement("div");e.sap.ownerWindow=r;e.sap.scrollbarSize=i;e.sap.syncStyleClass=u;e.sap.replaceDOM=a;return e});