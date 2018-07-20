/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","sap/ui/core/support/Plugin"],function(t,e){"use strict";var o=e.extend("sap.ui.core.support.plugins.LocalStorage",{constructor:function(t){e.apply(this,["sapUiSupportLocalStorage","",t]);this._oStub=t;this._aEventIds=[this.getId()+"GetItem",this.getId()+"SetItem"]}});o.prototype.isToolPlugin=function(){return false};o.prototype.onsapUiSupportLocalStorageGetItem=function(e){var o=e.getParameter("id"),a=e.getParameter("passThroughData"),r="";try{r=window.localStorage.getItem(o);if(!r||r==="undefined"){r=""}}catch(e){t.sap.log.error("Could not get item '"+o+"' from localStorage: "+e.message);r=""}this._oStub.sendEvent(e.getParameter("callback"),{value:r,passThroughData:a})};o.prototype.onsapUiSupportLocalStorageSetItem=function(e){var o=e.getParameter("id"),a=e.getParameter("value");try{window.localStorage.setItem(o,a)}catch(e){t.sap.log.error("Could not write to localStorage: '"+o+"' : '"+a+"': "+e.message)}};return o});