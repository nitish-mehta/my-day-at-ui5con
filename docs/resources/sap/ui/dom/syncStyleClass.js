/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/thirdparty/jquery","sap/ui/base/Object","sap/base/assert","sap/ui/dom/jquery/byId"],function(e,s,t,r){"use strict";var a=function(a,o,i){if(!a){return i}if(s.isA(o,"sap.ui.core.Control")){o=o.$()}else if(typeof o==="string"){o=r(o)}else if(!(o instanceof e)){t(false,"sap/ui/dom/syncStyleClass(): vSource must be a jQuery object or a Control or a string");return i}var n=!!o.closest("."+a).length;if(i instanceof e){i.toggleClass(a,n)}else if(s.isA(i,"sap.ui.core.Control")){i.toggleStyleClass(a,n)}else{t(false,"sap/ui/dom/syncStyleClass(): vDestination must be a jQuery object or a Control")}return i};return a});