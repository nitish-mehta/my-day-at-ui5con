/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/thirdparty/jquery","sap/ui/dom/jquery/hasTabIndex"],function(e,t){"use strict";var i=Object.create(null);function r(t){return t.offsetWidth<=0&&t.offsetHeight<=0||e.css(t,"visibility")==="hidden"}function n(t,i){var f=i?t.firstChild:t.lastChild,u;while(f){if(f.nodeType==1&&!r(f)){if(e(f).hasTabIndex()){return f}u=n(f,i);if(u){return u}}f=i?f.nextSibling:f.previousSibling}return null}i.firstDomRef=function(){var e=this.get(0);if(!e||r(e)){return null}return n(e,true)};i.lastDomRef=function(){var e=this.get(0);if(!e||r(e)){return null}return n(e,false)};e.fn.firstFocusableDomRef=i.firstDomRef;e.fn.lastFocusableDomRef=i.lastDomRef;return e});